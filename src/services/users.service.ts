import { COLLECTIONS } from '../config/constants';
import { IContextData } from '../interfaces/context-data.interface';
import ResolversOperationsService from './resolvers-operations.service';




class UsersService extends ResolversOperationsService {
    private collection = COLLECTIONS.USERS;
    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }

    // Lista de usuarios
     async items() {
         const result = await this.list(this.collection, 'usuarios');
         return { status: result.status, message: result.message, users: result.items};
    }

    // Autenticarnos

    // Iniciar sesión

    // Registrar un usuario
}
 export default UsersService;