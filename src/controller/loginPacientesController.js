import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import pacientesModel from "../models/pacientesModel.js";

import { config } from "../../config.js";

const logInPacientesController = {}

logInPacientesController.logIn = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        const pacienteEncontrado = await pacientesModel.findOne({email});
        if (!pacienteEncontrado) {
            return res.status(404).json({message: "Cliente no Encontrado"});
        }

        if (pacienteEncontrado.timeOut & pacienteEncontrado.timeOut > Date.now()) {
            const time = pacienteEncontrado.timeOut - Date.now();
            return res.status(403).json({message: "Cuenta bloqueada temporalmente", time: time});
        }

        const coincidencia = await bcrypt.compare(password, pacienteEncontrado.contraseña);

        if (!coincidencia) {
            pacienteEncontrado.loginAttempts = (pacienteEncontrado || 0) + 1;

            if (pacienteEncontrado.loginAttempts >= 5) {
                pacienteEncontrado.timeOut = Date.now() + 5 * 60 * 1000;
                pacienteEncontrado.loginAttempts = 0

                await pacienteEncontrado.save();
                return res.status(403).json({message: "Demasiados intentos"});
            }

            await pacienteEncontrado.save();
            return res.status(403).json({message: "Contraseña incorrecta"})
        }

        pacienteEncontrado.loginAttempts = 0;
        pacienteEncontrado.timeOut = null;
        await pacienteEncontrado.save();

        const tokenAuth = jsonwebtoken.sign(
            {id: pacienteEncontrado.id, tipoUsuario: "Paciente"},
            config.JWT.SECRET,
            {expiresIn: "7d"}
        );

        res.cookie("cookieAuthPaciente", tokenAuth);

        return res.status(200).json({message: "Inicio de sesion exitoso"})
        
    } catch (error) {
        console.log("Error: " + error); 
		return res.status(500).json({ message: "Error interno del servidor" }); 
    }
}

export default logInPacientesController;