"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "Anurag123#@!";
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Bearer token
    console.log(token);
    if (!token)
        return res.sendStatus(403);
    jsonwebtoken_1.default.verify(token, secret || '', (err, user) => {
        console.log("user", user);
        if (err) {
            console.log("Jwt ki taraf aaja bhai....");
            return res.status(403).json({ message: 'Invalid token.' });
        }
        req.user = user;
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
