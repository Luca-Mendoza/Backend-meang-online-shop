"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shop_product_service_1 = __importDefault(require("../../services/shop-product.service"));
const resolversShopProductsQuery = {
    Query: {
        shopProducts(_1, _a, context_1) {
            return __awaiter(this, arguments, void 0, function* (_, { page, itemsPage, active }, context) {
                return new shop_product_service_1.default(_, { pagination: { page, itemsPage } }, context).items(active);
            });
        },
        shopProductsPlatforms(_1, _a, context_1) {
            return __awaiter(this, arguments, void 0, function* (_, { page, itemsPage, active, platform, random }, context) {
                return new shop_product_service_1.default(_, { pagination: { page, itemsPage } }, context).items(active, platform, random);
            });
        },
        shopProductsOffersLast(_1, _a, context_1) {
            return __awaiter(this, arguments, void 0, function* (_, { page, itemsPage, active, topPrice, lastUnits, random, }, context) {
                let otherFilters = {};
                if (lastUnits > 0 && topPrice > 10) {
                    otherFilters = {
                        $and: [{ price: { $lte: topPrice } }, { stock: { $lte: lastUnits } }],
                    };
                }
                else if (lastUnits <= 0 && topPrice > 10) {
                    otherFilters = { price: { $lte: topPrice } };
                }
                else if (lastUnits > 0 && topPrice <= 10) {
                    otherFilters = { stock: { $lte: lastUnits } };
                }
                return new shop_product_service_1.default(_, { pagination: { page, itemsPage } }, context).items(active, ["-1"], random, otherFilters);
            });
        },
        shopProductDetails(_1, _a, context_1) {
            return __awaiter(this, arguments, void 0, function* (_, { id }, context) {
                console.log(id, typeof id);
                return new shop_product_service_1.default(_, { id }, context).details();
            });
        },
    },
};
exports.default = resolversShopProductsQuery;
