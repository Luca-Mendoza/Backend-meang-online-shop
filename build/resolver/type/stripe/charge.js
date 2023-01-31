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
const resolversStripeChargeType = {
    StripeCharge: {
        typeOrder: (parent) => parent.object,
        amount: (parent) => parent.amount / 100,
        receiptEmail: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            if (parent.receipt_email) {
                return parent.receipt_email;
            }
            const userData = yield new customer_service_1.default().get(parent.customer);
            return ((_a = userData.customer) === null || _a === void 0 ? void 0 : _a.email) ? (_b = userData.customer) === null || _b === void 0 ? void 0 : _b.email : '';
        }),
        receiptUrl: (parent) => parent.receipt_url,
        card: (parent) => parent.payment_method,
        created: (parent) => new Date(parent.created * 1000).toISOString(),
    },
};
exports.default = resolversStripeChargeType;
