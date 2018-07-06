import * as express from 'express';
import * as conversationController from '../controllers/conversationController';

const router = express.Router();

router.post('/',conversationController.getConversation);
router.put('/saveMsg',conversationController.setMessages);

export default router;