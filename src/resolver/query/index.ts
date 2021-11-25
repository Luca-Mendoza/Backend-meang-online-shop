import resolverDashboardQuery from './dashboard';
import resolversGenreQuery from './genre';
import resolversShopProductsQuery from './shop-product';
import queryStripeResolver from './stripe';
import resolversTagQuery from './tag';
import resolversUserQuery from './user';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const queryResolvers = GMR.merge([
	resolversUserQuery,
	resolversShopProductsQuery,
	resolversGenreQuery,
	resolversTagQuery,
	resolverDashboardQuery,
	queryStripeResolver,
]);

export default queryResolvers;
