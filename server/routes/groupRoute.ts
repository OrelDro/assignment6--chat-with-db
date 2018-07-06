import * as express from 'express';
import * as groupController from '../controllers/groupController';

const router = express.Router();

router.post('/addGroup',groupController.addGroup);
router.get('/',groupController.getGroupList);
router.delete('/deleteGroup',groupController.deleteGroup);

export default router;