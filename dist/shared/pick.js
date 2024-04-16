"use strict";
//* src/shared/pick.ts
Object.defineProperty(exports, "__esModule", { value: true });
//! Selecting Data Fields for Filtering and Searching : vul search/filtering field dile ignore korbe, sothik dile search/filter kaaj korbe
const pick = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    // console.dir(finalObj, { depth: Infinity });
    return finalObj;
};
exports.default = pick;
