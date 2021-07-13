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
				console.log(error.message);
			});
	}
	async create(customer: string, tokenCard: string) {}
}


export default StripeCardService;
