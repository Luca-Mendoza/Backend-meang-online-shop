import { IResolvers } from 'graphql-tools';
import PlatformService from '../../services/platform.service';
import ProductsService from '../../services/product.service';

const resolversShopProductType: IResolvers = {
	ShopProduct: {
		productId: (parent) => parent.product_id,
		platformId: (parent) => parent.platform_id,
		// Obtenemos la informacion del products
		product: async (parent, __, { db }) => {
			// Hacemos uso del servicio del products
			const result = await new ProductsService(
				{},
				// pasamos lo que es el paren.product_id para pasar la inf que correspondel al id del product //
				{ id: parent.product_id },
				{ db },
			).details();
			return result.product;
		},
		// Obtenemos la informacion del platfrom
		platform: async (parent, __, { db }) => {
			// Hacemos uso del servicio del products
			const result = await new PlatformService(
				{},
				// pasamos lo que es el paren.product_id para pasar la inf que correspondel al id del product //
				{ id: parent.platform_id },
				{ db },
			).details();
			return result.platform;
		},
	},
};

export default resolversShopProductType;
