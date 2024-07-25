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
const users_service_1 = __importDefault(require("../../services/users.service"));
const resolversUserQuery = {
    Query: {
        users(_1, _a, context_1) {
            return __awaiter(this, arguments, void 0, function* (_, { page, itemsPage, active }, context) {
                return new users_service_1.default(_, { pagination: { page, itemsPage } }, context).items(active);
            });
        },
        login(_1, _a, context_1) {
            return __awaiter(this, arguments, void 0, function* (_, { email, password }, context) {
                return new users_service_1.default(_, { user: { email, password } }, context).login();
            });
        },
        me(_, __, { token }) {
            return new users_service_1.default(_, __, { token }).auth();
        },
    },
};
exports.default = resolversUserQuery;
