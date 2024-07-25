import { IResolvers } from "@graphql-tools/utils";

import StripeCustomerService from "../../../services/stripe/customer.service";

const resolversStipeCustomerQuery: IResolvers = {
  Query: {
    // Cliente Lista
    async customers(_, { limit, startingAfter, endingBefore }) {
      return new StripeCustomerService().list(
        limit,
        startingAfter,
        endingBefore
      );
    },

    async customer(_, { id }) {
      return new StripeCustomerService().get(id);
    },
  },
};

export default resolversStipeCustomerQuery;
