"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_1 = __importDefault(require("./email"));
const genre_1 = __importDefault(require("./genre"));
const shop_product_1 = __importDefault(require("./shop-product"));
const stripe_1 = __importDefault(require("./stripe"));
const tag_1 = __importDefault(require("./tag"));
const user_1 = __importDefault(require("./user"));
const GMR = require('@wiicamp/graphql-merge-resolvers');
const mutationResolver = GMR.merge([
    user_1.default,
    genre_1.default,
    tag_1.default,
    email_1.default,
    stripe_1.default,
    shop_product_1.default,
]);
exports.default = mutationResolver;
