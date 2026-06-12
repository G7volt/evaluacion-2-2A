/*
name
lastName
email
password
birthDate
phone
address
bloodType
phoneEmergencyContacts: [
    {
        phone, 
        nameEmergencyContact
    }
]
profilePhoto
public_id
isVerified
loginAttempts
timeOut
*/

import mongoose from "mongoose";
import {Schema, model} from "mongoose";

const pacientesModel = new Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    birthDate: {
        type: Date
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    bloodType: {
        type: String
    },
    phoneEmergencyContacts: [
        {
            phone: {
                type: String
            },
            nameEmergencyContact: {
                type: String
            }
        }
    ],
    profilePhoto: {
        type: String
    },
    public_id: {
        type: String
    },
    isActive: {
        type: Boolean
    },
    isVerified: {
        type: Boolean
    },
    loginAttempts: {
        type: Number
    },
    timeOut: {
        type: Date
    }
}, {
    timestamps: true,
    new: false
});

export default model("Pacientes", pacientesModel);