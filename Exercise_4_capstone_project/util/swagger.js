import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import mainRouter from './routes/index.js'; // Assuming this is your base routes file

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Finance Tracker API',
      version: '1.0.0',
      description: 'Comprehensive API documentation for managing user authentication, transactions, analysis, and file uploads.',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format: Bearer <token>',
        },
      },
    },
  },
  // Adjust paths to match where your route files live
  apis: ['./routes/*.js'],
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);

