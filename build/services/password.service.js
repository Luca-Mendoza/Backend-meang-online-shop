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
const constants_1 = require("../config/constants");
const db_operations_1 = require("../lib/db-operations");
const jwt_1 = __importDefault(require("../lib/jwt"));
const email_service_1 = __importDefault(require("./email.service"));
const resolvers_operations_service_1 = __importDefault(require("./resolvers-operations.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordService extends resolvers_operations_service_1.default {
    constructor(root, variables, context) {
        super(root, variables, context);
        this.collection = constants_1.COLLECTIONS.TAGS;
    }
    SendEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const email = ((_a = this.getVariables().user) === null || _a === void 0 ? void 0 : _a.email) || '';
            if (email === undefined || email === '') {
                return {
                    status: false,
                    message: 'El email no se ha definido correctamente.'
                };
            }
            const user = yield (0, db_operations_1.findOneElement)(this.getDb(), constants_1.COLLECTIONS.USERS, { email });
            console.log(user);
            if (user === undefined || user === null) {
                return {
                    status: false,
                    message: `Usuario con el email ${email} no existe.`
                };
            }
            const newUser = {
                id: user.id,
                email
            };
            const token = new jwt_1.default().sign({ user: newUser }, constants_1.EXPIRETIME.M15);
            const html = `Para cambiar de contraseña haz click sobre esto: <a href="${process.env.CLIENT_URL}/#/reset/${token}">Click aquí</a>`;
            const mail = {
                to: email,
                subject: 'Petición para cambiar de contraseña',
                html
            };
            return new email_service_1.default().send(mail);
        });
    }
    chenge() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const id = (_a = this.getVariables().user) === null || _a === void 0 ? void 0 : _a.id;
            let password = (_b = this.getVariables().user) === null || _b === void 0 ? void 0 : _b.password;
            if (id === undefined || id === '') {
                return {
                    status: false,
                    message: 'El ID necesita una información correcta'
                };
            }
            if (password === undefined || password === '' || password === '1234') {
                return {
                    status: false,
                    message: 'El password necesita una información correcta'
                };
            }
            password = bcrypt_1.default.hashSync(password, 10);
            const result = yield this.update(constants_1.COLLECTIONS.USERS, { id }, { password }, 'users');
            return {
                status: result.status,
                message: (result.status) ? 'Contraseña cambiada correctamente' : result.message
            };
        });
    }
}
exports.default = PasswordService;
