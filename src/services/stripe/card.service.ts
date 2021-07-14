import { IStripeCard } from '../../interfaces/stripe/card.interface';
import StripeApi, {
	STRIPE_ACTION,
	STRIPE_OBJECTS,
} from '../../lib/stripe-api';

class StripeCardService extends StripeApi {
	async createToken(card: IStripeCard) {
		// 'this' hace referencia a la extencion 'StripeApi'
		return await this.execute(
			STRIPE_OBJECTS.TOKENS,
			STRIPE_ACTION.CREATE,
			{
				card: {
					number: card.number,
					exp_month: card.expMonth,
					exp_year: card.expYear,
					cvc: card.cvc,
				},
			},
		)
			.then((result: { id: string }) => {
				return {
					status: true,
					message: `Token ${result.id} creado correctamente`,
					token: result.id,
				};
			})
			.catch((error: Error) => {
				this.getError(error);
			});
	}
	async create(customer: string, tokenCard: string) {
		// const card = await stripe.customers.createSource(
		// 	'cus_JqUZcxRGJbvxP3',
		// 	{ source: 'tok_mastercard' },
		// );
		return await this.execute(
			STRIPE_OBJECTS.CUSTOMERS,
			STRIPE_ACTION.CREATE_SOURCE,
			customer,
			{ source: tokenCard },
		)
			.then((result: IStripeCard) => {
				return {
					status: true,
					message: `Tarjeta con ${result.id} creado correctamente`,
					id: result.id,
					card: result
				};
			})
			.catch((error: Error) => {
				this.getError(error);
				
			});
	}
	// card = await stripe.customers.retrieveSource(
	// 	'cus_JqUZcxRGJbvxP3',
	// 	'card_1JCnacLcAMPJSB0N6rlb3UkD',
	// );
	get(customer: string, card: string) {}
}

export default StripeCardService;
