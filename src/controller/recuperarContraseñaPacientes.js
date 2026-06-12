import nodemailer from "nodemailer";
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcrypts from "bcryptjs"

import pacientesModel from "../models/pacientesModel.js";
import HTMLRecuperarContraseña from "../utils/recuperarContraseñaHtmlEmail.js";

import { config } from "../../config.js";

const recuperarContraseñaPacientesController = {};

recuperarContraseñaPacientesController.solicitarCodigo = async (req, res) => {
    try {
        const cookieAntigua = req.cookies.tokenRecuperacionCorreo;
        if(cookieAntigua){
            res.clearCookie("tokenRecuperacionCorreo");
        }

        const { email } = req.body;

        const pacienteEncontrado = await pacientesModel.findOne({ email });
        if(!pacienteEncontrado){
            return res.status(400).json({ message: "Correo no encontrado" });
        }

        const codigoAleatorio = crypto.randomBytes(3).toString("hex")

        const tokenCodigo = jsonwebtoken.sign(
            {email, codigoAleatorio, tipoUsuario: "Paciente", verificado: false},
            config.JWT.SECRET,
            {expiresIn: "15m"}
        );

        res.cookie("tokenRecuperacionCorreo", tokenCodigo, {maxAge: 15 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
        });

        const enviarCorreo = {
            from: config.email.user_email,
            to: correo,
            subject: `Código de verificación: ${codigoAleatorio}`,
            body: "Codigo pa",
            html: HTMLRecuperarContraseña(email, codigoAleatorio)
        };

        transporter.sendMail(enviarCorreo, (error, info) =>{
            if(error){
                console.log("Error: " + error)
                return res.status(500).json({message: "Error enviando el correo"})
            }

            return res.status(200).json({message: "Correo enviado"})
        });
    } catch (error) {
        console.log("Error: " + error); 
		return res.status(500).json({ message: "Error interno del servidor" }); 
    }
}

recuperarContraseñaPacientesController.verificarCodigo = async (req, res) => {
    try {
        const { codigoSolicitado } = req.body;

        const tokenRecuperacion = req.cookies.tokenRecuperacionCorreo;

        const decodificar = jsonwebtoken.verify(tokenRecuperacion, config.JWT.SECRET);
        const { email, codigoAleatorio } = decodificar;

        if(codigoAleatorio !== codigoSolicitado){
            return res.status(400).json({ message: "Los codigos no coinciden" });
        }

        const tokenVerificado = jsonwebtoken.sign(
            {email, tipoUsuario: decodificar.tipoUsuario, verificado: true},
            config.JWT.SECRET,
            {expiresIn: "15m"}
        )
        
        res.cookie("tokenRecuperacionCorreo", tokenVerificado, {maxAge: 15 * 60 * 1000});
        return res.status(200).json({ message: "Codigo correcto" })
    } catch (error) {
        console.log("Error: " + error); 
		return res.status(500).json({ message: "Error interno del servidor" }); 
    }
}

export default recuperarContraseñaPacientesController;