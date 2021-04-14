import { IResolvers } from 'graphql-tools';
import { IStripeCustomer } from '../../../interfaces/stripe/customer.interface';
import StripeApi, {
	STRIPE_ACTION,
	STRIPE_OBJECTS,
} from '../../../lib/stripe-api';

const resolversStipeCustomerQuery: IResolvers = {
	Query: {
		async customers(
			_,
			{ limit, startingAfter, endingBefore },
		) {
			let pagination;
			if (startingAfter !== '' && endingBefore === '') {
				pagination = { starting_after: startingAfter };
			} else if (
				startingAfter === '' &&
				endingBefore !== ''
			) {
				pagination = { ending_before: endingBefore };
			} else {
				pagination = {};
			}
			return await new StripeApi()
				.execute(
					STRIPE_OBJECTS.CUSTOMERS,
					STRIPE_ACTION.LIST,
					{ limit, ...pagination },
				)
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
				.catch((error: Error) => {
					return {
						status: false,
						message: 'Error: '.concat(error.message),
						hasMore: false,
					};
				});
		},
	},
};

export default resolversStipeCustomerQuery;
