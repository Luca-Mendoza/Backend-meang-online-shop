import resolversShopProductType from './shop-product';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const typeResolvers = GMR.merge([resolversShopProductType]);

export default typeResolvers;
