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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = pagination;
const db_operations_1 = require("./db-operations");
function pagination(db_1, collection_1) {
    return __awaiter(this, arguments, void 0, function* (db, collection, page = 1, itemsPage = 20, filter = {}) {
        if (itemsPage < 1 || itemsPage > 20) {
            itemsPage = 20;
        }
        if (page < 1) {
            page = 1;
        }
        const total = yield (0, db_operations_1.countElements)(db, collection, filter);
        const pages = Math.ceil(total / itemsPage);
        return {
            page,
            skip: (page - 1) * itemsPage,
            itemsPage,
            total,
            pages
        };
    });
}
