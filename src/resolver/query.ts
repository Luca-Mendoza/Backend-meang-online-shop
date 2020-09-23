import { COLLECTIONS } from '../config/constants';
import { IResolvers } from 'graphql-tools';

/**
 *  "Identificador único"
    id: ID!,
    "Nombre/s de pila"
    name: String!,
    "Apellido/s de pila"
    lastname: String!,
    "Correo electrónico único"
    email: String!,
    "Contraseña del usuario asociado a la cuenta"
    password: String!,
    "Fecha de registro en la base de datos"
    registerDate: String!,
    "Fecha de nacimiento - Solo mayores de 18 años"
    brithday: String!
 */
const resolversQuery: IResolvers = {
    Query: {
        async users(_, __, { db }) {
            /**
            console.log(root);
            console.log(args);
            console.log(context);
            console.log(info);
            */
            try {
                return {
                    status: true,
                    message: 'Lista de usuario cargada correctamente',
                    users: await db.collection(COLLECTIONS.USERS).find().toArray()
                };
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    message: 'Error al cargar los Usuarios',
                    users: []
                };
            };
        }
    }

};

export default resolversQuery;