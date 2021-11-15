import { IResolvers } from 'graphql-tools';
import StripeChargeService from '../../../services/stripe/charge.service';

const resolversStipeChargeMutation: IResolvers = {
	Mutation: {
		async chargeOrder(_, { payment }) {
			return new StripeChargeService().orden(payment);
		},
	},
};
export default resolversStipeChargeMutation;
