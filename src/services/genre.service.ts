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
    async items() {
        const result = await this.list(COLLECTIONS.GENRES, 'géneros');
        return { status: result.status, message: result.message, genres: result.items };
    }
    /** Obteniendo los dato de genero desde el servicio desde los servicios Resolverts
     * si es true o false 
     * o si no existe y esta todo correcto
     */
    async details() {
        const result = await this.get(COLLECTIONS.GENRES);
        return { status: result.status, message: result.message, genre: result.item };
    }

    async insert() {
       const genre = this.getVariables().genre;
        // Comprueba que no está en blanco ni es indefinido
        if (!this.checkData(genre || '')){
            return {
                status: false,
                message: 'El género no se ha especificado correctamente',
                genre: null
            };

        }
        // Comprueva que no existe

        // Si valida la opciones anteriores, venir aquí y crear el documento
        const genreOnject = {
            id: '',
            name: '',
            slug: ''
        };
        const result = await this.add(COLLECTIONS.GENRES, {
            id: '85',
            name: 'Realidad virtual',
            slug: 'realidad-virtual'
        }, 'género');
        return { status: result.status, message: result.message, genre: result.item };
    }
    private checkData(value: string) {
        return (value === '' || value === undefined) ? false : true;
    }
}

export default GenresService;