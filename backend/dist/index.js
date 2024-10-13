"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./route/userRouter"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use('/resume', express_1.default.static('resume'));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/', userRouter_1.default);
db_1.default.sync({ force: false }).then(() => {
    console.log("Database is Connected........");
    app.listen(PORT, () => {
        console.log(`Server is connected with port ${PORT}`);
    });
}).catch((err) => {
    console.log("Connection Failed: ", err);
});
