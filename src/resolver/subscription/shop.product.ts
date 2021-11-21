import { IResolvers, withFilter } from 'apollo-server-express';
import { SUBSCRIPTIONS_EVENT } from '../../config/constants';

const resolversShopProductsSubcription: IResolvers = {
	Subscription: {
		/**
		 * Actualizando Stock de Productos
		 */
		updateStockProduct: {
			subscribe: (_, __, { pubsub }) =>
				pubsub.asyncIterator(
					SUBSCRIPTIONS_EVENT.UPDATE_STOCK_PRODUCT,
				),
		},

		selectStockProductupdate: {
			subscribe: withFilter(
				(_, __, { pubsub }) =>
					pubsub.asyncIterator(
						SUBSCRIPTIONS_EVENT.UPDATE_STOCK_PRODUCT,
					),
				(payload, variables) => {
					return (
						console.log(payload, variables),
						+payload.selectStockProductupdate.id === +variables.id
					);
				},
			),

			// (id: !Int): ShopProduct;,
		},
	},
};

export default resolversShopProductsSubcription;
