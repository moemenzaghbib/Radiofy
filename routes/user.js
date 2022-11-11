import express from 'express';

import { signin, signup, verify, googleSignIn, googleVerifier, googleSignUp } from '../controllers/user.js';
  
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

export default router;