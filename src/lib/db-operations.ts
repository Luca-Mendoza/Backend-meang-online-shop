import { Db } from 'mongodb';

/**
 * Obtener el Id que vamos a utilizar en el nuevo usuario
 * @param databas Base de datos con la que estamos trabajando
 * @param collection Collección donde queremos buscar el último elemento
 * @param sort Como queremos ordenarlo { <propiedad>: -1 }
 */

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
        .sort({ sort })
        .toArray();
    if (lastElement.length === 0) {
        return 1;
    } else {
        return lastElement[0].id + 1;
    }
};


export const findOneElement = async (
    database: Db,
    collection: string,
    filter: object
) => {
    return database
        .collection(collection)
        .findOne(filter);
};