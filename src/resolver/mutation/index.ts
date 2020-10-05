import resolversUserMutation from './user';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const mutationResilver = GMR.merge([
    resolversUserMutation
]);

export default mutationResilver;