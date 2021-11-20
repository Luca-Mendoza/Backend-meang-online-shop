import { IResolvers } from 'apollo-server-express';
import { SUBSCRIPTION_EVENT } from '../../config/constants';

const resolversShopProductsSubcription: IResolvers = {
	Subscription: {
		/**
		 * Actualizando Stock de Productos
		 */
		updateStockProduct: {
			subscribe: (_, __, { pubsub }) =>
				pubsub.asyncIterator(
					SUBSCRIPTION_EVENT.UPDATE_STOCK_PRODUCT,
				),
		},
	},
};

export default resolversShopProductsSubcription;
