import e, { Router } from "express";
import logInPacientesController from "../controller/loginPacientesController.js";

const logInPacientesRoute = e.Router();

logInPacientesRoute.route("/")
.post(logInPacientesController.logIn);

export default logInPacientesRoute;