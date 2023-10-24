import express from "express";
import cors from "cors";
import morgan from "morgan";
import upload from "express-fileupload";

//ROUTES
import paisRoutes from "./src/routes/pais.routes.js";
import usuariosRoutes from "./src/routes/usuarios.routes.js";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

//CARPETAS PÚBLICAS
app.use("/public", express.static(path.resolve(__dirname, "./public")));

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan("tiny"));
app.use(upload());

//ENDPOINTS
app.use("/api/v1/pais", paisRoutes);
app.use("/api/v1/usuarios", usuariosRoutes);

export default app;