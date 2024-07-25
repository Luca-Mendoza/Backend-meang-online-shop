import { IResolvers } from "@graphql-tools/utils";

import StripeChargeService from "../../../services/stripe/charge.service";

const resolversStipeChargeMutation: IResolvers = {
  Mutation: {
    async chargeOrder(_, { payment, stockCharge }, { db, pubsub }) {
      return new StripeChargeService().order(payment, stockCharge, db, pubsub);
    },
  },
};
export default resolversStipeChargeMutation;
