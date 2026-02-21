const express = require('express');
const router = express.Router();
const {
  createEvaluation,
  getEvaluation,
  getAllEvaluations
} = require('../controllers/evaluationController');

// POST /api/evaluations - Create new evaluation
router.post('/', createEvaluation);

// GET /api/evaluations/:id - Get single evaluation
router.get('/:id', getEvaluation);

// GET /api/evaluations - Get all evaluations
router.get('/', getAllEvaluations);

module.exports = router;
