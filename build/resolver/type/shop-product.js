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
const constants_1 = require("./../../config/constants");
const platform_service_1 = __importDefault(require("../../services/platform.service"));
const product_service_1 = __importDefault(require("../../services/product.service"));
const db_operations_1 = require("../../lib/db-operations");
const resolversShopProductType = {
    ShopProduct: {
        productId: (parent) => parent.product_id,
        platformId: (parent) => parent.platform_id,
        product: (parent_1, __1, _a) => __awaiter(void 0, [parent_1, __1, _a], void 0, function* (parent, __, { db }) {
            const result = yield new product_service_1.default({}, { id: parent.product_id }, { db }).details();
            return result.product;
        }),
        platform: (parent_1, __1, _a) => __awaiter(void 0, [parent_1, __1, _a], void 0, function* (parent, __, { db }) {
            const result = yield new platform_service_1.default({}, { id: parent.platform_id }, { db }).details();
            return result.platform;
        }),
        relationalProducts: (parent_1, __1, _a) => __awaiter(void 0, [parent_1, __1, _a], void 0, function* (parent, __, { db }) {
            return (0, db_operations_1.findElements)(db, constants_1.COLLECTIONS.SHOP_PRODUCT, {
                $and: [{ product_id: parent.product_id }, { id: { $ne: parent.id } }],
            });
        }),
    },
};
exports.default = resolversShopProductType;
