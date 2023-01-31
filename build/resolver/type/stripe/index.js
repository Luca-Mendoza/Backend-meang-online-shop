"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const charge_1 = __importDefault(require("./charge"));
const GMR = require('@wiicamp/graphql-merge-resolvers');
const typeStripeResolvers = GMR.merge([
    charge_1.default,
]);
exports.default = typeStripeResolvers;
