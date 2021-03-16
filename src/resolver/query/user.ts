import { findOneElement, findElements } from './../../lib/db-operations';
import { COLLECTIONS, EXPIRETIME } from './../../config/constants';
import { MESSAGES } from '.././../config/constants';
import { IResolvers } from 'graphql-tools';
import JWT from './../../lib/jwt';
import bcrypt from 'bcrypt';
import UsersService from '../../services/users.service';

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
const resolversUserQuery: IResolvers = {
	Query: {
		async users(_, { page, itemsPage, active }, context) {
			/**
            console.log(root);
            console.log(args);
            console.log(context);
            console.log(info);
            */
			//console.log(active);
			return new UsersService(
				_,
				{ pagination: { page, itemsPage } },
				context,
			).items(active);
		},

		async login(_, { email, password }, context) {
			return new UsersService(
				_,
				{ user: { email, password } },
				context,
			).login();
		},
		me(_, __, { token }) {
			//console.log(token);
			return new UsersService(_, __, { token }).auth();
		},
	},
};

export default resolversUserQuery;
