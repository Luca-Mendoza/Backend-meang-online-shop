import { IResolvers } from 'apollo-server-express';
import GenresService from '../../services/genre.service';

const resolversGenreMutation: IResolvers = {
    Mutation: {
        addGenre(_, variables, context){
            // Añadimos la llamada al servicio
            return new GenresService(_, variables, context).items();
        }
    }
};

export default resolversGenreMutation;