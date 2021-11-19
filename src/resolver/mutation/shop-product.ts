import { IResolvers } from 'graphql-tools';
import UsersService from '../../services/users.service';

const resolversShopProductMutation: IResolvers = {
	Mutation: {
		updateStock(_, { update }, { db }) {
			console.log(update);
			// return new UsersService(_, { user }, context).register();
		},
	},
};

export default resolversShopProductMutation;
