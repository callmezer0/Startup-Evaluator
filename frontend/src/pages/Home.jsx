import EvaluationForm from '../components/EvaluationForm';
import { Brain, Target, BarChart, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Review',
    description: 'Advanced multi-agent analysis for market, product, and viability.',
    tone: 'text-[var(--brand-2)]'
  },
  {
    icon: Target,
    title: 'Audience Precision',
    description: 'Clear segmentation and targeting signals for faster positioning.',
    tone: 'text-[var(--brand-1)]'
  },
  {
    icon: BarChart,
    title: 'Financial Signals',
    description: 'Revenue trajectory and risk visibility in one focused report.',
    tone: 'text-[var(--brand-3)]'
  },
  {
    icon: CheckCircle,
    title: 'Fast Decisions',
    description: 'Action-ready output in seconds so you can iterate quickly.',
    tone: 'text-teal-700'
  }
];

const Home = () => {
  return (
    <div className="px-4 py-12 md:py-16">
      <div className="section-shell">
        <div className="mb-10 rounded-3xl border border-[var(--line-soft)] bg-white/75 p-8 shadow-[0_20px_45px_rgba(15,30,24,0.08)] md:p-12">
          <p className="mb-4 inline-flex items-center rounded-full border border-[var(--line-soft)] bg-[var(--surface-2)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-2)]">
            Startup intelligence workspace
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[var(--ink-1)] md:text-6xl">
            Turn rough ideas into confident startup plans.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--ink-2)] md:text-lg">
            Run one prompt and get structured analysis across opportunity, competition, and monetization so you can choose the right next move.
          </p>
        </div>

        <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass-panel rounded-2xl p-6 transition duration-200 hover:-translate-y-1"
              >
                <Icon className={`${feature.tone} mb-4`} size={28} />
                <h3 className="mb-2 text-lg font-bold text-[var(--ink-1)]">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--ink-2)]">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <EvaluationForm />
      </div>
    </div>
  );
};

export default Home;
