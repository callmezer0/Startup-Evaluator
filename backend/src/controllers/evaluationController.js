const Evaluation = require('../models/Evaluation');
const parentAgent = require('../services/parentAgent');
const log = require('../utils/logger');

// @desc    Create new evaluation
// @route   POST /api/evaluations
// @access  Public
const createEvaluation = async (req, res, next) => {
  try {
    const { startupIdea } = req.body;

    if (!startupIdea || startupIdea.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Startup idea is required'
      });
    }

    log.info(`New evaluation request for: "${startupIdea.substring(0, 50)}..."`);

    // Create initial evaluation record
    const evaluation = await Evaluation.create({
      startupIdea,
      status: 'processing'
    });

    // Run parent agent to orchestrate child agents
    const result = await parentAgent.evaluate(startupIdea);

    // Update evaluation with results
    evaluation.marketAnalysis = result.marketAnalysis;
    evaluation.competitorAnalysis = result.competitorAnalysis;
    evaluation.financialForecast = result.financialForecast;
    evaluation.finalSummary = result.finalSummary;
    evaluation.status = 'completed';

    await evaluation.save();

    log.success(`Evaluation completed for ID: ${evaluation._id}`);

    res.status(201).json({
      success: true,
      data: evaluation
    });

  } catch (error) {
    log.error(`Evaluation failed: ${error.message}`);
    next(error);
  }
};

// @desc    Get single evaluation
// @route   GET /api/evaluations/:id
// @access  Public
const getEvaluation = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);

    if (!evaluation) {
      return res.status(404).json({
        success: false,
        error: 'Evaluation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: evaluation
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get all evaluations
// @route   GET /api/evaluations
// @access  Public
const getAllEvaluations = async (req, res, next) => {
  try {
    const evaluations = await Evaluation.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: evaluations.length,
      data: evaluations
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEvaluation,
  getEvaluation,
  getAllEvaluations
};
