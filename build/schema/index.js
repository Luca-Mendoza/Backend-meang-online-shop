"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
const index_1 = __importDefault(require("./../resolver/index"));
const schema_1 = require("@graphql-tools/schema");
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
const loadedFiles = (0, load_files_1.loadFilesSync)(`${__dirname}/**/*.graphql`);
const typeDefs = (0, merge_1.mergeTypeDefs)(loadedFiles);
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs,
    resolvers: index_1.default,
    resolverValidationOptions: {
        requireResolversForResolveType: "ignore",
    },
});
exports.default = schema;
