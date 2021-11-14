import resolversStripeChargeType from './charge';

const GMR = require('@wiicamp/graphql-merge-resolvers');

const typeStripeResolvers = GMR.merge([
	resolversStripeChargeType,
]);

export default typeStripeResolvers;
