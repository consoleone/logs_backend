"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string(),
    ID: zod_1.z.string(),
    PASSWORD: zod_1.z.string(),
    JWT_SECRET_KEY: zod_1.z.string(),
});
//# sourceMappingURL=schema.js.map