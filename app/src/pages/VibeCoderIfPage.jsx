import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Code2,
  GitCompare,
  Grid3X3,
  Heart,
  Layers3,
  Menu,
  MessageCircle,
  Rocket,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  UserRoundCheck,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import { vibeCoderSignals } from '../data/categories.js';
import CtaBand from '../components/CtaBand.jsx';
import PageHero from '../components/PageHero.jsx';
import { Badge, DefinitionCallout } from '../components/ui.jsx';

export default function VibeCoderIfPage() {
  return (
    <section className="page-shell">
      <div className="mx-auto max-w-7xl">
        <PageHero
          badge="Identity page"
          title="You Are a Vibe Coder If..."
          text="You build from intuition, lived experience, and imagination. Your industry is your advantage, not your prison."
        />
        <DefinitionCallout compact />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {vibeCoderSignals.map(([title, text], index) => (
            <article key={title} className="number-card reveal">
              <span className="number-mark">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="mt-6 font-display text-xl font-bold text-white">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{text}</p>
            </article>
          ))}
        </div>

        <div className="reveal mt-14 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <Badge tone="green" icon={CheckCircle2}>
              Why vibe coders win
            </Badge>
            <h2 className="mt-5 font-display text-4xl font-bold text-white">They build from the world, not just the editor.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {['They build from experience', 'They understand the world, not just the code', 'They focus on utility, speed, and real needs', 'They ship what matters first', 'They turn lived experience into software', 'They use AI to make the solution real'].map((item) => (
              <div key={item} className="win-chip">
                <CheckCircle2 className="size-4 text-acid" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <CtaBand />
      </div>
    </section>
  );
}
