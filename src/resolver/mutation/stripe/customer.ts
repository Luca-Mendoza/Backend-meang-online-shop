import { IResolvers } from 'graphql-tools';
import StripeCustomerService from '../../../services/stripe/customer.service';

const resolversStipeCustomerMutation: IResolvers = {
	Mutation: {
		async createCustomer(_, { name, email }, { db }) {
			return new StripeCustomerService().add(name, email, db);
		},
		async upDateCustomer(_, { id, customer }) {
			return new StripeCustomerService().update(id, customer);
		},
		async deleteCustomer(_, { id }, { db }) {
			return new StripeCustomerService().delete(id, db);
		},
	},
};

export default resolversStipeCustomerMutation;
