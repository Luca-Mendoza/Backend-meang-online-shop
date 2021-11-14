import resolversPlatformType from './platform';
import resolversProdutType from './product';
import resolversShopProductType from './shop-product';
import typeStripeResolvers from './stripe';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const typeResolvers = GMR.merge([
	resolversShopProductType,
	resolversPlatformType,
	resolversProdutType,
	// stripe
	typeStripeResolvers,
]);

export default typeResolvers;
