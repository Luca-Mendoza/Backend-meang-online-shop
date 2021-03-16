import { IResolvers } from 'graphql-tools';

const resolversShopProductType: IResolvers = {
	ShopProduct: {
		productId: (parent) => parent.product_id,
		platformId: (parent) => parent.platform_id,
	},
};

export default resolversShopProductType;
