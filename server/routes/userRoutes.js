import { login,signIn,logOut,getCurrentUser } from '../controllers/userController.js';
import  express  from 'express'
import isAuthenticatedUser from '../middleware/auth.js';
const router =express.Router();

router.route('/signin').post(signIn);
router.route('/login').post(login);
router.route('/logout').get(logOut);
router.route('/getCurrUser').get(isAuthenticatedUser,getCurrentUser);

export default router;

