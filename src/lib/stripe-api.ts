class StriperApi {
	stripe = require('stripe')(process.env.STRIPE_API_KEY, {
		apiVersion: process.env.STRIPE_API_VERSION,
	});
}

export default StriperApi;
