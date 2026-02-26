import { useState } from 'react';
import { Sparkles, Send, WandSparkles } from 'lucide-react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const promptHints = [
  'Who is the primary customer?',
  'What pain point is solved?',
  'How does revenue work?'
];

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
    <section className="mx-auto max-w-4xl">
      <div className="glass-panel overflow-hidden rounded-3xl">
        <div className="border-b border-[var(--line-soft)] bg-[linear-gradient(120deg,rgba(30,122,87,0.12),rgba(15,79,112,0.12))] p-6 md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-white/75 p-2 text-[var(--brand-1)]">
              <Sparkles size={24} />
            </div>
            <h2 className="text-2xl font-bold text-[var(--ink-1)] md:text-3xl">Evaluate your startup idea</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {promptHints.map((hint) => (
              <span
                key={hint}
                className="rounded-full border border-[var(--line-soft)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--ink-2)]"
              >
                {hint}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="mb-6">
            <label htmlFor="startupIdea" className="mb-2 block text-sm font-semibold text-[var(--ink-1)]">
              Describe your startup in 3-6 sentences
            </label>
            <textarea
              id="startupIdea"
              rows="7"
              className="w-full rounded-2xl border border-[var(--line-soft)] bg-white px-4 py-3 text-[var(--ink-1)] shadow-inner outline-none transition focus:border-[var(--brand-2)] focus:ring-2 focus:ring-sky-200"
              placeholder="Example: A workflow co-pilot that turns customer support conversations into prioritized product tickets with projected revenue impact."
              value={startupIdea}
              onChange={(e) => setStartupIdea(e.target.value)}
              disabled={loading}
            />
            <div className="mt-2 text-right text-xs text-[var(--ink-2)]">{startupIdea.length} characters</div>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm font-medium text-rose-700">
              {error}
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(100deg,var(--brand-1),var(--brand-2))] px-6 py-4 text-sm font-semibold tracking-wide text-white transition hover:brightness-110"
            >
              <WandSparkles size={18} />
              <span>Run AI Evaluation</span>
              <Send size={16} />
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default EvaluationForm;
