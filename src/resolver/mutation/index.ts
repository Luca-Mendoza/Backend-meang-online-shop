import resolversGenreMutation from './genre';
import resolversTagMutation from './tag';
import resolversUserMutation from './user';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const mutationResilver = GMR.merge([
    resolversUserMutation,
    resolversGenreMutation,
    resolversTagMutation
]);

export default mutationResilver;