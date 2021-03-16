import { IResolvers } from 'graphql-tools';
import ShopProductsService from '../../services/shop-product.service';

const resolversShopProductsQuery: IResolvers = {
	Query: {
		async shopProducts(
			_,
			{ page, itemsPage, active },
			context,
		) {
			return new ShopProductsService(
				_,
				{ pagination: { page, itemsPage } },
				context,
			).items(active);
		},
		async shopProductsPlatforms(
			_,
			{ page, itemsPage, active, platform, random },
			context,
		) {
			return new ShopProductsService(
				_,
				{ pagination: { page, itemsPage } },
				context,
			).items(active, platform, random);
		},
	},
};

export default resolversShopProductsQuery;
