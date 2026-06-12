import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"

import pacientesModel from "../models/pacientesModel.js";

const pacientesController = {};

//getAll
pacientesController.getTodos = async (req, res) => {
    try {

        const getPacientes = await pacientesModel.find();
        if (!getPacientes) {
            return res.status(404).json({message: "No hay pacientes Registrados"})
        }
        return res.status(200).json(getPacientes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

pacientesController.deletePaciente = async (req, res) => {
    try {
        
        const deletePaciente = await pacientesModel.findByIdAndDelete(req.params.id)
        if (!deletePaciente) {
            return res.status(404).json({message: "paciente no encontrado"})
        }

        return res.status(200).json({message: "Paciente eliminado"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

pacientesController.updatePaciente = async (req, res) => {
    try {

        let{
            nombre,
            isActive
        }= req.body;
        nombre = nombre?.trim()

        const paciente = await pacientesModel.findByIdAndUpdate(req.params.id);

        if (!paciente) {
            return res.status(404).json({message: "Paciente no encontrado"})
        }

        paciente.nombre = nombre ?? paciente.nombre
        paciente.isActive = isActive ?? paciente.isActive

        await paciente.save();

        return res.status(200).json({message: "paciente actualizado"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default pacientesController;