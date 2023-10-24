import { Router } from "express";
import { findAll, findById, createPais, deletePais, updatePais } from "../controllers/pais.controller.js";
import { uploadImage } from "../middlewares/uploadFile.middlewares.js";

const router = Router();

//RUTA CONSULTAR TODOS LOS PAÍSES
router.get("/", findAll);

//RUTA CONSULTAR PAÍS POR ID
router.get("/:id", findById);

//RUTA CREAR PAÍS
router.post("/", uploadImage, createPais);

//RUTA DELETE PAÍS
router.delete("/:id", deletePais);

//RUTA UPDATE PAÍS
router.put("/:id", uploadImage, updatePais)

export default router;