import * as express from 'express';
import * as userGroupAssociationController from '../controllers/userGroupAssociationController';

const router = express.Router();

router.get('/getTree',userGroupAssociationController.getTree);
router.put('/addUserToGroup',userGroupAssociationController.addUserToGroup);
router.delete('/delete',userGroupAssociationController.deleteGroupChildrens);
router.delete('/deleteUserFromGroup',userGroupAssociationController.deleteUserFromGroup);
router.get('/getUsersInGroup/:groupId',userGroupAssociationController.getUsersInGroup);

export default router;