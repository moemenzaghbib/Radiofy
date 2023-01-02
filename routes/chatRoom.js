import express from 'express';
import {CheckBannedUser,BanneUser,createChatRoom,addConnectedUser,GetAllConnectedUsers,GetAllChatRooms,removeConnectedUser,UnBanneUser} from '../controllers/chatRoom.js'

  
const router = express.Router();
router
  .route('/GetAllChatRooms')
  .get(GetAllChatRooms);
router
  .route('/BanneUser')
  .put(BanneUser);
  router
  .route('/UnBanneUser')
  .put(UnBanneUser);

  router
  .route('/CheckBannedUser')
  .post(CheckBannedUser);


  
router
  .route('/createChatRoom')
  .post(createChatRoom);
router 
  .route('/addConnectedUser')
  .put(addConnectedUser);
router 
  .route('/GetAllConnectedUsers')
  .post(GetAllConnectedUsers);
router
  .route('/removeConnectedUser')
  .put(removeConnectedUser);
export default router;