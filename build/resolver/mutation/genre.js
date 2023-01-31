"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genre_service_1 = __importDefault(require("../../services/genre.service"));
const resolversGenreMutation = {
    Mutation: {
        addGenre(_, variables, context) {
            return new genre_service_1.default(_, variables, context).insert();
        },
        updateGenre(_, variables, context) {
            return new genre_service_1.default(_, variables, context).modify();
        },
        deleteGenre(_, variables, context) {
            return new genre_service_1.default(_, variables, context).delete();
        },
        blockGenre(_, variables, context) {
            return new genre_service_1.default(_, variables, context).block();
        }
    }
};
exports.default = resolversGenreMutation;
