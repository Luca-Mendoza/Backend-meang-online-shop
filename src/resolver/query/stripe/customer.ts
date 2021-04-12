import { IResolvers } from 'graphql-tools';
import StripeApi from '../../../lib/stripe-api';

const resolversStipeCustomerQuery: IResolvers = {
    Query: {
        async customers(_, { limit }) {
            console.log(limit);
        }
    },
};

export default resolversStipeCustomerQuery;
