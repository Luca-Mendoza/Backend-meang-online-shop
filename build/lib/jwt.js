"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./../config/constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWT {
    constructor() {
        this.secretKey = constants_1.SECRET_KET;
    }
    sign(data, expiresIn = constants_1.EXPIRETIME.H24) {
        return jsonwebtoken_1.default.sign({ user: data.user }, this.secretKey, { expiresIn });
    }
    verify(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secretKey);
        }
        catch (e) {
            return constants_1.MESSAGES.TOKE_VERICATION_FAILED;
        }
    }
}
exports.default = JWT;
