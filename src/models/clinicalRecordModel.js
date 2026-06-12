import mongoose from "mongoose";
import { Schema, model } from "mongoose";

/*
patient_id,
diagnosis,
medications,
medicalNotes
*/

const clinicalRecordModel = new Schema({
    patient_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Pacientes"
    },
    diagnosis: {
        type: String
    },
    medications: [
        {
            medicineName: {
                type: String
            }
        }
    ],
    medicalNotes: {
        type: String
    }
}, {
    timestamps: true,
    new: false
});

export default model("ClinicalRecord", clinicalRecordModel)