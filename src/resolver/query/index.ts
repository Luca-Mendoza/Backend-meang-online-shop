import resolversGenreQuery from "./genre";
import resolversShopProductsQuery from "./shop-product";
import queryStripeResolver from "./stripe";
import resolversTagQuery from "./tag";
import resolversUserQuery from "./user";

const GMR = require("@wiicamp/graphql-merge-resolvers");

const queryResolvers = GMR.merge([
  resolversUserQuery,
  resolversShopProductsQuery,
  resolversGenreQuery,
  resolversTagQuery,
  queryStripeResolver,
]);

export default queryResolvers;
