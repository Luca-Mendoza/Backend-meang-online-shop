"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shop_product_1 = __importDefault(require("./shop.product"));
const GMR = require('@wiicamp/graphql-merge-resolvers');
const subscriptionResolvers = GMR.merge([
    shop_product_1.default,
]);
exports.default = subscriptionResolvers;
