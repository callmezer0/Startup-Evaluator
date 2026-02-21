import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Clock, ArrowRight } from 'lucide-react';

const History = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.getAllEvaluations();
        setEvaluations(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
        <LoadingSpinner message="Loading history..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Evaluation History</h1>

        {evaluations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-600 mb-4">No evaluations yet</p>
            <Link to="/" className="text-blue-600 hover:underline">
              Create your first evaluation →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {evaluations.map((evaluation) => (
              <Link
                key={evaluation._id}
                to={`/results/${evaluation._id}`}
                className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium mb-2">
                      {evaluation.startupIdea.substring(0, 100)}...
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={16} />
                      {new Date(evaluation.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <ArrowRight className="text-blue-600 flex-shrink-0 ml-4" size={24} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
