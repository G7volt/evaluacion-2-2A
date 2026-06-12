import express from "express";

//Rutas
//import nombreRuta from "/carpeta/rutaArchivo"

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
//endpoints

export default app;

