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
const constants_1 = require("./../config/constants");
const db_operations_1 = require("./../lib/db-operations");
const resolvers_operations_service_1 = __importDefault(require("./resolvers-operations.service"));
const slugify_1 = __importDefault(require("slugify"));
class TagsService extends resolvers_operations_service_1.default {
    constructor(root, variables, context) {
        super(root, variables, context);
        this.collection = constants_1.COLLECTIONS.TAGS;
    }
    items() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const page = (_a = this.getVariables().pagination) === null || _a === void 0 ? void 0 : _a.page;
            const itemsPage = (_b = this.getVariables().pagination) === null || _b === void 0 ? void 0 : _b.itemsPage;
            console.log(this.getVariables().pagination);
            console.log(page, itemsPage);
            const result = yield this.list(this.collection, 'tags', page, itemsPage);
            return { info: result.info, status: result.status, message: result.message, tags: result.items };
        });
    }
    details() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.get(this.collection);
            return { status: result.status, message: result.message, tag: result.item };
        });
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = this.getVariables().tag;
            if (!this.checkData(tag || '')) {
                return {
                    status: false,
                    message: 'El tag no se ha especificado correctamente',
                    tag: null
                };
            }
            if (yield this.checkInDatabase(tag || '')) {
                return {
                    status: false,
                    message: 'El tag existe en la base de datos, intenta con otro tag',
                    tag: null
                };
            }
            const tagObject = {
                id: yield db_operations_1.asignDocumentId(this.getDb(), this.collection, { id: -1 }),
                name: tag,
                slug: slugify_1.default(tag || '', { lower: true })
            };
            const result = yield this.add(this.collection, tagObject, 'tag');
            return { status: result.status, message: result.message, tag: result.item };
        });
    }
    modify() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.getVariables().id;
            const tag = this.getVariables().tag;
            if (!this.checkData(String(id) || '')) {
                return {
                    status: false,
                    message: 'El ID del tag no se ha especificado correctamente',
                    tag: null
                };
            }
            if (!this.checkData(tag || '')) {
                return {
                    status: false,
                    message: 'El tag no se ha especificado correctamente',
                    tag: null
                };
            }
            const objectUpdate = {
                name: tag,
                slug: slugify_1.default(tag || '', { lower: true })
            };
            const result = yield this.update(this.collection, { id }, objectUpdate, 'genero');
            return { status: result.status, message: result.message, tag: result.item };
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.getVariables().id;
            if (!this.checkData(String(id) || '')) {
                return {
                    status: false,
                    message: 'El ID del tag no se ha especificado correctamente',
                    tag: null
                };
            }
            const result = yield this.del(this.collection, { id }, 'genero');
            return { status: result.status, message: result.message };
        });
    }
    block() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.getVariables().id;
            if (!this.checkData(String(id) || '')) {
                return {
                    status: false,
                    message: 'El ID del tag no se ha especificado correctamente',
                    tag: null
                };
            }
            const result = yield this.update(this.collection, { id }, { active: false }, 'tag');
            return {
                status: result.status,
                message: (result.status) ? 'Bloqueado correctamente' : 'No se ha bloqueado comprobarlo por favor'
            };
        });
    }
    checkData(value) {
        return (value === '' || value === undefined) ? false : true;
    }
    checkInDatabase(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_operations_1.findOneElement(this.getDb(), this.collection, {
                name: value
            });
        });
    }
}
exports.default = TagsService;
