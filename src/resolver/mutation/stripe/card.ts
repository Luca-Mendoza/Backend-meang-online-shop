import { IResolvers } from 'graphql-tools';
import StripeCardService from '../../../services/stripe/card.service';

const resolversStipeCardMutation: IResolvers = {
	Mutation: {
		async createCardToken(_, { card }) {
			return new StripeCardService().createToken(card);
		},
	},
};

export default resolversStipeCardMutation;
