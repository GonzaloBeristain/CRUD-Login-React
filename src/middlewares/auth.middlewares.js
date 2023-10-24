import jwt from "jsonwebtoken";
import Usuario from "../models/Usuarios.models.js";
import bcrypt from "bcrypt";

//CREAR TOKEN
export const crearToken = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        let usuario = await Usuario.findOne({
            attributes: ["id", "nombre", "email", "admin", "password"],
            where: {
                email
            },
        });

        if (!usuario) {
            return res.status(400).json({code: 400, message: "Email y/o password incorrecto."});
        };

        let validacionPassword = bcrypt.compareSync(password, usuario.password); 

        if (!validacionPassword) {
            return res.status(400).json({code: 400, message: "Email y/o password incorrecto."});
        } else {
            delete usuario.password;
        }

        let token = jwt.sign(
            {
                data: usuario,
            },
            "secreto",
            { expiresIn: "1h" }
        );

        req.token = token;
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({code: 500, message: "Ha ocurrido un error en el proceso de autenticación."})
    }
};

//VERIFICACIÓN DEL TOKEN
const verificacionToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, "secreto", (error, decoded) => {
            if (error) {
                console.log("error decoded token: ", error);
                reject({code: 401, message:"el token proporcionado no fue emitido por el servidor, fue alterado o se encuentra caducado."});
            }
            resolve(decoded);
        });
    });
};

export const verificarToken = async (req, res, next) => {
    let { authorization } = req.headers;
    let { token } = req.query;
    let dataToken;
    try {
        if (authorization) {
            let token = authorization.split(" ")[1];
            dataToken = await verificacionToken(token);
        } else if (token) {
            dataToken = await verificacionToken(token);
        } else {
            return res.status(400).json({code: 400, message: "Token caducado, inválido, o fue adulterado."})
        }

        req.usuario = dataToken.data;

        next();
    } catch (error) {
        res.status(500).json({code: 500, message: "Hubo un problema en la verificación del token."})
    }
};