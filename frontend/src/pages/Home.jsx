import EvaluationForm from '../components/EvaluationForm';
import { Brain, Target, BarChart, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Transform Your Startup Idea Into Reality
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant AI-powered analysis with market insights, competitor research, and financial forecasts
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Brain className="mx-auto text-blue-600 mb-3" size={40} />
            <h3 className="font-bold text-gray-800 mb-2">AI-Powered</h3>
            <p className="text-sm text-gray-600">Advanced AI agents analyze your idea</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Target className="mx-auto text-purple-600 mb-3" size={40} />
            <h3 className="font-bold text-gray-800 mb-2">Market Analysis</h3>
            <p className="text-sm text-gray-600">Understand your target market size</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <BarChart className="mx-auto text-green-600 mb-3" size={40} />
            <h3 className="font-bold text-gray-800 mb-2">Financial Forecast</h3>
            <p className="text-sm text-gray-600">Get revenue and profitability projections</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <CheckCircle className="mx-auto text-orange-600 mb-3" size={40} />
            <h3 className="font-bold text-gray-800 mb-2">Instant Results</h3>
            <p className="text-sm text-gray-600">Receive comprehensive reports in seconds</p>
          </div>
        </div>

        {/* Evaluation Form */}
        <EvaluationForm />
      </div>
    </div>
  );
};

export default Home;
