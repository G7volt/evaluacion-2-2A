import medicalEquipmentModel from "../models/medicalEquipmentModel.js";

import {v2 as cloudinary} from "cloudinary";

const medicalEquipmentController = {};

medicalEquipmentController.getAll = async (req, res) => {
    try {

        const get = await medicalEquipmentModel.find();
        return res.status(200).json(get);

    } catch (error){
        console.log("error" + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

medicalEquipmentController.insertEquipment = async (req, res) => {

    try{
        const {equipmentName, description, brand, model, purchaseDate, maintenanceDate, condition, status} = req.body;
        
        const newEquipment = new medicalEquipmentModel({
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            imagen: req.file.path,
            public_id: req.file.filename,
            status,
            isAvailable: true
        })

        await newEquipment.save();
        return res.status(200).json({message: "Equipamiento Creado"})
    }catch(error){
        console.log("error: " + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

medicalEquipmentController.updateEquipment = async (req, res) => {
    try{

        let {equipmentName, description, brand, model, purchaseDate, maintenanceDate, condition, status} = req.body;
        const equipment = await medicalEquipmentModel.findById(req.params.id);
        if(!equipment){
            return res.status(404).json({message: "Equipamiento no encontrado"});
        }

        const equipmentModified = {equipmentName, description, brand, model, purchaseDate, maintenanceDate, condition, status};

        if(req.file){
            await cloudinary.uploader.destroy(producto.public_id);
            productoModified.image = req.file.path;
            productoModified.public_id = req.file.filename;
        }

        const updateEquipment = await productosModel.findByIdAndUpdate(req.params.id, {
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            imagen: req.file.path,
            public_id: req.file.filename,
            status,
            isAvailable: true
        }, {new: true});

        await updateEquipment.save();

        return res.status(200).json({message:"Equipamiento actualizado"})

    } catch(error){
        console.log("error" + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

medicalEquipmentController.deleteEquipment = async (req, res) => {
    try {
        //Buscamos el repartidos a eliminar
        const equipmentFound = medicalEquipmentModel.findById(req.params.insertEquipment)

        //eliminamos la imagen de cloudinary
        await cloudinary.uploader.destroy(equipmentFound.public_id)

        //eliminamos el repartidor de la base de datos
        await medicalEquipmentModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Equipamiento Eliminado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default medicalEquipmentController;