import resolversShopProductsSubcription from './shop.product';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const subscriptionResolvers = GMR.merge([
	resolversShopProductsSubcription,
]);

export default subscriptionResolvers;
