import { COLLECTIONS } from './../config/constants';
import ResolversOperationsService from './resolvers-operations.service';

class ProductsService extends ResolversOperationsService {
	collection = COLLECTIONS.PRODUCTS;

	constructor(root: object, variables: object, context: object) {
		super(root, variables, context);
	}
	//  Obtenemos los detalles y traemos el ID
	async details() {
		const result = await this.get(this.collection);
		return {
			status: result.status,
			message: result.message,
			product: result.item,
		};
	}
}
export default ProductsService;
