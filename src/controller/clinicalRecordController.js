import clinicalRecordModel from "../models/clinicalRecordModel.js";


const clinicalRecordController = {};

clinicalRecordController.getAll = async (req, res) => {
    try {

        const get = await clinicalRecordModel.find();

        if (!get) {
            return res.status(404).json({message: "No se encontraron registros"});
        }

        return res.status(200).json(get);

    } catch (error){
        console.log("error" + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

clinicalRecordController.insert = async (req, res) => {

    try{
        const {patient_id, diagnosis, medications, medicalNotes} = req.body;
        
        const newRecord = new clinicalRecordModel({
            patient_id,
            diagnosis,
            medications,
            medicalNotes        
        })

        await newRecord.save();
        return res.status(200).json({message: "Registro Creado"})
    }catch(error){
        console.log("error: " + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

clinicalRecordController.update = async (req, res) => {
    try{

        let {patient_id, diagnosis, medications, medicalNotes} = req.body;
        const records = await clinicalRecordModel.findById(req.params.id);
        if(!records){
            return res.status(404).json({message: "Registro no encontrado"});
        }

        const updateRecord = await clinicalRecordModel.findByIdAndUpdate(req.params.id, {
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        }, {new: true});

        await updateRecord.save();

        return res.status(200).json({message:"Registro actualizado"})

    } catch(error){
        console.log("error" + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

clinicalRecordController.delete = async (req, res) => {
    try {

        const recordFound = clinicalRecordModel.findById(req.params.id)
        if (!recordFound) {
            return res.status(404).json({message: "Registro no encontrado"})
        }

        await clinicalRecordModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Registro Eliminado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default medicalEquipmentController;