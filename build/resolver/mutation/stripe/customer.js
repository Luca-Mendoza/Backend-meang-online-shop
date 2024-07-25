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
const resolversStipeCustomerMutation = {
    Mutation: {
        createCustomer(_1, _a, _b) {
            return __awaiter(this, arguments, void 0, function* (_, { name, email }, { db }) {
                return new customer_service_1.default().add(name, email, db);
            });
        },
        upDateCustomer(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { id, customer }) {
                return new customer_service_1.default().update(id, customer);
            });
        },
        deleteCustomer(_1, _a, _b) {
            return __awaiter(this, arguments, void 0, function* (_, { id }, { db }) {
                return new customer_service_1.default().delete(id, db);
            });
        },
    },
};
exports.default = resolversStipeCustomerMutation;
