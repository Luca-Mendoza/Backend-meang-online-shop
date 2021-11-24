import { Resolver } from 'dns';
import { Db } from 'mongodb';
import { IPaginationOptions } from '../interfaces/pagination-options.interface';

/**
 * Obtener el Id que vamos a utilizar en el nuevo usuario
 * @param databas Base de datos con la que estamos trabajando
 * @param collection Collección donde queremos buscar el último elemento
 * @param sort Como queremos ordenarlo { <propiedad>: -1 }
 */
/**Asignar el ID del Documento */
export const asignDocumentId = async (
	database: Db,
	collection: string,
	sort: object = { registerDate: -1 },
) => {
	// Comprobar el Último usuarios registrado para asignar ID
	const lastElement = await database
		.collection(collection)
		.find()
		.limit(1)
		.sort(sort)
		.toArray();
	if (lastElement.length === 0) {
		return '1';
	}
	return String(+lastElement[0].id + 1);
};

/**Buscar un Elemento */
export const findOneElement = async (
	database: Db,
	collection: string,
	filter: object,
) => {
	return database.collection(collection).findOne(filter);
};

/**Insertar un Elemento */
export const insertOneElement = async (
	database: Db,
	collection: string,
	document: object,
) => {
	return await database
		.collection(collection)
		.insertOne(document);
};

/**Insertar varios  Elemento */
export const insertManyElement = async (
	database: Db,
	collection: string,
	documents: Array<object>,
) => {
	return await database
		.collection(collection)
		.insertMany(documents);
};

/**Actualizar un Elemento */
export const updateOneElement = async (
	database: Db,
	collection: string,
	filter: object,
	updateObject: object,
) => {
	return await database
		.collection(collection)
		.updateOne(filter, { $set: updateObject });
};

/** Eliminar un Elemento */
export const deleteOneElement = async (
	database: Db,
	collection: string,
	filter: object = {},
) => {
	return await database.collection(collection).deleteOne(filter);
};

/**Buscar varios Elemento */
export const findElements = async (
	database: Db,
	collection: string,
	filter: object = {},
	paginationOptions: IPaginationOptions = {
		page: 1,
		pages: 1,
		itemsPage: -1,
		skip: 0,
		total: -1,
	},
) => {
	if (paginationOptions.total === -1) {
		return await database
			.collection(collection)
			.find(filter)
			.toArray();
	}
	return await database
		.collection(collection)
		.find(filter)
		.limit(paginationOptions.itemsPage)
		.skip(paginationOptions.skip)
		.toArray();
};

/** Contar los documentos que hay dentro de  una collection */
export const countElements = async (
	database: Db,
	collection: string,
	filter: object = {},
) => {
	return await database
		.collection(collection)
		.countDocuments(filter);
};

/**
 *  para obtener items aleatorios teniendo encuenta un filtro y
 *  teniendo encuenta cuantos elementos queremos obtener
 */
export const randomItems = async (
	database: Db,
	collection: string,
	filter: object = {},
	items: number = 10,
): Promise<Array<object>> => {
	return new Promise(async (resolve) => {
		const pipeline = [
			{ $match: filter }, //Busca todos los elementos que coincidan con ese filtro
			{ $sample: { size: items } }, // Devolvemos x items aletorios
		];
		resolve(
			await database
				.collection(collection)
				.aggregate(pipeline)
				.toArray(),
		);
	});
};

/**Gestiín del strock de productos */

// Gestión del stock de productos
export const manageStockUpdate = async (
  database: Db,
  collection: string,
  filter: object,
  updateObject: object
) => {
  return await database
    .collection(collection)
    .updateOne(filter, { $inc: updateObject });
};