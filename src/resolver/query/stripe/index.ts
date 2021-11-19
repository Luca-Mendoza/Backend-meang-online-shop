import resolversStipeCardQuery from './card';
import resolversStipeCustomerQuery from './customer';

import resolverStripeChargeQuery from './charge';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const queryStripeResolver = GMR.merge([
	resolversStipeCustomerQuery,
	resolversStipeCardQuery,
	resolverStripeChargeQuery,
]);

export default queryStripeResolver;
