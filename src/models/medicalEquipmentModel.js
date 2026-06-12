import { Schema, model } from "mongoose";

const medicalEquipmentModel = new Schema({
   
    equipmentName: {
        type: String
    },
    description: {
        type: String
    },
    brand: {
        type: String

    },
    model: {
        type: String

    },
    purchaseDate: {
        type: String

    },
    maintenanceDate: {
        type: String

    },
    condition: {
        type: String
    },
    image: {
        type: String
    },
    public_id: {
        type: String
    },
    status: {
        type: String
    },
    isAvailable: {
        type: Boolean
    }
       
}, {
    timestamps: true,
    new: false
});

export default model("MedicalEquipment", medicalEquipmentModel);