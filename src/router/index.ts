import express from 'express';
import usersRouter from './user';
import authRouter from './auth';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;
