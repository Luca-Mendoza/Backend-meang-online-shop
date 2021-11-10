import resolversStipeCardMutation from './card';
import resolversStipeChargeMutation from './charge';
import resolversStipeCustomerMutation from './customer';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const mutationStripeResolver = GMR.merge([
	resolversStipeCustomerMutation,
	resolversStipeCardMutation,
	resolversStipeChargeMutation
]);

export default mutationStripeResolver;
