import { IResolvers } from 'graphql-tools';
import { IStripeCustomer } from '../../../interfaces/stripe/customer.interface';
import StripeApi, {
	STRIPE_ACTION,
	STRIPE_OBJECTS,
} from '../../../lib/stripe-api';

const resolversStipeCustomerMutation: IResolvers = {
	Mutation: {
		async createCustomer(_, { name, email }) {
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
				.execute(
					STRIPE_OBJECTS.CUSTOMERS,
					STRIPE_ACTION.CREARTE,
					{
						name,
						email,
						description: `${name} (${email})`,
					},
				)

				.then((result: object) => {
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
	},
};

export default resolversStipeCustomerMutation;
