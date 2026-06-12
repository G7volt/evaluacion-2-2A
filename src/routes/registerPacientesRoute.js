import express, { Router } from "express";
import registrarPacientesController from "../controller/registrarPacientesController.js"

const registrarPacientesRoute = express.Router();

registrarPacientesRoute.route("/")
.post(registrarPacientesController.registrar)
.post(registrarPacientesController.verificarCodigo)

export default registrarPacientesRoute;


