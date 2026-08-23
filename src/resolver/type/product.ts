import { IResolvers } from "@graphql-tools/utils";

const resolversProdutType: IResolvers = {
  Product: {
    screenshoot: (parent) => {
      return parent.screenshoot || parent.shortScreenshots || [];
    },
  },
};

export default resolversProdutType;
