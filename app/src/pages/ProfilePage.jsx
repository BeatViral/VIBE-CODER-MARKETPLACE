import { useParams } from 'react-router-dom';
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
import { projects } from '../data/categories.js';
import { Avatar, Badge, Button, Metric } from '../components/ui.jsx';

export default function ProfilePage() {
  const { id } = useParams();
  const builder = builders.find((item) => item.id === id) || builders[0];
  const profileProjects = builder.portfolio || projects.slice(0, 3).map((project) => project.name);
  const caseStudies = builder.caseStudies || [
    `Mapped the ${builder.category.toLowerCase()} workflow into a lean prototype scope.`,
    'Delivered a first useful version with founder-owned handover docs.',
  ];
  const reviews = builder.reviews || [
    'The builder understood the workflow before we had to explain it.',
    'The MVP felt practical from the first demo.',
  ];
  const pricing = builder.pricing || ['Discovery map: $650', 'Prototype sprint: $3,500', 'MVP build: $9,000+'];

  return (
    <section className="page-shell">
      <div className="mx-auto max-w-7xl">
        <div className="reveal profile-hero">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Avatar builder={builder} />
              <Badge tone="green" icon={BadgeCheck}>
                Real-Life Verified
              </Badge>
              <Badge tone="cyan" icon={ShieldCheck}>
                AI Build Verified
              </Badge>
              <Badge tone="amber" icon={CheckCircle2}>
                Founder-Safe Verified
              </Badge>
            </div>
            <h1 className="mt-7 font-display text-5xl font-bold text-white sm:text-7xl">{builder.name}</h1>
            <p className="mt-5 text-xl text-zinc-300">In real life: {builder.profession}</p>
            <p className="mt-2 text-2xl font-bold text-cyanNeon">{builder.headline}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">{builder.profileBio || builder.bestFor}</p>
          </div>
          <div className="profile-panel">
            <Metric icon={Star} value={builder.rating} label="Founder rating" />
            <Metric icon={CheckCircle2} value={builder.projects} label="Completed builds" />
            <Metric icon={Zap} value={builder.availability} label="Availability" />
            <Metric icon={Layers3} value={builder.price} label="Starting price" />
            <div className="mt-6 grid gap-3">
              <Button icon={MessageCircle}>Book discovery call</Button>
              <Button variant="ghost" icon={Bookmark}>
                Message builder
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-6">
            <ProfileSection title="What I build" items={builder.builds} />
            <ProfileSection title="What I understand" items={builder.understands} />
            <div className="profile-section reveal">
              <h2>Vibe advantage</h2>
              <p className="mt-4 border-l-2 border-cyanNeon/70 pl-4 text-lg leading-8 text-white">"{builder.advantage}"</p>
            </div>
            <ProfileSection title="Portfolio projects" items={profileProjects} />
            <ProfileSection title="Case studies" items={caseStudies} ordered />
            <ProfileSection title="Reviews" items={reviews} quote />
          </div>

          <aside className="grid h-fit gap-6">
            <div className="side-card reveal">
              <h3 className="font-display text-xl font-bold text-white">AI tools</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {builder.tools.map((toolName) => (
                  <span key={toolName} className="chip">
                    {toolName}
                  </span>
                ))}
              </div>
            </div>
            <div className="side-card reveal">
              <h3 className="font-display text-xl font-bold text-white">Best for</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{builder.bestFor}</p>
            </div>
            <div className="side-card reveal">
              <h3 className="font-display text-xl font-bold text-white">Pricing packages</h3>
              <div className="mt-4 grid gap-3">
                {pricing.map((item) => (
                  <div key={item} className="price-row">
                    <CheckCircle2 className="size-4 text-acid" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ProfileSection({ title, items, ordered = false, quote = false }) {
  const Tag = ordered ? 'ol' : 'div';
  return (
    <section className="profile-section reveal">
      <h2>{title}</h2>
      <Tag className={ordered ? 'mt-5 grid list-decimal gap-3 pl-5 text-zinc-300' : 'mt-5 grid gap-3'}>
        {items.map((item) => (
          <div key={item} className={quote ? 'quote-row' : 'profile-row'}>
            {quote ? `"${item}"` : item}
          </div>
        ))}
      </Tag>
    </section>
  );
}
