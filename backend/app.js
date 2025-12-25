import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import './models/db.js';

const app = express();

// Routers
import ContactRouter from './routes/contact.router.js';
import UsersRouter from './routes/users.router.js';
import AiAgentRouter from './routes/aiagent.router.js';
import EmailRouter from './routes/email.router.js';


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// CORS config
app.use(cors());

// Routes
app.use("/contact", ContactRouter);
app.use("/users", UsersRouter);
app.use("/aiAgentProposal", AiAgentRouter);
app.use("/email", EmailRouter);


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});