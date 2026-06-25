import { Link } from 'react-router-dom';
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

export function Button({ children, to, icon: Icon, variant = 'primary', className = '', onClick }) {
  const classes = `button ${variant === 'ghost' ? 'button-ghost' : 'button-primary'} ${className}`;
  const content = (
    <>
      {Icon && <Icon className="size-4 shrink-0" />}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  );
}

export function Badge({ children, tone = 'violet', icon: Icon }) {
  return (
    <span className={`badge badge-${tone}`}>
      {Icon && <Icon className="size-3.5" />}
      {children}
    </span>
  );
}

export function DefinitionCallout({ compact = false }) {
  return (
    <div className={`definition-callout reveal ${compact ? 'definition-callout-compact' : ''}`}>
      <p className="text-xs font-bold uppercase text-amberSignal">A vibe coder is</p>
      <p className="mt-3 font-display text-2xl font-bold leading-tight text-white">
        A person with lived experience who uses AI to build anything they imagine.
      </p>
      <p className="mt-3 text-sm font-semibold leading-6 text-cyanNeon">
        Your industry is your advantage, not your prison.
      </p>
    </div>
  );
}

export function Avatar({ builder }) {
  return (
    <div className="avatar" aria-hidden="true">
      <span>{builder.initials}</span>
    </div>
  );
}

export function InfoBlock({ title, items }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase text-zinc-500">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Metric({ icon: Icon, value, label }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2 text-white">
        <Icon className="size-4 text-amberSignal" />
        <span className="truncate font-display text-sm font-bold">{value}</span>
      </div>
      <p className="mt-1 text-xs uppercase text-zinc-500">{label}</p>
    </div>
  );
}

export function Field({ icon: Icon, label, children }) {
  return (
    <label className="field">
      <span>
        <Icon className="size-4" />
        {label}
      </span>
      {children}
    </label>
  );
}

export function WorkflowGrid({ items }) {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map(([title, text], index) => (
        <article key={title} className="number-card reveal">
          <span className="number-mark">{String(index + 1).padStart(2, '0')}</span>
          <h2 className="mt-6 font-display text-xl font-bold text-white">{title}</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-400">{text}</p>
        </article>
      ))}
    </div>
  );
}
