import express from 'express';
import { addMessage,getMessage, uploadFile, getFile } from '../controller/message.controller.js';
import upload from '../../../utils/upload.js';

const messageRouter = express.Router();

messageRouter.post('/add', addMessage);

messageRouter.get('/:id', getMessage);

messageRouter.post('/upload',upload.single('file'), uploadFile);

messageRouter.get('/file/:filename', getFile);

export default messageRouter;