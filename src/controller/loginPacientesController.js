import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import clientesModel from "../models/clientesModel.js";

import { config } from "../../config.js";

const logInClientesController = {}

logInClientesController.logIn = async (req, res) => {
    try {
        
        const { correo, contraseña } = req.body;

        const clienteEncontrado = await clientesModel.findOne({correo});
        if (!clienteEncontrado) {
            return res.status(404).json({message: "Cliente no Encontrado"});
        }

        if (clienteEncontrado.timeOut & clienteEncontrado.timeOut > Date.now()) {
            const time = clienteEncontrado.timeOut - Date.now();
            return res.status(403).json({message: "Cuenta bloqueada temporalmente", time: time});
        }

        const coincidencia = await bcrypt.compare(contraseña, clienteEncontrado.contraseña);

        if (!coincidencia) {
            clienteEncontrado.loginAttempts = (clienteEncontrado || 0) + 1;

            if (clienteEncontrado.loginAttempts >= 5) {
                clienteEncontrado.timeOut = Date.now() + 5 * 60 * 1000;
                clienteEncontrado.loginAttempts = 0

                await clienteEncontrado.save();
                return res.status(403).json({message: "Demasiados intentos"});
            }

            await clienteEncontrado.save();
            return res.status(403).json({message: "Contraseña incorrecta"})
        }

        clienteEncontrado.loginAttempts = 0;
        clienteEncontrado.timeOut = null;
        await clienteEncontrado.save();

        const tokenAuth = jsonwebtoken.sign(
            {id: clienteEncontrado.id, tipoUsuario: "Cliente"},
            config.jwt.secret,
            {expiresIn: "7d"}
        );

        res.cookie("cookieAuthCliente", tokenAuth);

        return res.status(200).json({message: "Inicio de sesion exitoso"})
        
    } catch (error) {
        console.log("Error: " + error); 
		return res.status(500).json({ message: "Error interno del servidor" }); 
    }
}

export default logInClientesController;