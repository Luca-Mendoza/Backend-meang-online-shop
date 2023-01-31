"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const charge_service_1 = __importDefault(require("../../../services/stripe/charge.service"));
const resolverStripeChargeQuery = {
    Query: {
        chargesByCustomer(_, { customer, limit, startingAfter, endingBefore }) {
            return new charge_service_1.default().listByCustomer(customer, limit, startingAfter, endingBefore);
        },
    },
};
exports.default = resolverStripeChargeQuery;
