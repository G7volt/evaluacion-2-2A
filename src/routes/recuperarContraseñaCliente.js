import e, { Router } from "express";
import recuperarContraseñaPaciente from "../controller/recuperarContraseñaPacientes.js";

const recuperarContraseñaPacienteRoute = e.Router();

recuperarContraseñaPacienteRoute.route("/")
.post(recuperarContraseñaPaciente.solicitarCodigo)
.post(recuperarContraseñaPaciente.verificarCodigo)

export default recuperarContraseñaPacienteRoute;