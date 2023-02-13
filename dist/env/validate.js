"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsedEnv = void 0;
const schema_1 = require("./schema");
const env = schema_1.envSchema.safeParse(process.env);
if (!env.success) {
    console.error('❌ Invalid environment variables:\n', env.error.issues
        .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
        .join('\n'));
    throw new Error('Invalid environment variables');
}
exports.parsedEnv = env.data;
//# sourceMappingURL=validate.js.map