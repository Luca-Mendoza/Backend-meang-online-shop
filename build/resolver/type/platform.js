"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolversPlatformType = {
    Platform: {
        active: (parent) => (parent.active !== false ? true : false),
    },
};
exports.default = resolversPlatformType;
