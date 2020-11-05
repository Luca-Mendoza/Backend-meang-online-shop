import resolversGenreMutation from './genre';
import resolversUserMutation from './user';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const mutationResilver = GMR.merge([
    resolversUserMutation,
    resolversGenreMutation
]);

export default mutationResilver;