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
const card_service_1 = __importDefault(require("../../../services/stripe/card.service"));
const resolversStipeCardMutation = {
    Mutation: {
        createCardToken(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { card }) {
                return new card_service_1.default().createToken(card);
            });
        },
        createCard(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { customer, tokenCard }) {
                return new card_service_1.default().create(customer, tokenCard);
            });
        },
        updateCard(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { customer, card, details }) {
                return new card_service_1.default().update(customer, card, details);
            });
        },
        deleteCard(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { customer, card }) {
                return new card_service_1.default().delete(customer, card);
            });
        },
    },
};
exports.default = resolversStipeCardMutation;
