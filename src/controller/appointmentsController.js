import medicalAppointmentModel from "../models/medicalAppointmentModel.js";

const medicalAppointmentController = {};

medicalAppointmentController.getAll = async (req, res) => {
    try {
        const get = await medicalAppointmentModel.find()
        if (!get) {
            return res.status(404).json({message: "No se encontraron Citas"});
        }
        return res.status(200).json(get);
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

medicalAppointmentController.insertAppointment = async (req, res) => {
    try {
        
        const {patient_id, specialty_id, appointmentDate, reason, status, observations} = req.body;

        const newAppointment = new medicalAppointmentModel({
            patient_id, 
            specialty_id, 
            appointmentDate, 
            reason, status, 
            observations
        })

        await newAppointment.save();
        return es.status(200).json({message: "Equipamiento creado"})

    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

medicalAppointmentController.updateAppointment = async (req, res) => {
    try {
        
        let {patient_id, specialty_id, appointmentDate, reason, status, observations} = req.body

        const appointment = await medicalAppointmentModel.findById(req.params.id)

        if (!appointment) {
           return res.status(404).json({message: "Cita no encontrada"})
        }

        const updateAppointment = await medicalAppointmentModel.findByIdAndUpdate(req.params.id, {
            patient_id, 
            specialty_id, 
            appointmentDate, 
            reason, status, 
            observations
        }, {new: true});

        await updateAppointment.save();

        return res.status(200).json({message: "Cita actualizada"})

    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

medicalAppointmentController.deleteAppointment = async (req, res) => {
    try {
        const appointmentFound = medicalAppointmentModel.findById(req.params.id)

        if (!appointmentFound) {
            return res.status(200).json({message: "Cita no encontrada"})
        }
    
        await medicalAppointmentModel.findByIdAndDelete(req.params.id)
    
        return res.status(200).json({message: "Cita eliminada"})
            
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default medicalAppointmentController;

