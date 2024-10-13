import { Sequelize } from "sequelize";

const DB:any = process.env.DB_NAME || "new_assessment_5"
const USER:any = process.env.DB_USER || "root"
const PASS:any = process.env.DB_PASSWORD || "123456"
const HOST:any = process.env.DB_HOST || "localhost"
const DIA:any = process.env.DB_DIALECT || 'mysql'


const sequelize = new Sequelize(DB, USER, PASS, {
  host: HOST,
  dialect: DIA,
});

export default sequelize;