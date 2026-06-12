import express from "express";
import pacientesController from "../controller/pacientesController.js"

const pacientesRoute = express.Router();

pacientesRoute.route("/")
.get(pacientesController.getTodos)

pacientesRoute.route("/:id")
.put(pacientesController.updatePaciente)
.delete(pacientesController.deletePaciente)

export default pacientesRoute;