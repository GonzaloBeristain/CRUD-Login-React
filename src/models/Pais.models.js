import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Pais = sequelize.define(
    "Pais",
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        capital: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        continente: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        imagen: {
            type: DataTypes.STRING()
        }
    },
    {
        timestamps: false,
        tableName: "Pais",
    }
);

export default Pais;