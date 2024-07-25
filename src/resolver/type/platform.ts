import { IResolvers } from "@graphql-tools/utils";

const resolversPlatformType: IResolvers = {
  Platform: {
    active: (parent) => (parent.active !== false ? true : false),
  },
};

export default resolversPlatformType;
