import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  // Create new evaluation
  createEvaluation: async (startupIdea) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/evaluations`, {
        startupIdea
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single evaluation by ID
  getEvaluation: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/evaluations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all evaluations
  getAllEvaluations: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/evaluations`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default api;
