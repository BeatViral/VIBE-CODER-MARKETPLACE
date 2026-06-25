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
import { comparisonCards, comparisonRows, examples } from '../data/categories.js';
import PageHero from '../components/PageHero.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { Badge, DefinitionCallout } from '../components/ui.jsx';

export default function DifferencePage() {
  const nuancePoints = [
    [
      'Industry fluency',
      'A healthcare founder can search for a healthcare-aware vibe coder, not just a generic app builder. The match starts with the world the product must survive in.',
    ],
    [
      'Nuance protection',
      'A builder without domain context can unintentionally bend the idea to fit the brief, the stack, or the easiest implementation path. Vibe coders notice which details must not be flattened.',
    ],
    [
      'Better partnership',
      'The best builder is not always the most technical person. It is often the person who understands the pressure, language, customers, edge cases, and invisible rules of the domain.',
    ],
  ];

  return (
    <section className="page-shell">
      <div className="mx-auto max-w-7xl">
        <PageHero
          badge="Contrarian thesis"
          title="Difference Between Coder and Vibe Coder"
          text="Different builders for different stages. Coders are powerful when the product is defined. Vibe coders are powerful when the problem has been lived."
        />
        <DefinitionCallout compact />

        <div className="reveal mt-12 grid gap-5 lg:grid-cols-2">
          <ManifestoPanel
            icon={Code2}
            title="A coder is powerful when"
            items={['The product is defined', 'Architecture matters', 'Scale is the priority', 'Engineering depth is needed', 'Technical systems need hardening']}
          />
          <ManifestoPanel
            icon={Workflow}
            title="A vibe coder is powerful when"
            items={['Lived experience', 'Pain', 'Workflow', 'Instinct', 'The real-world problem']}
          />
        </div>

        <div className="reveal my-14 border-y border-white/10 py-10 text-center">
          <p className="font-display text-4xl font-bold text-white sm:text-6xl">Experience beats syntax.</p>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
            A coder is syntax-first. A vibe coder is experience-first. Founders often need both, but not always at the
            same stage.
          </p>
        </div>

        <section className="reveal my-14">
          <SectionHeader
            eyebrow="The nuance advantage"
            title="The right vibe coder protects the idea from being flattened."
            text="This is why the marketplace matters. You are not only searching for someone who can build. You are searching for someone whose lived context matches the world your product belongs to."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {nuancePoints.map(([title, text]) => (
              <article key={title} className="nuance-card">
                <ShieldCheck className="size-5 text-cyanNeon" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="nuance-case-card mt-6">
            <div>
              <Badge tone="amber" icon={Heart}>
                Creative nuance
              </Badge>
              <h3>Small misunderstanding. Big damage.</h3>
              <p>
                Give a 60-second song to someone without music context and ask for a 30-second commercial, and they
                might simply speed the song up. The brief is technically satisfied, but the feeling is destroyed.
              </p>
            </div>
            <div className="nuance-split">
              <div>
                <span>Generic execution</span>
                <p>Make it fit the required length.</p>
              </div>
              <ArrowRight className="size-5 text-cyanNeon" />
              <div>
                <span>Domain-aware execution</span>
                <p>Cut the arrangement with taste, protect the hook, and keep the emotional timing intact.</p>
              </div>
            </div>
          </div>
          <div className="nuance-warning">
            A vibe coder does not just pass the brief. They understand what should never be changed.
          </div>
        </section>

        <div className="reveal overflow-hidden rounded-lg border border-white/10">
          <div className="grid grid-cols-2 bg-white/[.06]">
            <div className="border-r border-white/10 p-5 font-display text-xl font-bold text-white">Coder-first builder</div>
            <div className="p-5 font-display text-xl font-bold text-cyanNeon">Vibe Coder</div>
          </div>
          {comparisonRows.map(([coder, vibe]) => (
            <div key={coder} className="grid grid-cols-2 border-t border-white/10">
              <div className="border-r border-white/10 p-5 text-sm leading-6 text-zinc-400">{coder}</div>
              <div className="p-5 text-sm font-semibold leading-6 text-white">{vibe}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {comparisonCards.map(([coder, vibe]) => (
            <div key={coder} className="comparison-card reveal">
              <p className="text-sm text-zinc-500">{coder}</p>
              <ArrowRight className="my-4 size-5 text-cyanNeon" />
              <p className="font-display text-xl font-bold text-white">{vibe}</p>
            </div>
          ))}
        </div>

        <SectionHeader
          eyebrow="Real-world examples"
          title="The difference shows up at the workflow level"
          text="Traditional marketplaces show technical skill. This marketplace also makes lived context visible."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {examples.map((example) => (
            <article key={example.title} className="example-card reveal">
              <div className="icon-tile">
                <example.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-white">{example.title}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-500">{example.coder}</p>
              <p className="mt-4 text-sm font-semibold leading-7 text-zinc-200">{example.vibe}</p>
            </article>
          ))}
        </div>

        <div className="reveal mt-16 text-center">
          <p className="font-display text-4xl font-bold text-white">AI made syntax cheap. Experience became the new moat.</p>
          <p className="mt-5 text-xl text-cyanNeon">Coders build from code. Vibe coders build from life.</p>
        </div>
      </div>
    </section>
  );
}

function ManifestoPanel({ icon: Icon, title, items }) {
  return (
    <div className="track-card">
      <div className="icon-tile">
        <Icon className="size-5" />
      </div>
      <h2 className="mt-5 font-display text-2xl font-bold text-white">{title}</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
