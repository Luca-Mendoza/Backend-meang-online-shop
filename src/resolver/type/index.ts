import resolversPlatformType from './platform';
import resolversProdutType from './product';
import resolversShopProductType from './shop-product';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const typeResolvers = GMR.merge([
	resolversShopProductType,
	resolversPlatformType,
	resolversProdutType,
]);

export default typeResolvers;
