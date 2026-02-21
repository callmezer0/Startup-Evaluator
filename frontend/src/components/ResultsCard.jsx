import { TrendingUp, Users, DollarSign, FileText } from 'lucide-react';

const ResultsCard = ({ evaluation }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Startup Idea */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl p-6">
        <h3 className="text-2xl font-bold mb-2">Your Startup Idea</h3>
        <p className="text-lg">{evaluation.startupIdea}</p>
      </div>

      {/* Market Analysis */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="text-blue-600" size={28} />
          <h3 className="text-2xl font-bold text-gray-800">Market Analysis</h3>
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {evaluation.marketAnalysis.analysis}
        </p>
      </div>

      {/* Competitor Analysis */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="text-purple-600" size={28} />
          <h3 className="text-2xl font-bold text-gray-800">Competitor Analysis</h3>
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {evaluation.competitorAnalysis.analysis}
        </p>
      </div>

      {/* Financial Forecast */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="text-green-600" size={28} />
          <h3 className="text-2xl font-bold text-gray-800">Financial Forecast</h3>
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {evaluation.financialForecast.analysis}
        </p>
      </div>

      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="text-orange-600" size={28} />
          <h3 className="text-2xl font-bold text-gray-800">Executive Summary</h3>
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {evaluation.finalSummary}
        </p>
      </div>
    </div>
  );
};

export default ResultsCard;
