import { Db } from 'mongodb';
import { COLLECTIONS } from '../../config/constants';
import { IStripeCustomer } from '../../interfaces/stripe/customer.interface';
import { IUser } from '../../interfaces/user.interface';
import { findOneElement } from '../../lib/db-operations';
import StripeApi, {
	STRIPE_ACTION,
	STRIPE_OBJECTS,
} from '../../lib/stripe-api';
import UsersService from '../users.service';

class StripeCustomerService extends StripeApi {
	// Clientes Listas
	async list(
		limit: number,
		startingAfter: string,
		endingBefore: string,
	) {
		let pagination;
		if (startingAfter !== '' && endingBefore === '') {
			pagination = { starting_after: startingAfter };
		} else if (startingAfter === '' && endingBefore !== '') {
			pagination = { ending_before: endingBefore };
		} else {
			pagination = {};
		}
		return await new StripeApi()
			.execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTION.LIST, {
				limit,
				...pagination,
			})
			// Respuesta satisfactoria (Result: Tipo de dato que nos esta devolviendo)
			.then(
				(result: {
					// Valor traido de la API Stripe 'true' habrá más datos disponibles.
					has_more: boolean;
					// Datos disponibles del cliente
					data: Array<IStripeCustomer>;
				}) => {
					return {
						status: true,
						message:
							'Lista cargada corectamente con los clientes seleccionado',
						hasMore: result.has_more,
						customers: result.data,
					};
				},
			)
			.catch((error: Error) => this.getError(error));
	}

	// Cliente
	async get(id: string) {
		return await new StripeApi()
			.execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTION.GET, id)
			.then(async (result: IStripeCustomer) => {
				return {
					status: true,
					message: `El cliente ${result.name} se ha obtenido correctamente`,
					customer: result,
				};
			})
			.catch((error: Error) => this.getError(error));
	}
	// Crear Cliente
	async add(name: string, email: string, db: Db) {
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
						{},
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
			.catch((error: Error) => this.getError(error));
	}
	// Actualizar Cliente
	async update(id: string, customer: IStripeCustomer) {
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
			.catch((error: Error) => this.getError(error));
	}
	// Eliminar un Cliente
	async delete(id: string, db: Db) {
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
								: `Usuario no se ha eliminado en la base de dato nuestra`,
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
	}
}

export default StripeCustomerService;
