import express from 'express';
import { getAll, post_post, verify_post,GetOnePost,AddLikePost } from '../controllers/post.js';


  
const router = express.Router();

router
  .route('/post_verifier')
  .post(verify_post);
router 
  .route('/post_post')
  .post(post_post);
router
  .route('/getAll')  
  .get(getAll);
router  
  .route('/GetOnePost')
  .post(GetOnePost);
router
  .route('/AddLikePost')
  .put(AddLikePost)
export default router;