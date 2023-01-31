"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = __importDefault(require("./card"));
const charge_1 = __importDefault(require("./charge"));
const customer_1 = __importDefault(require("./customer"));
const GMR = require('@wiicamp/graphql-merge-resolvers');
const mutationStripeResolver = GMR.merge([
    customer_1.default,
    card_1.default,
    charge_1.default
]);
exports.default = mutationStripeResolver;
