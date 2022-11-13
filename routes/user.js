import express from 'express';

import { signin, signup, verify, googleSignIn, googleVerifier, googleSignUp,forgot, restorPassword } from '../controllers/user.js';
  
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
  .route('/forgot/:email')
  .get(forgot);

router 
  .route('/restorpassword')
  .put(restorPassword);

export default router;