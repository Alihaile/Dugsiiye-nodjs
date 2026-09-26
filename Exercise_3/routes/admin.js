import express from 'express';
import { dashboard } from '../controllers/authController.js';
import { authorize, protect } from '../middlewares/auth.js';
const routes = express.Router();

routes.get('/dashboard', protect, authorize('admin'), dashboard);

export default routes;