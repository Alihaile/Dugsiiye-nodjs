
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import routes from './routes/routes.js';


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);


// connect database:
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});