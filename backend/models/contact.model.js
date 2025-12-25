import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const contactSchema = mongoose.Schema({

    _id: Number,
    name: {
        type: String,
        trim: true,
        required: ["name is required"]
    },
    email: {
        type: String,

        trim: true,
        required: ["email is required"]
    },
    subject: {
        type: String,
        trim: true,     
        required: ["number is required"]
    },
    message: {
        type: String,
        required: ["message is required"],
        trim: true
    },
    info: String
});

contactSchema.plugin(uniqueValidator);

const contactSchemaModel = mongoose.model('contact_collection', contactSchema);

export default contactSchemaModel;