import { IResolvers } from "@graphql-tools/utils";

import StripeCardService from "../../../services/stripe/card.service";

const resolversStipeCardQuery: IResolvers = {
  Query: {
    // card Obtenemos inf de la tarjeta de credito del cliente
    async card(_, { customer, card }) {
      return new StripeCardService().get(customer, card);
    },

    // Card Lista del cliente seleccionado
    async cards(_, { customer, limit, startingAfter, endingBefore }) {
      return new StripeCardService().list(
        customer,
        limit,
        startingAfter,
        endingBefore
      );
    },
  },
};

export default resolversStipeCardQuery;
