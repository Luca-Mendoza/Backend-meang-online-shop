"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const stripe_api_1 = __importStar(require("../../lib/stripe-api"));
const customer_service_1 = __importDefault(require("./customer.service"));
const card_service_1 = __importDefault(require("./card.service"));
const shop_product_service_1 = __importDefault(require("../shop-product.service"));
class StripeChargeService extends stripe_api_1.default {
    getClient(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            return new customer_service_1.default().get(customer);
        });
    }
    order(payment, stockChange, pubsub, db) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield this.getClient(payment.customer);
            if (userData && userData.status) {
                console.log('Cliente encontrado');
                if (payment.token !== undefined) {
                    const cardCreate = yield new card_service_1.default().create(payment.customer, payment.token);
                    yield new customer_service_1.default().update(payment.customer, {
                        default_source: (_a = cardCreate.card) === null || _a === void 0 ? void 0 : _a.id,
                    });
                    yield new card_service_1.default().removeOtherCards(payment.customer, ((_b = cardCreate.card) === null || _b === void 0 ? void 0 : _b.id) || '');
                }
                else if (payment.token === undefined &&
                    ((_c = userData.customer) === null || _c === void 0 ? void 0 : _c.default_source) === null) {
                    return {
                        status: false,
                        message: 'El cliente no tiene ningún método de pago asignado y no se puede realizar pago',
                    };
                }
            }
            else {
                return {
                    status: false,
                    message: 'El cliente no encontrado y no se puede realizar pago',
                };
            }
            delete payment.token;
            payment.amount =
                Math.round((+payment.amount + Number.EPSILON) * 100) / 100;
            payment.amount *= 100;
            return yield this.execute(stripe_api_1.STRIPE_OBJECTS.CHARGES, stripe_api_1.STRIPE_ACTIONS.CREATE, payment)
                .then((result) => {
                new shop_product_service_1.default({}, {}, { db }).updateStock(stockChange, pubsub);
                return {
                    status: true,
                    message: 'Pago realizado correctamente!',
                    charge: result,
                };
            })
                .catch((error) => this.getError(error));
        });
    }
    listByCustomer(customer, limit, startingAfter, endingBefore) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagination = this.getPagination(startingAfter, endingBefore);
            return this.execute(stripe_api_1.STRIPE_OBJECTS.CHARGES, stripe_api_1.STRIPE_ACTIONS.LIST, Object.assign({ limit, customer }, pagination))
                .then((result) => {
                return {
                    status: true,
                    message: 'Lista cargada correctamente con los pagos del cliente seleccionado',
                    hasMore: result.has_more,
                    charges: result.data,
                };
            })
                .catch((error) => this.getError(error));
        });
    }
}
exports.default = StripeChargeService;
