import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./userModel";
import { Hooks } from "sequelize/types/hooks";

class Hobby extends Model {
    public id?: number;
    public hobby!:string;
}

Hobby.init({
    hobby:{type:DataTypes.STRING, allowNull:false}
}, {
    sequelize,
    modelName: 'Hobby'
})

User.hasMany(Hobby, {onDelete:'CASCADE', onUpdate:'CASCADE'});
Hobby.belongsTo(User);



export default Hobby;