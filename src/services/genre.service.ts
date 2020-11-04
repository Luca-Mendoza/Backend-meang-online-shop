import { IContextData } from '../interfaces/context-data.interface';
import ResolversOperationsService from './resolvers-operations.service';

class GenresService extends ResolversOperationsService {
    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }

    // Listar información
 

    // Obtener detalles del item

    // Añadir item

    // Modificar item

    // Eliminar item
}

export default GenresService;