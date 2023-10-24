import { Router } from "express";
import { findAll, addUsuario, loginUsuario, findById } from "../controllers/usuarios.controller.js";
import { crearToken, verificarToken } from "../middlewares/auth.middlewares.js";
import { verificarAdmin } from "../middlewares/admin.middlewares.js";

const router = Router();

//RUTA CONSULTAR TODOS LOS USUARIOS
router.get("/", verificarToken, verificarAdmin, findAll);

//RUTA USUARIO POR ID
router.get("/perfil", verificarToken, findById);

//RUTA CREAR USUARIOS
router.post("/", addUsuario);

//RUTA LOGIN
router.post("/login", crearToken, loginUsuario);

export default router;