import { Schema, model } from "mongoose";

const medicalEquipmentModel = new Schema({
   
       
}, {
    timestamps: true,
    new: false
});

export default model("MedicalEquipment", medicalEquipmentModel);