import { IResolvers } from "@graphql-tools/utils";

import ShopProductsService from "../../services/shop-product.service";

const resolversShopProductMutation: IResolvers = {
  Mutation: {
    updateStock(_, { update }, { db, pubsub }) {
      return new ShopProductsService(_, {}, [db]).updateStock(update, pubsub);
    },
  },
};

export default resolversShopProductMutation;
