import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import { builders } from '../data/builders.js';
import { categories } from '../data/categories.js';
import BuilderCard from '../components/BuilderCard.jsx';
import { Avatar, Badge, Field } from '../components/ui.jsx';

export default function BrowsePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');
  const [tool, setTool] = useState('');
  const [availability, setAvailability] = useState('All');
  const [minimumRating, setMinimumRating] = useState('All');
  const [status, setStatus] = useState('All');
  const [saved, setSaved] = useState(() => new Set());
  const [compared, setCompared] = useState(() => new Set());

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return builders.filter((builder) => {
      const categoryMatch = activeCategory === 'All' || builder.category === activeCategory;
      const text = `${builder.name} ${builder.profession} ${builder.category} ${builder.industry} ${builder.headline} ${builder.builds.join(' ')} ${builder.understands.join(' ')}`.toLowerCase();
      const queryMatch = !normalized || text.includes(normalized);
      const toolMatch = !tool.trim() || builder.tools.join(' ').toLowerCase().includes(tool.trim().toLowerCase());
      const availabilityMatch =
        availability === 'All' ||
        builder.availability.toLowerCase().includes(availability.toLowerCase()) ||
        builder.joined.toLowerCase().includes(availability.toLowerCase());
      const ratingMatch = minimumRating === 'All' || builder.rating >= Number(minimumRating);
      const statusMatch =
        status === 'All' ||
        (status === 'Most booked' && builder.booked) ||
        (status === 'Recently joined' && builder.joined.includes('Recently')) ||
        (status === 'Trending builders' && builder.trending);
      return categoryMatch && queryMatch && toolMatch && availabilityMatch && ratingMatch && statusMatch;
    });
  }, [activeCategory, availability, minimumRating, query, status, tool]);

  const toggleSet = (setter, id) => {
    setter((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="relative z-10 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="reveal grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <Badge tone="cyan" icon={Search}>
              Marketplace
            </Badge>
            <h1 className="mt-6 font-display text-5xl font-bold text-white sm:text-7xl">
              Discover <span className="gradient-text">Vibe Builders</span>
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
              Real-life experts who build with AI: faster, leaner, and closer to the problem.
            </p>
          </div>
          <div className="market-snapshot">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Saved builders</span>
              <span className="font-display text-2xl font-bold text-white">{saved.size}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-zinc-400">Compare list</span>
              <span className="font-display text-2xl font-bold text-cyanNeon">{compared.size}</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded bg-white/10">
              <div className="h-full bg-gradient-to-r from-violetRoyal to-cyanNeon" style={{ width: `${Math.min(100, filtered.length * 8)}%` }} />
            </div>
            <p className="mt-3 text-xs text-zinc-500">{filtered.length} matching builders</p>
          </div>
        </div>

        <div className="reveal mt-10 grid gap-4 rounded-lg border border-white/10 bg-white/[.045] p-4 shadow-cyan backdrop-blur-xl lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <Field icon={Search} label="Profession search">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Doctor, trading dashboard, kitchen..." />
          </Field>
          <Field icon={Code2} label="Tool search">
            <input value={tool} onChange={(event) => setTool(event.target.value)} placeholder="Cursor, Claude, Supabase..." />
          </Field>
          <Field icon={Zap} label="Availability">
            <select value={availability} onChange={(event) => setAvailability(event.target.value)}>
              <option>All</option>
              <option>Available</option>
              <option>Open</option>
              <option>Taking</option>
              <option>Recently</option>
            </select>
          </Field>
          <Field icon={Star} label="Rating">
            <select value={minimumRating} onChange={(event) => setMinimumRating(event.target.value)}>
              <option>All</option>
              <option value="4.8">4.8+</option>
              <option value="4.9">4.9+</option>
              <option value="4.95">4.95+</option>
            </select>
          </Field>
        </div>

        <div className="reveal mt-4 flex flex-wrap gap-2">
          {['Most booked', 'Recently joined', 'Trending builders', 'Available now'].map((label) => (
            <button
              key={label}
              type="button"
              className={`market-quick-chip ${status === label || (label === 'Available now' && availability === 'Available') ? 'market-quick-chip-active' : ''}`}
              onClick={() => {
                if (label === 'Available now') {
                  setAvailability(availability === 'Available' ? 'All' : 'Available');
                } else {
                  setStatus(status === label ? 'All' : label);
                }
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="reveal mt-6 flex flex-wrap gap-2" data-testid="category-filters">
          {['All', 'Health', 'Agriculture', 'Music', 'Food', 'Legal', 'Trading', 'Education', 'Real Estate', 'Logistics', 'Mental Health', 'Hospitality', 'Retail', 'Field Service'].map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-chip ${activeCategory === category ? 'filter-chip-active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_320px]">
          <div className="grid gap-5">
            {filtered.map((builder) => (
              <BuilderCard
                key={builder.id}
                builder={builder}
                saved={saved.has(builder.id)}
                compared={compared.has(builder.id)}
                onSave={() => toggleSet(setSaved, builder.id)}
                onCompare={() => toggleSet(setCompared, builder.id)}
                showCompare
              />
            ))}
            {filtered.length === 0 && (
              <div className="empty-state reveal">
                <SlidersHorizontal className="mx-auto size-10 text-cyanNeon" />
                <h2 className="mt-4 font-display text-2xl font-bold text-white">No builders matched that filter.</h2>
                <p className="mt-3 text-zinc-400">Try a broader profession, tool, or category.</p>
              </div>
            )}
          </div>
          <aside className="grid h-fit gap-5">
            <MarketList title="Recently joined" builders={builders.filter((b) => b.joined.includes('Recently')).slice(0, 4)} />
            <MarketList title="Trending builders" builders={builders.filter((b) => b.trending).slice(0, 4)} />
            <MarketList title="Most booked" builders={builders.filter((b) => b.booked).slice(0, 4)} />
            <div className="side-card reveal">
              <h3 className="font-display text-lg font-bold text-white">Featured industries</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.slice(0, 8).map((category) => (
                  <button key={category.category} className="chip" type="button" onClick={() => setActiveCategory(category.category)}>
                    {category.category}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function MarketList({ title, builders: list }) {
  return (
    <div className="side-card reveal">
      <h3 className="font-display text-lg font-bold text-white">{title}</h3>
      <div className="mt-4 grid gap-3">
        {list.map((builder) => (
          <Link key={builder.id} to={`/profile/${builder.id}`} className="mini-builder">
            <Avatar builder={builder} />
            <span className="min-w-0">
              <span className="block truncate font-semibold text-white">{builder.name}</span>
              <span className="block truncate text-xs text-zinc-500">{builder.profession}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
