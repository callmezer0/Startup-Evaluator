import { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const EvaluationForm = () => {
  const [startupIdea, setStartupIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!startupIdea.trim()) {
      setError('Please enter your startup idea');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.createEvaluation(startupIdea);
      navigate(`/results/${response.data._id}`);
    } catch (err) {
      setError('Failed to evaluate startup idea. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="text-yellow-500" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Evaluate Your Startup Idea</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="startupIdea" className="block text-gray-700 font-medium mb-2">
              Describe Your Startup Idea
            </label>
            <textarea
              id="startupIdea"
              rows="6"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              placeholder="e.g., A mobile app that uses AI to help students learn coding through gamification..."
              value={startupIdea}
              onChange={(e) => setStartupIdea(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Evaluate My Idea
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EvaluationForm;
