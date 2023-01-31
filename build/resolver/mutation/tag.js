"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tags_service_1 = __importDefault(require("../../services/tags.service"));
const resolversTagMutation = {
    Mutation: {
        addTag(_, variables, context) {
            return new tags_service_1.default(_, variables, context).insert();
        },
        updateTag(_, variables, context) {
            return new tags_service_1.default(_, variables, context).modify();
        },
        deleteTag(_, variables, context) {
            return new tags_service_1.default(_, variables, context).delete();
        },
        blockTag(_, variables, context) {
            return new tags_service_1.default(_, variables, context).block();
        },
    },
};
exports.default = resolversTagMutation;
