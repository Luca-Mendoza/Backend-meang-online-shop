import { IPayment } from '../../interfaces/stripe/payment.interface';
import StripeApi, {
	STRIPE_ACTION,
	STRIPE_OBJECTS,
} from '../../lib/stripe-api';

class StripeChargeService extends StripeApi {
	async orden(payment: IPayment) {
		//REDONDEA AL VALOR MAS CERCANO ENTERO
		payment.amount = Math.round(
			((+payment.amount + Number.EPSILON) * 100) / 100,
		);
		payment.amount *= 100;
		console.log(payment);
	}
}

export default StripeChargeService;
