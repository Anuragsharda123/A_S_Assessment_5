import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db"


class User extends Model {
    public id?: number;
    public firstname!: string;
    public lastname!: string;
    public email!: string;
    public password!: string;
    public is_approved!: number
    public phone!: string;
    public gender!: number;
    public profile_photo!: string;
    public resume!: string; 
    public user_type!: number;
    public is_active!: boolean;
    public AgencyId!: number
}


User.init({ 
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone:{type:DataTypes.STRING, allowNull:false, unique:true},
    gender:{type:DataTypes.INTEGER, allowNull:false},
    profile_photo:{type:DataTypes.STRING, allowNull:false, unique:true},
    is_approved:  { type: DataTypes.INTEGER, allowNull: false, defaultValue:2 },
    resume: {type:DataTypes.STRING, allowNull:true},
    is_active: {type: DataTypes.BOOLEAN, defaultValue:false},
    user_type: { type: DataTypes.INTEGER, allowNull:false, defaultValue:1 }
}, {
    sequelize,
    modelName: 'User'
})

User.hasMany(User, { as: 'JobSeekers', foreignKey: 'AgencyId'});
User.belongsTo(User, { as: 'Agency', foreignKey: 'AgencyId'});

export default User;