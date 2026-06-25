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
import { Avatar, Badge, Button, InfoBlock, Metric } from './ui.jsx';

export default function BuilderCard({ builder, saved, compared, onSave, onCompare, showCompare = false }) {
  return (
    <article className="builder-card reveal">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          <Avatar builder={builder} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-xl font-bold text-white">{builder.name}</h3>
              {builder.booked && <span className="status-pill status-pill-coral">Most booked</span>}
              {builder.trending && <span className="status-pill status-pill-cyan">Trending</span>}
              {builder.joined.includes('Recently') && <span className="status-pill status-pill-amber">Recently joined</span>}
            </div>
            <p className="mt-3 text-xs font-bold uppercase text-zinc-500">In real life</p>
            <p className="mt-1 text-sm font-semibold text-zinc-200">{builder.profession}</p>
            <p className="mt-3 text-xs font-bold uppercase text-cyanNeon">With AI, I build</p>
            <p className="mt-1 text-base font-semibold text-white">{builder.headline.replace('With AI, I build ', '')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className={`icon-button ${saved ? 'icon-button-active' : ''}`} type="button" onClick={onSave} aria-label="Save builder">
            <Heart className={`size-4 ${saved ? 'fill-current' : ''}`} />
          </button>
          {showCompare && (
            <button
              className={`icon-button ${compared ? 'icon-button-active' : ''}`}
              type="button"
              onClick={onCompare}
              aria-label="Compare builder"
            >
              <GitCompare className="size-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <InfoBlock title="Builds" items={builder.builds.slice(0, 3)} />
        <InfoBlock title="Understands" items={builder.understands.slice(0, 4)} />
      </div>

      <div className="builder-advantage">
        <p>Vibe advantage</p>
        <strong>"{builder.advantage}"</strong>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge tone="violet">{builder.industry}</Badge>
        {builder.proofs.map((proof, index) => (
          <Badge key={proof} tone={index === 0 ? 'cyan' : index === 1 ? 'green' : 'amber'} icon={ShieldCheck}>
            {proof}
          </Badge>
        ))}
      </div>

      <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-4">
        <Metric icon={Star} value={builder.rating} label="Rating" />
        <Metric icon={CheckCircle2} value={builder.projects} label="Builds" />
        <Metric icon={Zap} value={builder.availability} label="Availability" />
        <Metric icon={Layers3} value={builder.price} label="Starts at" />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button to={`/profile/${builder.id}`} icon={UserRoundCheck} className="sm:flex-1">
          View Profile
        </Button>
        <Button variant="ghost" icon={Bookmark} className="sm:flex-1" onClick={onSave}>
          {saved ? 'Saved' : 'Save Builder'}
        </Button>
        {showCompare && (
          <Button variant="ghost" icon={GitCompare} className="sm:flex-1" onClick={onCompare}>
            {compared ? 'Comparing' : 'Compare'}
          </Button>
        )}
      </div>
    </article>
  );
}
