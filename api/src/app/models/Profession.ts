import { Schema, model } from "mongoose";

export const Profession = model('Profession', new Schema({
    name: { 
        type: String, 
        required: true 
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
}));