import express from 'express';

import { signin, signup, verify, googleSignIn,
         googleVerifier, googleSignUp,forgot, 
         restorPassword, editProfileUser, 
         addLikeOfUser,RemoveLikeOfUser,checkLikeUser
  } from '../controllers/user.js';
  
const router = express.Router();

router
  .route('/signin')
  .post(signin);

router
  .route('/signup')
  .post(signup);

router
  .route('/verify/:email')
  .put(verify);

router
  .route('/googleSignup')
  .post(googleSignUp);

router
  .route('/googleSignIn')
  .post(googleSignIn);

router
  .route('/googleVerifier')
  .post(googleVerifier);

router
  .route('/forgot')
  .post(forgot);

router 
  .route('/restorpassword')
  .put(restorPassword);

router 
  .route('/editProfileUser')
  .put(editProfileUser);

router
  .route('/addLikeOfUser')
  .post(addLikeOfUser);

router
  .route('/RemoveLikeOfUser')
  .post(RemoveLikeOfUser);

router
  .route('/checkLikeUser')
  .post(checkLikeUser)
export default router;