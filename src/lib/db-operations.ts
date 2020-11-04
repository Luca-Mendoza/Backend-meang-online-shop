import { Db } from 'mongodb';

/**
 * Obtener el Id que vamos a utilizar en el nuevo usuario
 * @param databas Base de datos con la que estamos trabajando
 * @param collection Collección donde queremos buscar el último elemento
 * @param sort Como queremos ordenarlo { <propiedad>: -1 }
 */
/**Asignar Documento del ID */
export const asignDocumentId = async (
    database: Db,
    collection: string,
    sort: object = { registerDate: -1 }
) => {
    // Comprobar el Último usuarios registrado para asignar ID
    const lastElement = await database
        .collection(collection)
        .find()
        .limit(1)
        .sort(sort)
        .toArray();
    if (lastElement.length === 0) {
        return 1;
    } else {
        return lastElement[0].id + 1;
    }
};

/**Buscar un Elemento */
export const findOneElement = async (
    database: Db,
    collection: string,
    filter: object
) => {
    return database
        .collection(collection)
        .findOne(filter);
};

/**Insertar un Elemento */
export const insertOneElement = async (
    database: Db,
    collection: string,
    document: object
) => {
    return await database
        .collection(collection)
        .insertOne(document);

};

/**Insertar varios  Elemento */
export const insertManyElement = async (
    database: Db,
    collection: string,
    documents: Array<object>
) => {
    return await database
        .collection(collection)
        .insertMany(documents);

};

/**Buscar varios Elemento */
export const findElements = async (
    database: Db,
    collection: string,
    filter: object = {}
) => {
    return await database
        .collection(collection)
        .find(filter)
        .toArray();
};