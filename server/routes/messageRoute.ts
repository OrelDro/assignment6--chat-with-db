import * as express from 'express';
import * as messageController from '../controllers/messageController';

const router = express.Router();

router.post('/',messageController.getMessages);

export default router;