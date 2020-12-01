import { IResolvers } from 'apollo-server-express';

import GenresService from '../../services/genre.service';


const resolversGenreQuery: IResolvers = {
    Query: {
        /**
        * Obteniendo status, message, items del servicio genres
        */
        async genres(_, { page, itemsPage }, { db }) {
            console.log(page, itemsPage);
            return new GenresService(_, {}, { db }).items();
        },
        /**
         * Obteniendo status, message, item del servicio genre
         */
        async genre(_, { id }, { db }) {
            return new GenresService(_, { id }, { db }).details();
        }
    }
};

export default resolversGenreQuery;