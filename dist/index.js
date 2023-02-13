"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const validate_1 = require("./env/validate");
const jwt_1 = require("./utils/jwt");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return next(new CustomError('Token is not provided', 401));
    try {
        const { _id } = (0, jwt_1.verifyJwt)(token);
        res.send(`Hello ${_id}`);
    }
    catch (error) {
        next(new CustomError('Invalid Token', 401));
    }
});
app.get('/login', (req, res) => {
    const { id, password } = req.body;
    if (id === validate_1.parsedEnv.ID && password === validate_1.parsedEnv.PASSWORD) {
        const token = (0, jwt_1.getJwt)({ _id: id });
        res.cookie('token', token, { httpOnly: true });
        return res.send('Login Success');
    }
    return res.send('Login Failed');
});
app.get('/logs', async (req, res) => {
    const token = req.cookies.token;
    if (!token)
        return res.send('Token is not provided').redirect('/login');
    try {
        (0, jwt_1.verifyJwt)(token);
        const logs = await prisma.logs.findMany({});
        res.json(logs);
    }
    catch (error) {
        res.send('Invalid Token').redirect('/login');
    }
});
app.use((err, req, res, next) => {
    console.log(err);
    if (err.statusCode)
        return res.status(err.statusCode).send(err.message);
    res.status(500).send('Internal Server Error');
});
async function start() {
    try {
        (await Promise.resolve().then(() => __importStar(require('./env/validate')))).parsedEnv;
        (await Promise.resolve().then(() => __importStar(require('dotenv')))).config();
        await prisma.$connect();
        app.listen(4000, () => {
            console.log('Express server is running on port 4000');
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}
start();
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.statusCode = statusCode;
    }
}
//# sourceMappingURL=index.js.map