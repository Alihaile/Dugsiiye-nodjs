import express from 'express';
import { login, register,getProfileInfo } from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';
const routes = express.Router();

routes.post('/register', register);
routes.post('/login', login);
routes.get('/profile',protect, getProfileInfo);

export default routes;