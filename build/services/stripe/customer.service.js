"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const constants_1 = require("../../config/constants");
const db_operations_1 = require("../../lib/db-operations");
const stripe_api_1 = __importStar(require("../../lib/stripe-api"));
const users_service_1 = __importDefault(require("../users.service"));
class StripeCustomerService extends stripe_api_1.default {
    list(limit, startingAfter, endingBefore) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagination = this.getPagination(startingAfter, endingBefore);
            return yield new stripe_api_1.default()
                .execute(stripe_api_1.STRIPE_OBJECTS.CUSTOMERS, stripe_api_1.STRIPE_ACTIONS.LIST, Object.assign({ limit }, pagination))
                .then((result) => {
                return {
                    status: true,
                    message: 'Lista cargada corectamente con los clientes seleccionado',
                    hasMore: result.has_more,
                    customers: result.data,
                };
            })
                .catch((error) => this.getError(error));
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new stripe_api_1.default()
                .execute(stripe_api_1.STRIPE_OBJECTS.CUSTOMERS, stripe_api_1.STRIPE_ACTIONS.GET, id)
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                return {
                    status: true,
                    message: `El cliente ${result.name} se ha obtenido correctamente`,
                    customer: result,
                };
            }))
                .catch((error) => this.getError(error));
        });
    }
    add(name, email, db) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCheckExiste = yield new stripe_api_1.default().execute(stripe_api_1.STRIPE_OBJECTS.CUSTOMERS, stripe_api_1.STRIPE_ACTIONS.LIST, { email });
            if (userCheckExiste.data.length > 0) {
                return {
                    status: false,
                    message: `El usuario con el email ${email} ya existe en el sistema`,
                };
            }
            return yield new stripe_api_1.default()
                .execute(stripe_api_1.STRIPE_OBJECTS.CUSTOMERS, stripe_api_1.STRIPE_ACTIONS.CREATE, {
                name,
                email,
                description: `${name} (${email})`,
            })
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                const user = yield (0, db_operations_1.findOneElement)(db, constants_1.COLLECTIONS.USERS, {
                    email,
                });
                if (user) {
                    user.stripeCustomer = result.id;
                    const resultUserOperation = yield new users_service_1.default({}, { user }, { db }).modify();
                }
                return {
                    status: true,
                    message: `El cliente ${name} se ha creado correctamente`,
                    customer: result,
                };
            }))
                .catch((error) => this.getError(error));
        });
    }
    update(id, customer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new stripe_api_1.default()
                .execute(stripe_api_1.STRIPE_OBJECTS.CUSTOMERS, stripe_api_1.STRIPE_ACTIONS.UPDATE, id, customer)
                .then((result) => {
                return {
                    status: true,
                    message: `Usuario ${id} actualizado correctamente`,
                    customer: result,
                };
            })
                .catch((error) => this.getError(error));
        });
    }
    delete(id, db) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new stripe_api_1.default()
                .execute(stripe_api_1.STRIPE_OBJECTS.CUSTOMERS, stripe_api_1.STRIPE_ACTIONS.DELETE, id)
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                if (result.deleted) {
                    const resultOperation = yield db
                        .collection(constants_1.COLLECTIONS.USERS)
                        .updateOne({
                        stripeCustomer: result.id,
                    }, {
                        $unset: {
                            stripeCustomer: result.id,
                        },
                    });
                    return {
                        status: result.deleted && resultOperation ? true : false,
                        message: result.deleted && resultOperation
                            ? `Usuario ${id} eliminado correctamente`
                            : `Usuario no se ha eliminado en la base de dato nuestra`,
                    };
                }
                return {
                    status: false,
                    message: `Usuario ${id} no se ha actualizado. Compruebalo`,
                };
            }))
                .catch((error) => {
                return {
                    status: false,
                    message: 'Error: '.concat(error.message),
                };
            });
        });
    }
}
exports.default = StripeCustomerService;
