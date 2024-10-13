"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class User extends sequelize_1.Model {
}
User.init({
    firstname: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    lastname: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    phone: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    gender: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    profile_photo: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    resume: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    is_active: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    user_type: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
}, {
    sequelize: db_1.default,
    modelName: 'User'
});
User.hasMany(User, { as: 'JobSeekers', foreignKey: 'AgencyId' });
User.belongsTo(User, { as: 'Agency', foreignKey: 'AgencyId' });
exports.default = User;
