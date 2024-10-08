import {
  findOneElement,
  manageStockUpdate,
  randomItems,
} from "./../lib/db-operations";
import { ACTIVE_VALUES_FILTER, COLLECTIONS } from "./../config/constants";
import { SUBSCRIPTIONS_EVENT } from "./../config/constants";
import ResolversOperationsService from "./resolvers-operations.service";
import { IStock } from "../interfaces/stock.interface";
import { PubSub } from "graphql-subscriptions";

class ShopProductsService extends ResolversOperationsService {
  collection = COLLECTIONS.SHOP_PRODUCT;

  constructor(root: object, variables: object, context: object) {
    super(root, variables, context);
  }
  //Lista de productos
  async items(
    active: string = ACTIVE_VALUES_FILTER.ACTIVE,
    platform: Array<string> = ["-1"],
    random: boolean = false,
    otherFilters: object = {}
  ) {
    //Filtrado de dato que muestre todo lo que tienen activos
    let filter: object = { active: { $ne: false } };
    // si queremos mostrar todos deja el filtro vacíon
    if (active == ACTIVE_VALUES_FILTER.ALL) {
      filter = {};
    } //mostrar los inactivos
    else if (active === ACTIVE_VALUES_FILTER.INACTIVE) {
      filter = { active: false };
    } // Mostrar de que plataforma son los productos
    if (platform[0] !== "-1" && platform !== undefined) {
      filter = {
        ...filter,
        ...{ platform_id: { $in: platform } },
      };
    } // añadimos filtro de oferta y stock
    if (otherFilters !== null && otherFilters !== undefined) {
      filter = {
        ...filter,
        ...otherFilters,
      };
    }
    // Obtenemos el valor de la página
    const page = this.getVariables().pagination?.page;
    //Obtenemos los items por página
    const itemsPage = this.getVariables().pagination?.itemsPage;
    // Obtener el sistema de paginacion por defecto normalmente
    if (!random) {
      // Obtenemos el resultado llamamos a la función "list"
      const result = await this.list(
        // Obtenemos la colección de Shop-Products
        this.collection,
        // menssaje personalizado
        "productos de la tienda",
        // pagina
        page,
        //itemd de los pagina
        itemsPage,
        // filtro
        filter
      );
      return {
        info: result.info,
        status: result.status,
        message: result.message,
        shopProducts: result.items,
      };
    }
    /**
     * Aplicando el filtrado para obtener un conjunto de dato
     * aplicanto el n° de items paraobtener de manera aleatoria
     * lo que nesecitamos conjugado al sistema de paginación
     * */
    const result: Array<object> = await randomItems(
      this.getDb(), //obtener de referencia la base de dato
      this.collection, //ontenemos la collecion shop-product
      filter, // filtro de la funcion
      itemsPage // items por pagina
    );
    // funcion para verificar que la informacion es distinta a la que emos especificado
    if (result.length === 0 || result.length !== itemsPage) {
      return {
        info: { page: 1, pages: 1, itemsPage, total: 0 },
        status: false,
        message:
          "La información que hemos pedido no se ha obtenido tal y como deseabamos",
        shopProducts: [],
      };
    }
    // si se cumple la condicion especificada retornara  result correctamente
    return {
      info: {
        page: 1,
        pages: 1,
        itemsPage,
        total: itemsPage,
      },
      status: true,
      message:
        "La información que hemos pedido se ha obtenido tal y como deseabamos",
      shopProducts: result,
    };
  }
  //Detalles del producto seleccionado
  async details() {
    const result = await this.get(this.collection);
    return {
      status: result.status,
      message: result.message,
      shopProduct: result.item,
    };
  }
  //  Detalles de productos en Stock 'Shop-Product'
  async updateStock(updateList: Array<IStock>, pubsub: PubSub) {
    try {
      updateList.map(async (item: IStock) => {
        console.log(item);
        const itemDetails = await findOneElement(
          this.getDb(), //obtener de referencia la base de dato
          COLLECTIONS.SHOP_PRODUCT, //ontenemos la collecion shop-product
          { id: +item.id }
        );

        if (item.increment < 0 && item.increment + itemDetails.stock < 0) {
          item.increment = -itemDetails.stock;
        }
        await manageStockUpdate(
          this.getDb(), //obtener de referencia la base de dato
          COLLECTIONS.SHOP_PRODUCT, //ontenemos la collecion shop-product
          { id: +item.id },
          { stock: item.increment }
        );
        itemDetails.stock += item.increment;
        pubsub.publish(SUBSCRIPTIONS_EVENT.UPDATE_STOCK_PRODUCT, {
          selectStockProductupdate: itemDetails,
        });
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export default ShopProductsService;
