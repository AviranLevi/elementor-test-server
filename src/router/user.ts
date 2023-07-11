import express, { IRouter } from 'express';
import * as controllers from '../controllers';
import * as middlewares from '../middlewares';

const router: IRouter = express.Router();

router.post('/', middlewares.userAlreadyExistsValidator, controllers.createUser);
router.get('/', middlewares.tokenValidator, controllers.getUsersList);

export default router;
