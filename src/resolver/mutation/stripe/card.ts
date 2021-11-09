import { IResolvers } from "graphql-tools";
import StripeCardService from "../../../services/stripe/card.service";

const resolversStipeCardMutation: IResolvers = {
  Mutation: {
    async createCardToken(_, { card }) {
      return new StripeCardService().createToken(card);
    },
    async createCard(_, { customer, tokenCard }) {
      return new StripeCardService().create(customer, tokenCard);
    },
    async updateCard(_, { customer, card, details }) {
      return new StripeCardService().update(customer, card, details);
    },
  },
};

export default resolversStipeCardMutation;
