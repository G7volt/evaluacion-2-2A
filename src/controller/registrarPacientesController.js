import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"

import pacientesModel from "../models/pacientesModel.js";
import config from "../../config.js";
import { text } from "stream/consumers";
import { error, info } from "console";

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
        );

        res.cookie("tokenRegistroCookie", tokenCodigo, {maxAge: 15 * 60 * 1000});
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        });

        const enviarCorreo = {
            from: config.email.user_email,
            to: email,
            subject: "codigo de verificacion",
            text: `Este es tu codigio para verificar tu cuenta: ${codigoAleatorio}, Usalo antes de que pasen 15 min`
        }
        
        transporter.sendMail(enviarCorreo, (error, info) => {
            if (error) {
                console.log("error " + error)
                return res.status(500).json({message: "Error enviando el correo"})
            }
        })
        return res.status(200).json({message: "correo enviado"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

registrarPacientesController.verificarCodigo = async (req, res) => {
    
}