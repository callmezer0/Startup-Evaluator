import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = "Analyzing your startup idea..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="animate-spin text-blue-600" size={48} />
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
      <p className="text-sm text-gray-500 mt-2">Our AI agents are working on your evaluation</p>
      <div className="flex gap-2 mt-4">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
