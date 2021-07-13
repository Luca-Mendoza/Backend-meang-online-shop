import { IResolvers } from 'graphql-tools';
import StripeApi, {
	STRIPE_ACTION,
	STRIPE_OBJECTS,
} from './../../../lib/stripe-api';
import StripeCustomerService from '../../../services/stripe/customer.service';

const resolversStipeCardMutation: IResolvers = {
	Mutation: {
		async createCardToken(_, { card }) {
			console.log(card);

			return await new StripeApi()
				.execute(STRIPE_OBJECTS.TOKENS, STRIPE_ACTION.CREATE, {
					card: {
						number: card.number,
						exp_month: card.expMonth,
						exp_year: card.expYear,
						cvc: card.cvc,
					},
				})

				.then((result: { id: string }) => {
					return {
						status: true,
						message: `Token ${result.id} creado correctamente`,
						token: result.id,
					};
				})
				.catch((error: Error) => {
					console.log(error.message);
				});

			// return new StripeCustomerService().add(name, email, db);
		},
	},
};

export default resolversStipeCardMutation;
