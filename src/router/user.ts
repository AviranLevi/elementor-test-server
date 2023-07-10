import express, { IRouter } from 'express';
import * as controllers from '../controllers';
import * as middlewares from '../middlewares';

const router: IRouter = express.Router();

router.post('/login', controllers.loginUser);
router.post('/', middlewares.userAlreadyExistsValidator, controllers.createUser);
router.patch('/');
router.get('/auth', middlewares.tokenValidator, controllers.authenticateUser);
router.get('/logout', middlewares.tokenValidator, controllers.userLogout);
router.get('/user', middlewares.tokenValidator, controllers.getUserById);
router.get('/', middlewares.tokenValidator, controllers.getUsersList);

export default router;
