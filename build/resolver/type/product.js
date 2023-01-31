"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolversProdutType = {
    Product: {
        screenshoot: (parent) => parent.shortScreenshots,
    },
};
exports.default = resolversProdutType;
