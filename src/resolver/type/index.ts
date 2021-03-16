import resolversPlatformType from './platform';
import resolversShopProductType from './shop-product';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const typeResolvers = GMR.merge([
	resolversShopProductType,
	resolversPlatformType,
]);

export default typeResolvers;
