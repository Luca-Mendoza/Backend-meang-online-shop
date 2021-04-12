import resolversStipeCustomerQuery from './customer';


const GMR = require('@wiicamp/graphql-merge-resolvers');

const queryStripeResolver = GMR.merge([
	resolversStipeCustomerQuery,
]);

export default queryStripeResolver;
