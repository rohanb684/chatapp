import express from 'express';

import { addConversation, getConversation } from '../controller/conversation.controller.js';

const conversationRouter = express.Router();

conversationRouter.post('/add', addConversation);

conversationRouter.post('/', getConversation);

export default conversationRouter;