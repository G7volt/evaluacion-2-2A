import medicalSpecialtyModel from "../models/medicalSpecialtyModel.js";

const medicalSpecialtyController = {};

medicalSpecialtyController.getAll = async (req, res) => {
    try {
        const get = await medicalSpecialtyModel.find();
        if (!get) {
            return res.status(404).json({message: "Especialidades no encontradas"})
        }
        return res.status(200).json(get)
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

medicalSpecialtyController.insertSpecialty = async (req, res) => {
    try {

        const {specialtyName, description} = req.body;

        const newSpecialty = new medicalSpecialtyModel({
            specialtyName,
            description,
            isAvailable: true
        })

        await newSpecialty.save();
        return res.status(200).json({message: "Especialidad creada"})
        
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

medicalSpecialtyController.updateSpecialty = async (req, res) => {
    try {

        let {specialtyName, description} = req.status;

        const specialty = await medicalSpecialtyModel.findById(req.params.id);
        if (!specialty) {
            return res.status(404).json({message: "Especialidad no encontrada"})
        }
        

        const updateSpecialty = await medicalSpecialtyModel.findByIdAndUpdate(req.params.id, {
            specialtyName,
            description,
            isAvailable: true
        }, {new: true})

        await updateSpecialty.save();

        return res.status(200).json({message: "Especialidad actualizada"})
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

medicalSpecialtyController.deleteSpecialty = async (req, res) => {
    try {
        const specialtyFound = medicalSpecialtyModel.findById(req.params.id)

        if (!specialtyFound) {
            return res.status(200).json({message: "Especialidad no encontrada"})
        }

        await medicalSpecialtyModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Especialidad eliminada"})
        
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default medicalSpecialtyController;