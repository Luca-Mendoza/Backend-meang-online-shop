"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
const index_1 = __importDefault(require("./../resolver/index"));
const graphql_tools_1 = require("graphql-tools");
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
const loadedFiles = load_files_1.loadFilesSync(`${__dirname}/**/*.graphql`);
const typeDefs = merge_1.mergeTypeDefs(loadedFiles);
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs,
    resolvers: index_1.default,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    }
});
exports.default = schema;
