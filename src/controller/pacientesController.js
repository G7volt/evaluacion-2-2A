import {v2 as Cloudinary} from "cloudinary"

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
            name,
            lastName,
            email,
            password,
            phone,
            address,
            phoneEmergencyContacts,
        }= req.body;
        name = name?.trim()

        const paciente = await pacientesModel.findByIdAndUpdate(req.params.id);

        //profilePhoto: req.file.path,

        if (!paciente) {
            return res.status(404).json({message: "Paciente no encontrado"})
        }

        if (req.file) {
            await Cloudinary.uploader.destroy(paciente.public_id);
            productoModified.imagen = req.file.path;
            productoModified.public_id = req.file.filename;
        }

        const updatePaciente = await pacientesModel.findByIdAndUpdate(req.params.id, {
            name,
            lastName,
            email,
            password,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto: req.file.path,
            public_id: req.file.filename
        }, {new: true});

        await updatePaciente.save();

        return res.status(200).json({message: "paciente actualizado"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default pacientesController;