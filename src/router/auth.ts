import express, { IRouter } from 'express';
import * as controllers from '../controllers';
import * as middlewares from '../middlewares';

const router: IRouter = express.Router();

router.post('/login', controllers.loginUser);
router.get('/logout', middlewares.tokenValidator, controllers.userLogout);
router.get('/', middlewares.tokenValidator, controllers.authenticateUser);

export default router;
