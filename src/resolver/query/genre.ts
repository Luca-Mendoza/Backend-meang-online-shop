import { IResolvers } from 'apollo-server-express';

import GenresService from '../../services/genre.service';
import { countElements } from '../../lib/db-operations';
import { COLLECTIONS } from '../../config/constants';
import { pagination } from '../../lib/pagination';


const resolversGenreQuery: IResolvers = {
    Query: {
        /**
        * Obteniendo status, message, items del servicio genres
        */
        async genres(_, { page, itemsPage }, { db }) {
            console.log(await countElements(db, COLLECTIONS.GENRES));
            console.log(page, itemsPage);
            console.log(await pagination(db, COLLECTIONS.GENRES, 1, 5));
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