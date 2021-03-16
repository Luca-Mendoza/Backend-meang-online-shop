import { ACTIVE_VALUES_FILTER, COLLECTIONS } from './../config/constants';
import ResolversOperationsService from './resolvers-operations.service';

class ShopProductsService extends ResolversOperationsService {
	collection = COLLECTIONS.SHOP_PRODUCT;

	constructor(root: object, variables: object, context: object) {
		super(root, variables, context);
	}
	//Lista de productos
	async items(active: string = ACTIVE_VALUES_FILTER.ACTIVE) {
		//Filtrado de dato que muestre todo lo que tienen activos
		let filter: object = { active: { $ne: false } };
		// si queremos mostrar todos deja el filtro vacíon
		if (active == ACTIVE_VALUES_FILTER.ALL) {
			filter = {};
		} //mostrar los inactivos
		else if (active === ACTIVE_VALUES_FILTER.INACTIVE) {
			filter = { active: false };
		}
		// Obtenemos el valor de la página
		const page = this.getVariables().pagination?.page;
		//Obtenemos los items por página
		const itemsPage = this.getVariables().pagination?.itemsPage;
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
}

export default ShopProductsService;
