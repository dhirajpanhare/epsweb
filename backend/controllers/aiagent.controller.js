import '../models/db.js';
import aiagentSchemaModel from '../models/aiagent.model.js';
import dotenv from "dotenv";
import nodemailer from 'nodemailer';

dotenv.config();
  

export const  save = async(req,res) => {
    const aiagents = await aiagentSchemaModel.find();
    const l =aiagents.length;
    const _id=l==0?1:aiagents[l-1]._id+1;

    const aiagentDetails= {...req.body,"_id":_id,"info":Date()}

    try{
        await aiagentSchemaModel.create(aiagentDetails);
        res.status(201).json({"status":true});
    }
catch(error){
    res.status(500).json({"status":false})
}
}
  


export const fetch=async(req,res)=>{
   var aiagent_praposalList=await aiagentSchemaModel.find(req.query);
 
   if(aiagent_praposalList.length!=0)
     res.status(200).json(aiagent_praposalList);
   else
     res.status(404).json({"status":"Resource not found"});
  };
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
console.log(id)
    const deleted = await aiagentSchemaModel.deleteOne({ _id: id });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ status: false, message: "Not found" });
    }

    res.status(200).json({ status: true, message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};
   

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

// ----------------------
// SEND REPLY EMAIL
// ----------------------
export const replyMessage = async (req, res) => {
  try {
    const { email, subject, body } = req.body;

    if (!email || !subject || !body) {
      return res.status(400).json({ status: false, message: "Missing fields" });
    }

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: subject,
      text: body
    });

    res.status(200).json({ status: true, message: "Reply sent" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Email failed" });
  }
};
