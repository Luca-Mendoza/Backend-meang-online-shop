import resolversProductsQuery from './product';
import resolversUserQuery from './user';

const GMR = require('@wiicamp/graphql-merge-resolvers');


const queryResolvers = GMR.merge([
    resolversUserQuery,
    resolversProductsQuery
]);

export default queryResolvers;