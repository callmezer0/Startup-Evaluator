const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  startupIdea: {
    type: String,
    required: [true, 'Startup idea is required'],
    trim: true,
    maxlength: [1000, 'Startup idea cannot exceed 1000 characters']
  },
  marketAnalysis: {
    type: Object,
    default: {}
  },
  competitorAnalysis: {
    type: Object,
    default: {}
  },
  financialForecast: {
    type: Object,
    default: {}
  },
  finalSummary: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Evaluation', evaluationSchema);
