import resolversGenreQuery from './genre';
import resolversProductsQuery from './product';
import resolversTagQuery from './tag';
import resolversUserQuery from './user';

const GMR = require('@wiicamp/graphql-merge-resolvers');


const queryResolvers = GMR.merge([
    resolversUserQuery,
    resolversProductsQuery,
    resolversGenreQuery,
    resolversTagQuery
]);

export default queryResolvers;