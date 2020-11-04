import { IResolvers } from 'apollo-server-express';

import GenresService from '../../services/genre.service';


const resolversGenreQuery: IResolvers = {
    Query: {
        async genres(_, __, { db }) {
            return new GenresService(_, __, { db }).items();
        }
    }
};

export default resolversGenreQuery;