import { randomItems } from './../lib/db-operations';
import {
	ACTIVE_VALUES_FILTER,
	COLLECTIONS,
} from './../config/constants';
import ResolversOperationsService from './resolvers-operations.service';

class ShopProductsService extends ResolversOperationsService {
	collection = COLLECTIONS.SHOP_PRODUCT;

	constructor(
		root: object,
		variables: object,
		context: object,
	) {
		super(root, variables, context);
	}
	//Lista de productos
	async items(
		active: string = ACTIVE_VALUES_FILTER.ACTIVE,
		platform: string = '',
		random: boolean = false,
		otherFilters: object = {},
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
		if (platform !== '' && platform !== undefined) {
			filter = {
				...filter,
				...{ platform_id: platform },
			};
		}  // añadimos filtro de oferta y stock
		if (otherFilters !== {} && otherFilters !== undefined) {
			filter = {
				...filter,
				...otherFilters,
			};
		}
		// Obtenemos el valor de la página
		const page = this.getVariables().pagination?.page;
		//Obtenemos los items por página
		const itemsPage = this.getVariables().pagination
			?.itemsPage;
		// Obtener el sistema de paginacion por defecto normalmente
		if (!random) {
			// Obtenemos el resultado llamamos a la función "list"
			const result = await this.list(
				// Obtenemos la colección de Shop-Products
				this.collection,
				// menssaje personalizado
				'productos de la tienda',
				// pagina
				page,
				//itemd de los pagina
				itemsPage,
				// filtro
				filter,
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
			itemsPage, // items por pagina
		);
		// funcion para verificar que la informacion es distinta a la que emos especificado
		if (result.length === 0 || result.length !== itemsPage) {
			return {
				info: { page: 1, pages: 1, itemsPage, total: 0 },
				status: false,
				message:
					'La información que hemos pedido no se ha obtenido tal y como deseabamos',
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
				'La información que hemos pedido se ha obtenido tal y como deseabamos',
			shopProducts: result,
		};
	}
}

export default ShopProductsService;
