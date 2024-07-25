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
exports.manageStockUpdate = exports.randomItems = exports.countElements = exports.findElements = exports.deleteOneElement = exports.updateOneElement = exports.insertManyElement = exports.insertOneElement = exports.findOneElement = exports.asignDocumentId = void 0;
const asignDocumentId = (database_1, collection_1, ...args_1) => __awaiter(void 0, [database_1, collection_1, ...args_1], void 0, function* (database, collection, sort = { registerDate: -1 }) {
    const lastElement = yield database
        .collection(collection)
        .find()
        .limit(1)
        .sort(sort)
        .toArray();
    if (lastElement.length === 0) {
        return '1';
    }
    return String(+lastElement[0].id + 1);
});
exports.asignDocumentId = asignDocumentId;
const findOneElement = (database, collection, filter) => __awaiter(void 0, void 0, void 0, function* () {
    return database.collection(collection).findOne(filter);
});
exports.findOneElement = findOneElement;
const insertOneElement = (database, collection, document) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database
        .collection(collection)
        .insertOne(document);
});
exports.insertOneElement = insertOneElement;
const insertManyElement = (database, collection, documents) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database
        .collection(collection)
        .insertMany(documents);
});
exports.insertManyElement = insertManyElement;
const updateOneElement = (database, collection, filter, updateObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database
        .collection(collection)
        .updateOne(filter, { $set: updateObject });
});
exports.updateOneElement = updateOneElement;
const deleteOneElement = (database_1, collection_1, ...args_1) => __awaiter(void 0, [database_1, collection_1, ...args_1], void 0, function* (database, collection, filter = {}) {
    return yield database.collection(collection).deleteOne(filter);
});
exports.deleteOneElement = deleteOneElement;
const findElements = (database_1, collection_1, ...args_1) => __awaiter(void 0, [database_1, collection_1, ...args_1], void 0, function* (database, collection, filter = {}, paginationOptions = {
    page: 1,
    pages: 1,
    itemsPage: -1,
    skip: 0,
    total: -1,
}) {
    if (paginationOptions.total === -1) {
        return yield database
            .collection(collection)
            .find(filter)
            .toArray();
    }
    return yield database
        .collection(collection)
        .find(filter)
        .limit(paginationOptions.itemsPage)
        .skip(paginationOptions.skip)
        .toArray();
});
exports.findElements = findElements;
const countElements = (database_1, collection_1, ...args_1) => __awaiter(void 0, [database_1, collection_1, ...args_1], void 0, function* (database, collection, filter = {}) {
    return yield database
        .collection(collection)
        .countDocuments(filter);
});
exports.countElements = countElements;
const randomItems = (database_1, collection_1, ...args_1) => __awaiter(void 0, [database_1, collection_1, ...args_1], void 0, function* (database, collection, filter = {}, items = 10) {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const pipeline = [
            { $match: filter },
            { $sample: { size: items } },
        ];
        resolve(yield database
            .collection(collection)
            .aggregate(pipeline)
            .toArray());
    }));
});
exports.randomItems = randomItems;
const manageStockUpdate = (database, collection, filter, updateObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database
        .collection(collection)
        .updateOne(filter, { $inc: updateObject });
});
exports.manageStockUpdate = manageStockUpdate;
