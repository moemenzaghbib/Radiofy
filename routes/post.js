import express from 'express';
import { post_post, verify_post } from '../controllers/post.js';


  
const router = express.Router();

router
  .route('/post_verifier')
  .post(verify_post);
router 
  .route('/post_post')
  .post(post_post);
export default router;