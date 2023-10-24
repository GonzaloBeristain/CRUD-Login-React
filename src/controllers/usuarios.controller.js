import Usuario from "../models/Usuarios.models.js";
import bcrypt from "bcrypt";

//BUSCAR A TODOS LOS USUARIOS
export const findAll = async (req, res) => {
    try {
        let usuarios = await Usuario.findAll({
            order: [["id", "ASC"]],
            attributes: ["id", "nombre", "email", "admin"]
        });
        res.json({code: 200, message: "Usuarios encontrados con éxito.", data: usuarios})
    } catch (error) {
        res.status(500).json({code: 500, message: "Error al obtener los datos de los usuarios."})
    }
};

//BUSCAR USUARIOS POR ID
export const findById = async (req, res) => {
    let id = req.usuario.id
try {
    let usuario = await Usuario.findByPk(id, {
        attributes: ["id", "nombre", "email"],
        order: [["id", "ASC"]],
    });
    if (!usuario) {
        return res.status(400).json({ code: 400, message: "No existe un usuario registrado con el id: " + id });
    }
    res.json({code: 200, message: "Usuario encontrado con éxito!!", data: usuario})
} catch (error) {
    res.status(500).json({code: 500, message: "Error al obtener el usuario."})
}
};

//AGREGAR USUARIO
export const addUsuario = async (req, res) => {
    try {
        
        let { nombre, email, password } = req.body;

        const hash = bcrypt.hashSync(password, 10);

        let nuevoUsuario = await Usuario.create({
            nombre,
            email,
            password: hash
        });
        res.status(201).json({code: 201, message: "Usuario creado con éxito", data: nuevoUsuario})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({code: 500, message: "Error al crear un usuario."})
    }
};

//LOGIN USUARIO
export const loginUsuario = async (req, res) => {
    try {
        res.status(200).json({code: 200, message: "Login correcto.", token: req.token, usuario: req.usuario});
    } catch (error) {
        console.log(error)
        res.status(500).json({code: 500, message: "Error al loguear un Usuario."})
    }
};