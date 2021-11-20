import { IResolvers } from 'graphql-tools';
import query from './query';
import mutation from './mutation';
import type from './type';
import subscription from './subscription';

const resolvers: IResolvers = {
	...query,
	...mutation,
	...subscription,
	...type,
};

export default resolvers;
