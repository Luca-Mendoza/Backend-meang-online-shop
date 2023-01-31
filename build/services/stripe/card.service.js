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
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_api_1 = __importStar(require("../../lib/stripe-api"));
class StripeCardService extends stripe_api_1.default {
    createToken(card) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.execute(stripe_api_1.STRIPE_OBJECTS.TOKENS, stripe_api_1.STRIPE_ACTIONS.CREATE, {
                card: {
                    number: card.number,
                    exp_month: card.expMonth,
                    exp_year: card.expYear,
                    cvc: card.cvc,
                },
            })
                .then((result) => {
                return {
                    status: true,
                    message: `Token ${result.id} creado correctamente`,
                    token: result.id,
                };
            })
                .catch((error) => {
                console.log(error.message);
            });
        });
    }
    create(customer, tokenCard) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.execute(stripe_api_1.STRIPE_OBJECTS.CUSTOMERS, stripe_api_1.STRIPE_ACTIONS.CREATE_SOURCE, customer, { source: tokenCard })
                .then((result) => {
                return {
                    status: true,
                    message: `Tarjeta ${result.id} creada correctamente`,
                    id: result.id,
                    card: result,
                };
            })
                .catch((error) => this.getError(error));
        });
    }
    get(customer, card) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.execute(stripe_api_1.STRIPE_OBJECTS.CUSTOMERS, stripe_api_1.STRIPE_ACTIONS.GET_RETRIEVE_SOURCE, customer, card)
                .then((result) => {
                return {
                    status: true,
                    message: `Detalle de la tarjeta ${result.id} mostrado correctamente`,
                    id: result.id,
                    card: result,
                };
            })
                .catch((error) => this.getError(error));
        });
    }
    update(customer, card, details) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.execute(stripe_api_1.STRIPE_OBJECTS.CUSTOMERS, stripe_api_1.STRIPE_ACTIONS.UPDATE_SOURCE, customer, card, details)
                .then((result) => {
                return {
                    status: true,
                    message: `Actualizado ${result.id} correctamente`,
                    id: result.id,
                    card: result,
                };
            })
                .catch((error) => this.getError(error));
        });
    }
    delete(customer, card) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.execute(stripe_api_1.STRIPE_OBJECTS.CUSTOMERS, stripe_api_1.STRIPE_ACTIONS.DELETE_SOURCE, customer, card)
                .then((result) => {
                return {
                    status: result.deleted,
                    message: result.deleted
                        ? `El item ${result.id} ha sido borrado satisfactoriamente`
                        : `El item ${result.id} no se ha borrado`,
                    id: result.id,
                };
            })
                .catch((error) => this.getError(error));
        });
    }
    list(customer, limit = 5, startingAfter = '', endingBefore = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const pagination = this.getPagination(startingAfter, endingBefore);
            return yield this.execute(stripe_api_1.STRIPE_OBJECTS.CUSTOMERS, stripe_api_1.STRIPE_ACTIONS.LIST_SOURCE, customer, Object.assign({ object: 'card', limit }, pagination))
                .then((result) => {
                return {
                    status: true,
                    message: `Lista de tarjetas mostrado correctamente`,
                    cards: result.data,
                    hasMore: result.has_more,
                };
            })
                .catch((error) => this.getError(error));
        });
    }
    removeOtherCards(customer, noDeleteCard) {
        return __awaiter(this, void 0, void 0, function* () {
            const listCards = (yield this.list(customer)).cards;
            listCards === null || listCards === void 0 ? void 0 : listCards.map((item) => __awaiter(this, void 0, void 0, function* () {
                if (item.id !== noDeleteCard && noDeleteCard !== '') {
                    yield this.delete(customer, item.id || '');
                }
            }));
        });
    }
}
exports.default = StripeCardService;
