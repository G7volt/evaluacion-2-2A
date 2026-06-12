/* 
specialtyName,
description,
isAvailable
*/

import {Schema, model} from "mongoose";

const medicalSpecialtyModel = new Schema({

    specialtyName: {
        type: String
    },
    description: {
        type: String
    },
    isAvailable: {
        type: Boolean
    }

}, {
    timestamps: true,
    new: false
})

export default model("MedicalSpecialty", medicalSpecialtyModel);