import Pais from "../models/Pais.models.js";
import fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//ALL PAISES
export const findAll = async (req, res) => {
    try {
        let paises = await Pais.findAll({
            order: [["id", "ASC"]],
            attributes: ["id", "nombre", "capital", "continente", "imagen"]
        });

        res.json({code: 200, message: "Países encontrados con éxito.", data: paises})
    } catch (error) {
        res.status(500).json({code: 500, message: "Error al obtener los datos de los países."})
    }
};

//BUSCAR PAÍS POR ID
export const findById = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({code: 400, message: "El ID debe ser un número"})
        };

        let pais = await Pais.findByPk(id);

        if (!pais) {
            return res.status(404).json({code: 404, message: "País no encontrado."});
        };

        res.json({code: 200, message: "País encontrado con éxito.", data: pais});
    } catch (error) {
        res.status(500).json({code: 500, message: "Error al obtener los datos del país."});
    }
};

//CREATE PAIS
export const createPais = async (req, res) => {
    try {
        let { nombre, capital, continente } = req.body;

        if (!nombre || !capital || !continente) {
            return res.status(400).json({ code: 400, message: "Faltan datos para crear el país." });
        };

        let pais = await Pais.create({
            nombre,
            capital,
            continente,
            imagen: req.imagen
        });

        res.json({ code: 201, message: "País creado con éxito.", data: pais });
    } catch (error) {
        fs.unlinkSync(req.pathDestinoImagen, (error) => {
            if(error){
                console.log("No se pudo eliminar la imagen")
            } else {
                console.log("Imagen eliminada correctamente")
            }
        })
        res.status(500).json({ code: 500, message: "Error al crear el país." });
    }
};

//UPDATE PAIS
export const updatePais = async (req, res) => {
    try {
        let { id } = req.params;
        let { nombre, capital, continente } = req.body;
        let modificarPais;

        if (isNaN(id)) {
            return res.status(400).json({code: 400, message: "El ID debe ser un número"})
        };

        if (!id || !nombre || !capital || !continente) {
            return res.status(400).json({ code: 400, message: "Faltan datos para actualizar el país." });
        };

        let pais = await Pais.findByPk(id);

        if (!pais) {
            return res.status(404).json({ code: 404, message: "País no encontrado." });
        };

        if(req.imagen){
            modificarPais = {
                nombre: nombre,
                capital: capital,
                continente: continente,
                imagen: req.imagen
            } 
            if(pais.imagen) {
                fs.unlinkSync(path.resolve(__dirname, `../../public/upload/${pais.imagen}`), (error) => {
                if(error){
                    console.log("No se pudo eliminar la imagen")
                } else {
                    console.log("Imagen eliminada correctamente")
                }
            })
            }
        } else {
            modificarPais = {
                nombre: nombre,
                tipo: tipo,
                precio: precio,
                imagen: pais.imagen
            }
        };

        await Pais.update(modificarPais,{
            where: {
                id: id
            }
        });

        res.json({ code: 200, message: "País actualizado con éxito.", data: pais });
    } catch (error) {
        res.status(500).json({ code: 500, message: "Error al actualizar el país." });
    }
};

//DELETE PAIS
export const deletePais = async (req, res) => {
    try {
        let { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({code: 400, message: "El ID debe ser un número"})
        };

        if (!id) {
            return res.status(400).json({ code: 400, message: "Faltan datos para eliminar el país." });
        };

        let pais = await Pais.findByPk(id);

        if (!pais) {
            return res.status(404).json({ code: 404, message: "País no encontrado." });
        };

        await pais.destroy();

        if(pais.imagen){
            fs.unlinkSync(path.resolve(__dirname, `../../public/upload/${pais.imagen}`), (error) => {
            if(error){
                console.log("No se pudo eliminar la imagen")
            } else {
                console.log("Imagen eliminada correctamente")
            }
            });
        };

        res.json({ code: 200, message: "País eliminado con éxito." });
    } catch (error) {
        res.status(500).json({ code: 500, message: "Error al eliminar el país." });
    }
};