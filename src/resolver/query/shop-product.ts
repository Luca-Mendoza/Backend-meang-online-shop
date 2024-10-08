import { IResolvers } from "@graphql-tools/utils";
import ShopProductsService from "../../services/shop-product.service";

const resolversShopProductsQuery: IResolvers = {
  Query: {
    async shopProducts(_, { page, itemsPage, active }, context) {
      return new ShopProductsService(
        _,
        { pagination: { page, itemsPage } },
        context
      ).items(active);
    },
    async shopProductsPlatforms(
      _,
      { page, itemsPage, active, platform, random },
      context
    ) {
      return new ShopProductsService(
        _,
        { pagination: { page, itemsPage } },
        context
      ).items(active, platform, random);
    },
    async shopProductsOffersLast(
      _,
      {
        // variables que nesecitamos
        page,
        itemsPage,
        active,
        topPrice,
        lastUnits,
        random,
      },
      context // para utilizar la base de datos
    ) {
      let otherFilters = {};
      if (lastUnits > 0 && topPrice > 10) {
        otherFilters = {
          $and: [{ price: { $lte: topPrice } }, { stock: { $lte: lastUnits } }],
        };
      } else if (lastUnits <= 0 && topPrice > 10) {
        otherFilters = { price: { $lte: topPrice } };
      } else if (lastUnits > 0 && topPrice <= 10) {
        otherFilters = { stock: { $lte: lastUnits } };
      }
      return new ShopProductsService(
        _,
        { pagination: { page, itemsPage } },
        context
      ).items(active, ["-1"], random, otherFilters);
    },
    async shopProductDetails(_, { id }, context) {
      console.log(id, typeof id);
      return new ShopProductsService(_, { id }, context).details();
    },
  },
};

export default resolversShopProductsQuery;
