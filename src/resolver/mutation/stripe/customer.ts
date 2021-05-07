import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../../../config/constants';
import { IStripeCustomer } from '../../../interfaces/stripe/customer.interface';
import { IUser } from '../../../interfaces/user.interface';
import { findOneElement } from '../../../lib/db-operations';
import StripeApi, {
	STRIPE_ACTION,
	STRIPE_OBJECTS,
} from '../../../lib/stripe-api';
import UsersService from '../../../services/users.service';

const resolversStipeCustomerMutation: IResolvers = {
	Mutation: {
		async createCustomer(_, { name, email }, { db }) {
			// Comprobar que el cliente no exista y en el caso de que exista,
			// devolver diciendo que no se puede añadir
			const userCheckExiste: {
				data: Array<IStripeCustomer>;
			} = await new StripeApi().execute(
				STRIPE_OBJECTS.CUSTOMERS,
				STRIPE_ACTION.LIST,
				{ email },
			);
			if (userCheckExiste.data.length > 0) {
				// Usuario Existe
				return {
					status: false,
					message: `El usuario con el email ${email} ya existe en el sistema`,
				};
			}
			// Crea un nuevo usuario en el sistema de stripe
			return await new StripeApi()
				.execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTION.CREARTE, {
					name,
					email,
					description: `${name} (${email})`,
				})

				.then(async (result: IStripeCustomer) => {
					// Actualizar en nuestra base de datos con la nueva propiedad,
					// que es el ID del cliente
					const user: IUser = await findOneElement(
						db,
						COLLECTIONS.USERS,
						{ email },
					);
					if (user) {
						user.stripeCustomer = result.id;
						const resultUserOperation = await new UsersService(
							_,
							{ user },
							{ db },
						).modify();
						// Si el resultado es falso, no se ha ejecutado. Tenemos que borrar el cliente creado en stripe.
					}
					return {
						status: true,
						message: `El cliente ${name} se ha creado correctamente`,
						customer: result,
					};
				})
				.catch((error: Error) => {
					return {
						status: false,
						message: `Error: `.concat(error.message),
					};
				});
		},
		async upDateCustomer(_, { id, customer }) {
			console.log(id, customer);
			return await new StripeApi()
				.execute(
					STRIPE_OBJECTS.CUSTOMERS,
					STRIPE_ACTION.UPDATE,
					id,
					customer,
				)
				.then((result: IStripeCustomer) => {
					return {
						status: true,
						message: `Usuario ${id} actualizado correctamente`,
						customer: result,
					};
				})
				.catch((error: Error) => {
					return {
						status: false,
						message: 'Error: '.concat(error.message),
					};
				});
		},
		async deleteCustomer(_, { id }, { db }) {
			return await new StripeApi()
				.execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTION.DELETE, id)
				.then(async (result: { id: string; deleted: boolean }) => {
					if (result.deleted) {
						const resultOperation = await db
							.collection(COLLECTIONS.USERS)
							.updateOne(
								{
									stripeCustomer: result.id,
								},
								{
									$unset: {
										stripeCustomer: result.id,
									},
								},
							);
						return {
							status: result.deleted && resultOperation ? true : false,
							message:
								result.deleted && resultOperation
									? `Usuario ${id} eliminado correctamente`
									: `Usuario no se ha actualizado en la base de dato nuestra`,
						};
					}
					return {
						status: false,
						message: `Usuario ${id} no se ha actualizado. Compruebalo`,
					};
				})
				.catch((error: Error) => {
					return {
						status: false,
						message: 'Error: '.concat(error.message),
					};
				});
		},
	},
};

export default resolversStipeCustomerMutation;
