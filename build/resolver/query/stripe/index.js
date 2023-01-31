"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = __importDefault(require("./card"));
const customer_1 = __importDefault(require("./customer"));
const charge_1 = __importDefault(require("./charge"));
const GMR = require('@wiicamp/graphql-merge-resolvers');
const queryStripeResolver = GMR.merge([
    customer_1.default,
    card_1.default,
    charge_1.default,
]);
exports.default = queryStripeResolver;
