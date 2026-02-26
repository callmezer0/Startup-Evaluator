import { Lightbulb, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'History', to: '/history' }
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line-soft)] bg-[rgba(255,253,246,0.86)] backdrop-blur-xl">
      <div className="section-shell py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="group flex items-center gap-3 rounded-2xl border border-[var(--line-soft)] bg-white/80 px-4 py-2 transition hover:-translate-y-0.5"
          >
            <div className="rounded-xl bg-gradient-to-br from-[var(--brand-1)] to-[var(--brand-2)] p-2 text-white shadow-lg shadow-emerald-900/20">
              <Lightbulb size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-[var(--ink-1)]">Startup Evaluator</h1>
              <p className="flex items-center gap-1 text-xs font-medium tracking-wide text-[var(--ink-2)]">
                <Sparkles size={12} />
                AI idea intelligence
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full border border-[var(--line-soft)] bg-white/75 px-4 py-2 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--brand-2)] hover:text-[var(--brand-2)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
