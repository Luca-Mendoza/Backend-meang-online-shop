"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolversProdutType = {
    Product: {
        screenshoot: (parent) => {
            return parent.screenshoot || parent.shortScreenshots || [];
        },
    },
};
exports.default = resolversProdutType;
