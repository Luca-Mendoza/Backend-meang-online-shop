import { IResolvers } from 'graphql-tools';
import StripeChargeService from '../../../services/stripe/carge.service';

const resolversStipeChargeMutation: IResolvers = {
	Mutation: {
		async chargeOrder(_, { payment }) {
			return new StripeChargeService().orden(payment);
		},
		async createCard(_, { customer, tokenCard }) {
			//return new StripeCardService().create(customer, tokenCard);
		},
		async updateCard(_, { customer, card, details }) {
			//return new StripeCardService().update(customer, card, details);
		},
		async deleteCard(_, { customer, card }) {
			// return new StripeCardService().delete(customer, card);
		},
	},
};
export default resolversStipeChargeMutation;
