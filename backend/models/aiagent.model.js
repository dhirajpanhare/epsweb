import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const aiagentSchema = mongoose.Schema({

    _id: Number,
    companyName: {
        type: String,
        trim: true,
        
    },
    email: {
        type: String,

        trim: true,
     
    },
    industry: {
        type: String,
        trim: true,     

    },
    primaryUseCase: {
        type: String,
      
        trim: true
    },
    expectedUsers: {
        type: String,
       
        trim: true
    },
    preferredTimeline: {
        type: String,
       
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    features:{
        type:Array
    },
    info: String
});

aiagentSchema.plugin(uniqueValidator);

const aiagentSchemaModel = mongoose.model('aiagent_praposal_collection', aiagentSchema);

export default aiagentSchemaModel;