"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const userModel_1 = __importDefault(require("./userModel"));
class Hobby extends sequelize_1.Model {
}
Hobby.init({
    hobby: { type: sequelize_1.DataTypes.STRING, allowNull: false }
}, {
    sequelize: db_1.default,
    modelName: 'Hobby'
});
userModel_1.default.hasMany(Hobby, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Hobby.belongsTo(userModel_1.default);
exports.default = Hobby;
