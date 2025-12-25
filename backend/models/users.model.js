import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({

    _id: Number,
    name: {
        type: String,
        trim: true,
        required: ["name is required"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: ["email is required"]
    },
    number: {
        type: String,
        unique: true,
        maxlength: 10,
        minlength: 10,
        required: ["number is required"]
    },
    password: {
        type: String,
        trim: true,
        required: ["password is required"]
    },
    role: String,
    status: Number,
    info: String,
});

userSchema.plugin(uniqueValidator);

const userSchemaModel = mongoose.model('user_collection', userSchema);

export default userSchemaModel;