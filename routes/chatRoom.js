import express from 'express';
import {BanneUser,createChatRoom,addConnectedUser,GetAllConnectedUsers} from '../controllers/chatRoom.js'

  
const router = express.Router();

router
  .route('/BanneUser')
  .put(BanneUser);
router
  .route('/createChatRoom')
  .post(createChatRoom);
router 
  .route('/addConnectedUser')
  .put(addConnectedUser);
router 
  .route('/GetAllConnectedUsers')
  .post(GetAllConnectedUsers);
  
export default router;