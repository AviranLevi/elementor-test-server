import express from 'express';
import usersRouter from './user';

const router = express.Router();

router.use('/users', usersRouter);

export default router;
