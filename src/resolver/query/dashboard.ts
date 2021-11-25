import { IResolvers } from 'apollo-server-express';
import { countElements } from '../../lib/db-operations';
import GenresService from '../../services/genre.service';

const resolverDashboardQuery: IResolvers = {
	Query: {
		/**
		 *
		 */
		async totalElements(_, { collection }, { db }) {
			// Obtener total de Elementos
			return await countElements(db, collection);
		},
	},
};

export default resolverDashboardQuery;
