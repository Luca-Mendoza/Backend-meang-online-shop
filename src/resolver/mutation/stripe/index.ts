import resolversStipeCardMutation from './card';
import resolversStipeCustomerMutation from './customer';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const mutationStripeResolver = GMR.merge([
	resolversStipeCustomerMutation,
	resolversStipeCardMutation,
]);

export default mutationStripeResolver;
