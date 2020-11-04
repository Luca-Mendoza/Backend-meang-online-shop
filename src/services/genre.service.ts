import { COLLECTIONS } from '../config/constants';
import { IContextData } from '../interfaces/context-data.interface';
import ResolversOperationsService from './resolvers-operations.service';

class GenresService extends ResolversOperationsService {
    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }
    /** Obteniendo los datos de generos desde el servicio desde los servicios Resolverts
     * si es true o false 
     */
    async items(){
        const result = await this.list(COLLECTIONS.GENRES, 'géneros');
        return { status: result.status, message: result.message, genres: result.items };
    }
}

export default GenresService;