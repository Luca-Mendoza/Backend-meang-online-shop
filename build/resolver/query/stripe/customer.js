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
const customer_service_1 = __importDefault(require("../../../services/stripe/customer.service"));
const resolversStipeCustomerQuery = {
    Query: {
        customers(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { limit, startingAfter, endingBefore }) {
                return new customer_service_1.default().list(limit, startingAfter, endingBefore);
            });
        },
        customer(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { id }) {
                return new customer_service_1.default().get(id);
            });
        },
    },
};
exports.default = resolversStipeCustomerQuery;
