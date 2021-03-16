import { IResolvers } from 'graphql-tools';

const resolversProdutType: IResolvers = {
	Product: {
		screenshoot: (parent) => parent.shortScreenshots,
	},
};

export default resolversProdutType;
