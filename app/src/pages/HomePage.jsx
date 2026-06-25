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
import { builders } from '../data/builders.js';
import { builderSteps, categories, founderSteps, projects, testimonials, trustFeatures } from '../data/categories.js';
import BuilderCard from '../components/BuilderCard.jsx';
import CtaBand from '../components/CtaBand.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { Avatar, Badge, Button, DefinitionCallout } from '../components/ui.jsx';

const heroImage = `${import.meta.env.BASE_URL}assets/hero-marketplace.png`;

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignatureCards />
      <CategorySection />
      <FeaturedBuilders />
      <HowItWorks />
      <TrustSection />
      <ProjectsSection />
      <TestimonialsSection />
      <CtaBand />
    </>
  );
}

function Hero() {
  return (
    <section className="relative z-10 min-h-[calc(100vh-5rem)] px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
        <div className="reveal">
          <Badge tone="cyan" icon={Sparkles}>
            New labor category
          </Badge>
          <h1 className="mt-6 max-w-5xl font-display text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            The marketplace for <span className="gradient-text">experience-first AI builders</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-zinc-200">
            We do not match you with generic coders. We match you with builders who understand your world and protect
            the nuance inside your idea.
          </p>
          <p className="mt-4 max-w-2xl rounded-lg border border-cyanNeon/25 bg-cyanNeon/10 p-4 font-display text-xl font-bold leading-8 text-white shadow-cyan">
            Find real-life experts who use AI to build software from the problems they&apos;ve lived.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            Find doctors, farmers, producers, chefs, traders, operators, teachers, and real-life experts who use AI to
            build anything they imagine from the life they have actually lived.
          </p>
          <DefinitionCallout />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/browse" icon={Search}>
              Find a Vibe Coder
            </Button>
            <Button to="/builders" variant="ghost" icon={Rocket}>
              Become a Vibe Coder
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['2,400+', 'Vibe Builders'],
              ['180+', 'Professions'],
              ['35+', 'Industries'],
              ['4.9', 'Founder Rating'],
            ].map(([value, label]) => (
              <div key={label} className="stat-tile">
                <div className="font-display text-2xl font-bold text-white">{value}</div>
                <div className="mt-1 text-xs uppercase text-zinc-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal relative min-h-[560px]">
          <div className="hero-visual">
            <img src={heroImage} alt="Futuristic marketplace interface with glowing builder cards" />
            <div className="hero-visual-shade" />
            <div className="hero-marketplace-preview">
              <div className="hero-preview-topbar">
                <span>Marketplace match</span>
                <strong>Healthcare founder</strong>
              </div>
              <div className="hero-preview-filters">
                {['Doctor', 'Clinical ops', 'Claude Code', '4.9+', 'Available'].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="hero-preview-grid">
                {builders.slice(0, 3).map((builder) => (
                  <div key={builder.id} className="hero-builder-mini">
                    <div className="flex items-center gap-3">
                      <Avatar builder={builder} />
                      <div className="min-w-0">
                        <strong>{builder.name}</strong>
                        <span>{builder.profession}</span>
                      </div>
                    </div>
                    <p>{builder.advantage}</p>
                    <div className="flex flex-wrap gap-2">
                      <em>Real-Life Verified</em>
                      <em>AI Build Verified</em>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="floating-card top-6 right-2">
            <Badge tone="green" icon={CheckCircle2}>
              Real-Life Verified
            </Badge>
            <p className="mt-3 text-sm text-white">Doctor building clinical workflow tools</p>
          </div>
          <div className="floating-card top-8 left-4 hidden max-w-[300px] sm:block">
            <p className="text-xs font-semibold uppercase text-amberSignal">Builder examples</p>
            <div className="mt-4 grid gap-2">
              {[
                ['Doctor', 'clinic triage'],
                ['Farmer', 'equipment logs'],
                ['Producer', 'release workflows'],
                ['Paralegal', 'qualified intake'],
              ].map(([who, what]) => (
                <div key={who} className="signal-row">
                  <span>{who}</span>
                  <ArrowRight className="size-3.5 text-cyanNeon" />
                  <strong>{what}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="floating-card bottom-6 left-0 max-w-[330px]">
            <p className="text-xs font-semibold uppercase text-cyanNeon">Marketplace signal</p>
            <p className="mt-3 font-display text-2xl font-bold leading-tight text-white">The stack tells you how. Experience tells you where the product breaks.</p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              A healthcare founder can zero in on builders who understand healthcare. A music founder can find someone
              who hears the difference between a cut and a broken song.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <span className="mini-signal">pain first</span>
              <span className="mini-signal">workflow fluent</span>
              <span className="mini-signal">AI-built proof</span>
              <span className="mini-signal">founder-safe</span>
            </div>
          </div>
          <div className="floating-card bottom-0 right-8">
            <div className="flex items-center gap-2 text-amberSignal">
              <Star className="size-4 fill-current" />
              <span className="font-display text-lg font-bold">4.9</span>
            </div>
            <p className="mt-2 text-sm text-zinc-300">Founder rating across scoped AI builds</p>
          </div>
        </div>
      </div>

      <div className="reveal mx-auto mt-10 max-w-7xl border-y border-white/10 py-5">
        <div className="grid gap-3 text-center font-display text-lg font-bold text-white sm:grid-cols-4">
          <span>A coder is syntax-first.</span>
          <span className="text-cyanNeon">A vibe coder is experience-first.</span>
          <span>One starts with code.</span>
          <span className="text-ultraviolet">The other starts with the real problem.</span>
        </div>
      </div>
    </section>
  );
}

function SignatureCards() {
  const samples = builders.slice(0, 6);

  return (
    <section className="section-shell">
      <SectionHeader
        eyebrow="Signature builder cards"
        title="In real life, I am a..."
        text="The first marketplace where your profession is your superpower. Traditional platforms introduce builders by technical identity. Vibe Coder Marketplace introduces builders by real-world identity."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {samples.map((builder) => (
          <Link key={builder.id} to={`/profile/${builder.id}`} className="signature-card reveal">
            <div className="flex items-start justify-between gap-4">
              <Avatar builder={builder} />
              <Badge tone="violet">{builder.category}</Badge>
            </div>
            <p className="mt-8 font-display text-2xl font-bold leading-tight text-white">
              In real life, I am a <span className="gradient-text">{builder.profession.split('/')[0].trim()}</span>.
            </p>
            <p className="mt-3 text-lg leading-7 text-zinc-300">{builder.headline}</p>
            <div className="mt-6 flex items-center gap-2 text-sm text-cyanNeon">
              <span>View builder signal</span>
              <ArrowRight className="size-4" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section className="section-shell">
      <SectionHeader
        eyebrow="Featured categories"
        title="Browse by the world they understand"
        text="The old marketplace starts with a stack. This one starts with the profession, pressure, and workflow behind the build."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Link key={category.name} to={`/browse?category=${encodeURIComponent(category.category)}`} className="category-card reveal">
            <div className="icon-tile">
              <category.icon className="size-5" />
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-white">{category.name}</h3>
            <p className="mt-3 min-h-16 text-sm leading-6 text-zinc-400">{category.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm text-zinc-500">{category.count} builders</span>
              <span className="flex items-center gap-1 text-sm font-semibold text-cyanNeon">
                Explore <ChevronRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeaturedBuilders() {
  return (
    <section className="section-shell">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeader
          eyebrow="Featured builders"
          title="Experience-first profiles, not resumes"
          text="Every card shows what the builder understands before it shows what tools they use."
        />
        <Button to="/browse" variant="ghost" icon={Grid3X3} className="mb-10 w-fit">
          Browse all builders
        </Button>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {builders.slice(0, 8).map((builder) => (
          <BuilderCard key={builder.id} builder={builder} />
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section-shell">
      <SectionHeader
        eyebrow="How it works"
        title="Different builders for a different stage"
        text="Founders get closer to the problem. Builders turn lived context into software people actually need."
        align="center"
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <StepTrack title="For Founders" icon={Rocket} steps={founderSteps} />
        <StepTrack title="For Vibe Coders" icon={Sparkles} steps={builderSteps} />
      </div>
    </section>
  );
}

function StepTrack({ title, icon: Icon, steps }) {
  return (
    <div className="track-card reveal">
      <div className="mb-7 flex items-center gap-3">
        <div className="icon-tile">
          <Icon className="size-5" />
        </div>
        <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
      </div>
      <div className="grid gap-4">
        {steps.map(([heading, text], index) => (
          <div key={heading} className="step-row">
            <span className="step-number">{index + 1}</span>
            <span>
              <span className="block font-display text-base font-bold text-white">{heading}</span>
              <span className="mt-1 block text-sm leading-6 text-zinc-400">{text}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrustSection() {
  return (
    <section className="section-shell">
      <SectionHeader
        eyebrow="Trust layer"
        title="Proof for the new way software gets built"
        text="The marketplace makes context visible: what builders know, what they have shipped, and how founders keep ownership."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trustFeatures.map((feature) => (
          <div key={feature.title} className="feature-card reveal">
            <div className="icon-tile">
              <feature.icon className="size-5" />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-white">{feature.title}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="section-shell">
      <SectionHeader
        eyebrow="Built by vibe coders"
        title="Real-world software starts closer to the pain"
        text="Mocked projects that show the marketplace thesis in action across healthcare, farming, creator tools, food, trading, and legal intake."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.name} className="project-card reveal">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge tone="cyan">{project.domain}</Badge>
                <h3 className="mt-4 font-display text-2xl font-bold text-white">{project.name}</h3>
              </div>
              <Badge tone={project.status === 'Live' ? 'green' : project.status === 'In Progress' ? 'amber' : 'violet'}>
                {project.status}
              </Badge>
            </div>
            <p className="mt-4 text-sm leading-7 text-zinc-300">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="chip">
                  {tool}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-zinc-500">Builder: {project.builder}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section-shell">
      <SectionHeader
        eyebrow="Founder proof"
        title="Less translation. More useful software."
        text="The value is not just speed. It is the strange relief of being understood before the first feature list."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.author} className="testimonial-card reveal">
            <blockquote className="font-display text-xl font-bold leading-8 text-white">"{testimonial.quote}"</blockquote>
            <figcaption className="mt-6 text-sm text-cyanNeon">{testimonial.author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
