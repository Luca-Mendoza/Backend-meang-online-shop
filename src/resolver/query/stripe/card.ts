import { IResolvers } from "graphql-tools";
import StripeCardService from "../../../services/stripe/card.service";
import StripeCustomerService from "../../../services/stripe/customer.service";

const resolversStipeCardQuery: IResolvers = {
  Query: {
    // card Obtenemos inf de la tarjeta de credito del cliente
    async card(_, { customer, card }) {
      return new StripeCardService().get(customer, card);
    },

    // Card Lista del cliente seleccionado
    async cards(_, { limit, startingAfter, endingBefore }) {},
  },
};

export default resolversStipeCardQuery;
