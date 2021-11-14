import { IPayment } from '../../interfaces/stripe/payment.interface';
import StripeApi, {
	STRIPE_ACTION,
	STRIPE_OBJECTS,
} from '../../lib/stripe-api';

class StripeChargeService extends StripeApi {
	async orden(payment: IPayment) {
		// Convertir de 0 a decimal
		payment.amount = Math.round(
			((+payment.amount + Number.EPSILON) * 100) / 100,
		);
		payment.amount *= 100;

		// Pago
		return await this.execute(
			STRIPE_OBJECTS.CHARGES,
			STRIPE_ACTION.CREATE,
			payment,
		)
			.then((result: object) => {
				return {
					status: true,
					message: 'Pago realizado correctamente',
					charge: result,
				};
			})
			.catch((error: Error) => this.getError(error));
	}
}

export default StripeChargeService;
