import { COLLECTIONS } from '../config/constants';
import { IResolvers } from 'graphql-tools';
import JWT from '../lib/jwt';

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
                    users: await db
                        .collection(COLLECTIONS.USERS)
                        .find()
                        .toArray()
                };
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    message: 'Error al cargar los Usuarios',
                    users: []
                };
            }
        },

        async login(_, { email, password }, { db }) {
            try {
                const emailVerification = await db
                    .collection(COLLECTIONS.USERS)
                    .findOne({ email });
                if (emailVerification === null) {
                    return {
                        status: false,
                        message: 'Usuario no existe',
                        token: null
                    };
                }

                const user = await db
                    .collection(COLLECTIONS.USERS)
                    .findOne({ email, password });
                return {
                    status: true,
                    message: (user === null)
                        ? 'Password y usuario no correctos, sesión no iniciada '
                        : 'Usuarios cargada correctamente',
                    toke: new JWT().sign({ user })
                };
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    message: 'Error al cargar el usuario. Comprueba que tiene correctamente todo',
                    user: null,
                }
            }
        }
    },

};

export default resolversQuery;