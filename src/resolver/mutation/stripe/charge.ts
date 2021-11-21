import { IResolvers } from 'graphql-tools';
import StripeChargeService from '../../../services/stripe/charge.service';

const resolversStipeChargeMutation: IResolvers = {
	Mutation: {
		async chargeOrder(
			_,
			{ payment, stockChange },
			{ db, pubsub },
		) {
			return new StripeChargeService().orden(
				payment,
				stockChange,
				db,
				pubsub,
			);
		},
	},
};
export default resolversStipeChargeMutation;
