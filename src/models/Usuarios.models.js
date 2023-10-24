import { BOOLEAN, DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Usuario = sequelize.define(
    "Usuarios",
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                notEmpty: true,
            }
        },
    },
    {
        timestamps: false,
        tableName: "Usuarios",
    }
);

export default Usuario;