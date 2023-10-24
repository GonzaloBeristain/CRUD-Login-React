import Sequelize from "sequelize";
import dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, "../../.env")});

//Variables de entorno .env
let database = process.env.DB_DATABASE;
let usuario = process.env.DB_USER;
let password = process.env.DB_PASSWORD;
let host = process.env.DB_HOST;
export const PORT = process.env.PORT;

const sequelize = new Sequelize(database, usuario, password, {
    host,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 3000,
    },
});

export default sequelize;