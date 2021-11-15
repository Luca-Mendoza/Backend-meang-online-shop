import { IStripeCard } from '../../interfaces/stripe/card.interface';
import { IStripeCharge } from '../../interfaces/stripe/charge.interface';
import { IPayment } from '../../interfaces/stripe/payment.interface';
import StripeApi, {
	STRIPE_ACTIONS,
	STRIPE_OBJECTS,
} from '../../lib/stripe-api';
import StripeCardService from './card.service';
import StripeCustomerService from './customer.service';

class StripeChargeService extends StripeApi {
	private async getClient(customer: string) {
		return new StripeCustomerService().get(customer);
	}

	async orden(payment: IPayment) {
		// Comprobar que existe el cliente
		const userData = await this.getClient(payment.customer);
		if (userData && userData.status) {
			console.log('userData', userData);
			if (payment.token !== undefined) {
				// Asociar el cliente a la tarjeta
				const cardCreate = await new StripeCardService().create(
					payment.customer,
					payment.token,
				);
				// Actualizar como fuente predeterminada de pago
				await new StripeCustomerService().update(payment.customer, {
					default_source: cardCreate?.card?.id,
				});
				// actualizar borrando las demás tarjetas de ese cliente
				await new StripeCardService().removeOtherCards(
					payment.customer,
					cardCreate?.card?.id || '',
				);
			} else if (
				payment.token === undefined &&
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
		// Eliminamo el prametro token para que no se envie al servidor
		delete payment.token;
		// Convertir de 0 a decimal
		payment.amount =
			Math.round((+payment.amount + Number.EPSILON) * 100) / 100;
		payment.amount *= 100;

		// Pago
		return await this.execute(
			STRIPE_OBJECTS.CHARGES,
			STRIPE_ACTIONS.CREATE,
			payment,
		)
			.then((result: object) => {
				return {
					status: true,
					message: 'Pago realizado correctamente!',
					charge: result,
				};
			})
			.catch((error: Error) => this.getError(error));
	}

	async listByCustomer(
		customer: string,
		limit: number,
		startingAfter: string,
		endingBefore: string,
	) {
		const pagination = this.getPagination(
			startingAfter,
			endingBefore,
		);
		return this.execute(
			STRIPE_OBJECTS.CHARGES,
			STRIPE_ACTIONS.LIST,
			{ limit, customer, ...pagination },
		)
			.then(
				(result: {
					has_more: boolean;
					data: Array<IStripeCharge>;
				}) => {
					return {
						status: true,
						message:
							'Lista cargada correctamente con los pagos del cliente seleccionado',
						hasMore: result.has_more,
						charges: result.data,
					};
				},
			)
			.catch((error: Error) => this.getError(error));
	}
}

export default StripeChargeService;
