import { IContextData } from '../interfaces/context-data.interface';
import { IVariables } from '../interfaces/variables.interface';
import {
    findElements,
    findOneElement,
    deleteOneElement,
    insertOneElement,
    updateOneElement
} from '../lib/db-operations';
import { Db } from 'mongodb';
class ResolversOperationsService {

    private root: object;
    private variables: IVariables;
    private context: IContextData;

    constructor(root: object, variables: IVariables, context: IContextData) {
        this.root = root;
        this.variables = variables;
        this.context = context;
    }
    // Acede a los datos de IContextData
    protected getContext(): IContextData {
        return this.context;
    }
    // Acede a los datos de la base de datos MongoDB
    protected getDb(): Db {
        return this.context.db!;
    }
    // Acede a los datos de las Interfaz de las Variables 
    protected getVariables(): IVariables { return this.variables; }

    // Listar información
    protected async list(collection: string, listElement: string) {
        try {
            return {
                status: true,
                message: `Lista de ${listElement} correctamente cargada`,
                items: await findElements(this.getDb(), collection)
            };
        } catch (error) {
            return {
                status: false,
                message: `Lista de ${listElement} no cargada: ${error}`,
                items: null
            };
        }

    }


    // Obtener detalles del item
    protected async get(collection: string) {

        const collectionLabel = collection.toLocaleLowerCase();

        try { // Respuesta correcta
            return await findOneElement(this.getDb(), collection, { id: this.variables.id }).then(
                result => {
                    // Encuentra información
                    if (result) {
                        return {
                            status: true,
                            message: `${collectionLabel} ${this.variables.id} ha sido cargada correctamente con sus detalles`,
                            item: result
                        };
                    }
                    // No encuentra información
                    return {
                        status: true,
                        message: `${collectionLabel} no ha obtenido detalles`,
                        item: null
                    };
                });

        } // Respuesta inesperada (Error)
        catch (error) {
            // Status false
            return {
                status: false,
                message: `Error inesperado al queres cargar los detalles de ${collectionLabel}`,
                item: null
            };
        }
    }

    // Añadir item
    protected async add(collection: string, document: object, item: string) {
        try {
            return await insertOneElement(this.getDb(), collection, document).then(
                res => {
                    if (res.result.ok === 1) {
                        return {
                            status: true,
                            message: `Añadido correctamente inesperado el ${item}`,
                            item: document
                        };
                    }
                    return {
                        status: false,
                        message: `No se a insertar el ${item}`,
                        item: null
                    };
                }
            );

        } catch (error) {
            return {
                status: false,
                message: `Errror inesperado al insertar el ${item}`,
                item: null
            };
        }
    }

    // Modificar item

    protected async update(collection: string, filter: object, objectUpdate: object, item: string) {

        try {
            return await updateOneElement(
                this.getDb(),
                collection,
                filter,
                objectUpdate
            ).then(
                res => {
                    if (res.result.nModified === 1 && res.result.ok) {
                        return {
                            status: true,
                            message: `Elemento del ${item} actualizado correctamente.`,
                            item: Object.assign({}, filter, objectUpdate)
                        };
                    }
                    return {
                        status: false,
                        message: `Elemento del ${item} no se ha actualizado. Comprueba que estás filtrando correctamente o simplemente que no hay nada que actualizar.`,
                        item: null
                    };
                }
            );
        } catch (error) {
            return {
                status: false,
                message: `Erorr inesperado al actualizar el ${item}`,
                item: null
            }

        }
    }

    // Eliminar item
    protected async del(collection: string, filter: object, item: string) {
        try {
            return await deleteOneElement(this.getDb(), collection, filter).then(
                res => {
                    if (res.deletedCount === 1) {
                        return {
                            status: true,
                            message: `Elemento del ${item} eliminado correctamente.`
                        };
                    }
                    return {
                        status: false,
                        message: `Elemento del ${item} No se ha eliminado. Comprueba el filtro.`
                    };
                }
            );
        } catch (error) {
            return {
                status: false,
                message: `Error inesperado al eliminar el ${item}.`,
            };
        }
    }
}

export default ResolversOperationsService;