const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const evaluationRoutes = require('./routes/evaluationRoutes');

const app = express();

const URL_ENCODED_OPTIONS = { extended: true };
const HEALTH_ROUTE = '/health';
const EVALUATIONS_ROUTE = '/api/evaluations';

const sendSuccessResponse = (res, payload, statusCode = 200) => {
  res.status(statusCode).json({ success: true, ...payload });
};

const healthHandler = (req, res) => {
  sendSuccessResponse(res, {
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime())
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
};

const registerMiddleware = (expressApp) => {
  expressApp.use(cors());
  expressApp.use(express.json());
  expressApp.use(express.urlencoded(URL_ENCODED_OPTIONS));
};

const registerRoutes = (expressApp) => {
  expressApp.get(HEALTH_ROUTE, healthHandler);
  expressApp.use(EVALUATIONS_ROUTE, evaluationRoutes);
};

registerMiddleware(app);
registerRoutes(app);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
