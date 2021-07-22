import resolversStipeCardQuery from './card';
import resolversStipeCustomerQuery from './customer';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const queryStripeResolver = GMR.merge([
	resolversStipeCustomerQuery,
	resolversStipeCardQuery,
]);

export default queryStripeResolver;
