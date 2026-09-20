const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const routes = require('./routes/routes');
app.use('/api', routes);



// connect database:
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});