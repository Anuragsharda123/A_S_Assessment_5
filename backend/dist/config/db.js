"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DB = process.env.DB_NAME || "new_assessment_5";
const USER = process.env.DB_USER || "root";
const PASS = process.env.DB_PASSWORD || "123456";
const HOST = process.env.DB_HOST || "localhost";
const DIA = process.env.DB_DIALECT || 'mysql';
const sequelize = new sequelize_1.Sequelize(DB, USER, PASS, {
    host: HOST,
    dialect: DIA,
});
exports.default = sequelize;
