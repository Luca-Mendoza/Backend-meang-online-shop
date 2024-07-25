"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../../services/users.service"));
const resolversUserMutation = {
    Mutation: {
        register(_, { user }, context) {
            return new users_service_1.default(_, { user }, context).register();
        },
        updateUser(_, { user }, context) {
            return new users_service_1.default(_, { user }, context).modify();
        },
        deleteUser(_, { id }, context) {
            return new users_service_1.default(_, { id }, context).delete();
        },
        blockUser(_, { id, unblock, admin }, context) {
            return new users_service_1.default(_, { id }, context).unblock(unblock, admin);
        },
    },
};
exports.default = resolversUserMutation;
