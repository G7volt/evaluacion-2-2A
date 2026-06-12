import express from "express";

//Rutas
//import nombreRuta from "/carpeta/rutaArchivo"
import pacientesRoute from "./src/routes/pacientesRoutes.js"
import registerPacientesRoute from "./src/routes/registerPacientesRoute.js"
import recuperarContraseñaRoute from "./src/controller/recuperarContraseñaPacientes.js"
import logInPacienteRoute from "./src/routes/loginPacientesRoute.js"
import logOutRoute from "./src/routes/logOut.js"

import cookieParser from "cookie-parser";
import cors from "cors"
import { config } from "./config.js";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

//endpoints
//app.use("/api/ruta", nombreRuta)
app.use("/api/pacientes", pacientesRoute)
app.use("/api/registerPaciente", registerPacientesRoute)
app.use("/api/recuperarContraseña", recuperarContraseñaRoute)
app.use("/api/logInPaciente", logInPacienteRoute)
app.use("/api/logOut", logOutRoute)
//endpoints

export default app;

