import clinicalRecordModel from "../models/clinicalRecordModel.js";


const clinicalRecordController = {};

clinicalRecordController.getAll = async (req, res) => {
    try {

        const get = await clinicalRecordModel.find();
        return res.status(200).json(get);

    } catch (error){
        console.log("error" + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}