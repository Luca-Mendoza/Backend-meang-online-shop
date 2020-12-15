import { Db } from 'mongodb';
import { countElements } from './db-operations';

export async function pagination(
    db: Db,
    collection: string,
    page: number = 1,
    itemsPage: number = 20,
    filter: object = {}
) {
    // Comprobar el numero de items por pagina
    if (itemsPage < 1 || itemsPage > 20) {
        itemsPage = 20;
    }

    // Asignamo a la pagina si es menor que 1 que sea 1 por defecto
    if (page < 1) {
        page = 1;
    }

    // Obtener el numero total de una collection
    const total = await countElements(db, collection, filter);
    // Número de pagimnas totales
    const pages = Math.ceil(total / itemsPage);

    return {
        page,
        skip: (page - 1) * itemsPage,
        itemsPage,
        total,
        pages
    };
}
