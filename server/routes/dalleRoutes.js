import express from 'express';
import dalleRequest from '../controllers/dalleController.js';
import isAuthenticatedUser from '../middleware/auth.js';

const router =express.Router();

router.route('/').post(isAuthenticatedUser,dalleRequest)


export default router;
