import express from 'express';
import authRoutes from './auth.js';
import adminRoutes from './admin.js';
const routes = express.Router();

// get all books
routes.use('/auth', authRoutes);
routes.use('/admin', adminRoutes);

export default routes;