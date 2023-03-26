import express from 'express';
import { createPost, getAllPost,getUserPost } from '../controllers/postController.js';
import isAuthenticatedUser from '../middleware/auth.js';

const router =express.Router();

router.route('/').get(getAllPost).post(isAuthenticatedUser,createPost);
router.route('/myPost').get(isAuthenticatedUser,getUserPost);


export default router; 