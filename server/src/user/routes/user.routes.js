import express from 'express';

import { addUser } from '../controller/user.controller.js';
import { getUsers } from '../controller/user.controller.js';

const userRouter = express.Router();


userRouter.post('/add', addUser);
userRouter.get('/users', getUsers);

export default userRouter;