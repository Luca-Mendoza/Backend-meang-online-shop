"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const environment = dotenv_1.default.config({
    path: './src/.env'
});
if (process.env.NODE_ENV !== 'production') {
    if (environment.error) {
        throw environment.error;
    }
}
exports.default = environment;
