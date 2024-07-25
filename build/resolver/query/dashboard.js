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
const db_operations_1 = require("../../lib/db-operations");
const resolverDashboardQuery = {
    Query: {
        totalElements(_1, _a, _b) {
            return __awaiter(this, arguments, void 0, function* (_, { collection }, { db }) {
                return yield (0, db_operations_1.countElements)(db, collection);
            });
        },
    },
};
exports.default = resolverDashboardQuery;
