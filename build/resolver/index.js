"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = __importDefault(require("./query"));
const mutation_1 = __importDefault(require("./mutation"));
const type_1 = __importDefault(require("./type"));
const subscription_1 = __importDefault(require("./subscription"));
const resolvers = Object.assign(Object.assign(Object.assign(Object.assign({}, query_1.default), mutation_1.default), subscription_1.default), type_1.default);
exports.default = resolvers;
