"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const platform_1 = __importDefault(require("./platform"));
const product_1 = __importDefault(require("./product"));
const shop_product_1 = __importDefault(require("./shop-product"));
const stripe_1 = __importDefault(require("./stripe"));
const GMR = require('@wiicamp/graphql-merge-resolvers');
const typeResolvers = GMR.merge([
    shop_product_1.default,
    platform_1.default,
    product_1.default,
    stripe_1.default,
]);
exports.default = typeResolvers;
