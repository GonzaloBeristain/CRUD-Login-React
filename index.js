import app from "./app.js";
import db from "./src/config/db.config.js";
import { PORT } from "./src/config/db.config.js"

//MODELS
import "./src/models/Pais.models.js";
import "./src/models/Usuarios.models.js";

const main = async () => {
    try {
        await db.authenticate();
        await db.sync({ force: false, alter: true });
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto: ${PORT}`);
        })
    } catch (error) {
        console.log("Ha ocurrido un error", error);
    }
};

main();