import {Schema, model} from "mongoose";
import mongoose from "mongoose";

const medicalAppointmentModel = new Schema({
    patient_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Pacientes"
    },
    specialty_id: {
        type: mongoose.Schema.ObjectId,
        ref: "MedicalSpecialty"
    },
    appointmentDate: {
        type: Date
    },
    reason: {
        type: String
    },
    status: {
        type: String
    },
    observations: {
        type: String
    }
}, {
    timestamps: true,
    new: false
})

export default model("MedicalAppointment", medicalAppointmentModel);