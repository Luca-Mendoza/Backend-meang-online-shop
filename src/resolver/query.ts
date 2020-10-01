import { MESSAGES } from './../config/constants';
import { COLLECTIONS } from '../config/constants';
import { IResolvers } from 'graphql-tools';
import JWT from '../lib/jwt';
import bcrypt from 'bcrypt';

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
                const user = await db
                    .collection(COLLECTIONS.USERS)
                    .findOne({ email });
                if (user === null) {
                    return {
                        status: false,
                        message: 'Usuario no existe',
                        token: null
                    };
                }

                const passwordCheck = bcrypt.compareSync(password, user.password); // true

                if (passwordCheck != null) {
                    delete user.password;
                    delete user.brithday;
                    delete user.registerDate;
                }
                return {
                    status: true,
                    message: !passwordCheck
                        ? 'Password y usuario no correctos, sesión no iniciada '
                        : 'Usuarios cargada correctamente',
                    token: !passwordCheck
                        ? null
                        : new JWT().sign({ user }),

                };
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    message: 'Error al cargar el usuario. Comprueba que tiene correctamente todo',
                    token: null,
                };
            }
        },
        me(_, __, { token }) {
            console.log(token);
            let info = new JWT().verify(token);
            if(info === MESSAGES.TOKE_VERICATION_FAILED){
                return {
                    status:false,
                    message: info,
                    user: null
                };
            }
            return {
                status: true,
                message: 'Usuario autenticado correctamente mediante el token',
                user: Object.values(info)[0]
            };
        }
    },

};

export default resolversQuery;