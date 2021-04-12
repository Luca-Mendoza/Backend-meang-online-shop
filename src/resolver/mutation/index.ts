import resolversEmailMutation from './email';
import resolversGenreMutation from './genre';
import mutationStripeResolver from './stripe';
import resolversTagMutation from './tag';
import resolversUserMutation from './user';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const mutationResolver = GMR.merge([
	resolversUserMutation,
	resolversGenreMutation,
	resolversTagMutation,
	resolversEmailMutation,
	mutationStripeResolver,
]);

export default mutationResolver;