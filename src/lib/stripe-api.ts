// Referencia para los clientes
export const STRIPE_OBJECTS = {
	CUSTOMERS: 'customers',
};

// Referencia para la acción Crear / Editat / Actualizar / etc..
export const STRIPE_ACTION = {
	CREARTE: 'create',
	LIST: 'list',
};

class StripeApi {
	// Configuración de la Autenticación de la API de Stripe
	private stripe = require('stripe')(
		process.env.STRIPE_API_KEY,
		{
			apiVersion: process.env.STRIPE_API_VERSION,
		},
	);
	/**
	 * execute: función para ejecutar
	 * object : Customer/ Los cargos/ targert/ los productos/ etc..
	 * action:  Crear / Editat / Actualizar / etc..
	 *  args:  Argumento / etc..
	 */
	async execute(
		object: string,
		action: string,
		...args: [string | object, (string | object)?]
	) {
		return await this.stripe[object][action](...args);
	}
}

export default StripeApi;
