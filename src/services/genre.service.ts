import { asignDocumentId, findOneElement } from './../lib/db-operations';
import { COLLECTIONS } from '../config/constants';
import { IContextData } from '../interfaces/context-data.interface';
import ResolversOperationsService from './resolvers-operations.service';
import slugify from 'slugify';

class GenresService extends ResolversOperationsService {
    collection = COLLECTIONS.GENRES;
    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }
    /** Obteniendo los datos de generos desde el servicio desde los servicios Resolverts
     * si es true o false 
     */
    async items() {
        const result = await this.list(this.collection, 'géneros');
        return { status: result.status, message: result.message, genres: result.items };
    }
    /** Obteniendo los dato de genero desde el servicio desde los servicios Resolverts
     * si es true o false 
     * o si no existe y esta todo correcto
     */
    async details() {
        const result = await this.get(this.collection);
        return { status: result.status, message: result.message, genre: result.item };
    }

    async insert() {
        const genre = this.getVariables().genre;
        // Comprueba que no está en blanco ni es indefinido
        if (!this.checkData(genre || '')) {
            return {
                status: false,
                message: 'El género no se ha especificado correctamente',
                genre: null
            };
        }
        // Comprueva que no existe
        if (await this.checkInDatabase(genre || '')){
            return {
                status: false,
                message: 'Elgénero existe en la base de datos, intentar con otro género',
                genre: null
            };
        }

        // Si valida la opciones anteriores, venir aquí y crear el documento
        const genreObject = {
            id: await asignDocumentId(this.getDb(), this.collection, {id: -1}),
            name: genre,
            slug: slugify(genre || '', {lower: true})
        };
        const result = await this.add(this.collection, genreObject, 'género');
        return { status: result.status, message: result.message, genre: result.item };
    }
    async modify(){
        const id = { id: '85'};
        const objectUpdate = { name: ' Shooter plataforma', slug: 'shooter-plataforma'};

        const result = await this.update(this.collection, id, objectUpdate, 'genero');
        return { status: result.status, message: result.message, genre: result.item };
    }



    // Funciones 
    private checkData(value: string) {
        return (value === '' || value === undefined) ? false : true;
    }
    // comprobar si existe un Item 
    private async checkInDatabase(value: string) {
        return await findOneElement(this.getDb(), this.collection, { 
            name: value
        });
    }
}

export default GenresService;