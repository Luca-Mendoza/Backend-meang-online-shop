import { IPayment } from '../../interfaces/stripe/payment.interface';
import StripeApi, {
	STRIPE_ACTION,
	STRIPE_OBJECTS,
} from '../../lib/stripe-api';
import StripeCustomerService from './customer.service';

class StripeChargeService extends StripeApi {
	private async getCliente(customer: string) {
		return new StripeCustomerService().get(customer);
	}

	async orden(payment: IPayment) {
		// Comprobar que existe el cliente
		const userData = await this.getCliente(payment.customer);
		if (userData && userData.status) {
			console.log('userData', userData);
			if (payment.tokem !== undefined) {
				// Asociar el cliente a la tarjeta
				// Actualizar como fuente predeterminada de pago
				// actualizar borrando las demás tarjetas de ese cliente
			} else if (
				payment.tokem === undefined &&
				userData.customer?.default_source === null
			) {
				return {
					status: false,
					message:
						'El cliente no tiene ningun método de pago asignado y no se puede realizar el pago',
				};
			}
		} else {
			return {
				status: false,
				message:
					'No se encontró el cliente y no se puede realizar el pago',
			};
		}
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
