import { Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <Lightbulb size={32} />
            <div>
              <h1 className="text-2xl font-bold">Startup Evaluator</h1>
              <p className="text-sm text-blue-100">AI-Powered Idea Analysis</p>
            </div>
          </Link>
          <nav className="flex gap-6">
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
            <Link to="/history" className="hover:text-blue-200 transition">History</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
