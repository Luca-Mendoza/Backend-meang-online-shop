"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shop_product_service_1 = __importDefault(require("../../services/shop-product.service"));
const resolversShopProductMutation = {
    Mutation: {
        updateStock(_, { update }, { db, pubsub }) {
            return new shop_product_service_1.default(_, {}, [db]).updateStock(update, pubsub);
        },
    },
};
exports.default = resolversShopProductMutation;
