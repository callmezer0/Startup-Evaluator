const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const evaluationRoutes = require('./routes/evaluationRoutes');

const app = express();
const urlEncodedOptions = { extended: true };

const healthHandler = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded(urlEncodedOptions));

// Health check route
app.get('/health', healthHandler);

// API Routes
app.use('/api/evaluations', evaluationRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
