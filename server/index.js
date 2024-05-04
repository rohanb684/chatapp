import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './config/database.js';
import userRouter from './src/user/routes/user.routes.js';
import conversationRouter from './src/conversation/routes/conversation.routes.js';
import messageRouter from './src/message/routes/message.routes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', userRouter);
app.use('/conversation',conversationRouter);
app.use('/message', messageRouter);


app.listen(8000, ()=>{
    Connection();
    console.log("Server successfully working");
})