import { IResolvers } from "@graphql-tools/utils";

const resolversProdutType: IResolvers = {
  Product: {
    screenshoot: (parent) => parent.shortScreenshots,
  },
};

export default resolversProdutType;
