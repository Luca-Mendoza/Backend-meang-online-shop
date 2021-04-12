import resolversStipeCustomerMutation from './customer';


const GMR = require('@wiicamp/graphql-merge-resolvers');

const mutationStripeResolver = GMR.merge([resolversStipeCustomerMutation]);

export default mutationStripeResolver;
