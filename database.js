import mongoose from "mongoose";
import { config } from "./config.js";

mongoose.connect(config.db.URL);

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("conexion a la base de datos exitosa")
})

connection.on("disconnected", () => {
    console.log("Desconexion de la base de datos")
})

connection.on("error", (err) => {
    console.log("Error en el servidor", err)
})