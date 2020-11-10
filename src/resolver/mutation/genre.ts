import { IResolvers } from 'apollo-server-express';
import GenresService from '../../services/genre.service';

const resolversGenreMutation: IResolvers = {
    Mutation: {
        addGenre(_, variables, context) {
            // Añadimos la llamada al servicio
            return new GenresService(_, variables, context).insert();
        },
        updateGenre(_, variables, context) {
            // Añadimos la llamada al servicio
            return new GenresService(_, variables, context).modify();
        },
        deleteGenre(_, variables, context) {
            // Añadimos la llamada al servicio
            return new GenresService(_, variables, context).delete();
        }
    }
};

export default resolversGenreMutation;