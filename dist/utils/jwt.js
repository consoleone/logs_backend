"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.getJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validate_1 = require("../env/validate");
const getJwt = (payload) => {
    return jsonwebtoken_1.default.sign(payload, validate_1.parsedEnv.JWT_SECRET_KEY);
};
exports.getJwt = getJwt;
const verifyJwt = (token) => {
    return jsonwebtoken_1.default.verify(token, validate_1.parsedEnv.JWT_SECRET_KEY);
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.js.map