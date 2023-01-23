import { Schema, model } from "mongoose";

export const Person = model('Person', new Schema({
    imageUrl: {
      type: String,
      required: false,
    },
    name: { 
      type: String, 
      required: true
    },
    phone: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String,
      required: true 
    },
    profession: { 
      type: Schema.Types.ObjectId, 
      ref: 'Profession',
      autopopulate: true,
    },
    createdAt:{
      type: Date,
      default: Date.now
    },
}));
