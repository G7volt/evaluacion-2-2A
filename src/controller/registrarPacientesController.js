import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"

import pacientesModel from "../models/pacientesModel.js";
import config from "../../config.js";

const  registrarPacientesController = {};

registrarPacientesController.registrar = async (req, res) => {
    try {

        let{
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            bloodType,
            phoneEmergencyContacts,
            profilePhoto,
            public_id,
            isActive,
            isVerified,
            loginAttempts,
            timeOut

        } = req.body

        name = name?.trim();
        lastName = lastName?.trim();
        email = email?.trim();
        password = password?.trim();

        confirmarContraseña = confirmarContraseña?.trim

        if (!name || !lastName || email|| !password ) {
            return res.status(400).json({message: "campos incompletos"})
        }

        const pacienteEncontrado = await pacientesModel.findOne({email});

        if (!pacienteEncontrado) {
             return res.status(400).json({message: "Paciente No Encontrado"})
        }

        const contraseñaHash = await bcrypt.hash(password, 10);

        const nuevoPaciente = pacientesModel({
            name,
            lasName, 
            email,
            password,
            birthDate,
            phone, 
            address,
            bloodType,
            phoneEmergencyContacts,
            profilePhoto: req.file.path,
            public_id: req.file.filename,
            isActive: true,
            isVerified: false
        });

        await nuevoPaciente.save()

        const codigoAleatorio = crypto.randomBytes(3).toString("hex")

        const tokenCodigo = jsonwebtoken.sign(
            {email, codigoAleatorio},
            config.jwt.SECRET,
            {expiresIn: "15 m"}
        )
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}