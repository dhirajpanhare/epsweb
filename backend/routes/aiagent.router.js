import express from "express";
import { save, fetch, deleteMessage, replyMessage } from "../controllers/aiagent.controller.js";

const router = express.Router();

router.post("/save", save);
router.get("/fetch", fetch);
router.delete("/delete/:id", deleteMessage);

// 💡 NEW ROUTE FOR REPLYING TO MESSAGE
router.post("/reply", replyMessage);

export default router;
