
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import express from 'express';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3000;
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import routes from './routes/routes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './util/swagger.js';


app.use(helmet({ hidePoweredBy: true, xPoweredBy: false }));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

//set up swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// connect database:
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});