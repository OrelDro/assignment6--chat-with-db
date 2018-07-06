import * as express from 'express';
import * as userController from '../controllers';

const router = express.Router();

router.get('/', userController.getUserList);
router.post('/login', userController.Login);
router.post('/addUser',userController.addUser);
router.put('/updateUser',userController.updateUser);
router.delete('/deleteUser',userController.deleteUser);


export default router;