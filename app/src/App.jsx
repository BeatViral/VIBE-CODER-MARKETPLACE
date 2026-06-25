import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
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
import {
  builderSteps,
  builders,
  categories,
  comparisonCards,
  comparisonRows,
  examples,
  founderSteps,
  projects,
  testimonials,
  trustFeatures,
  vibeCoderSignals,
} from './data.js';

const heroImage = `${import.meta.env.BASE_URL}assets/hero-marketplace.png`;
const brandMark = `${import.meta.env.BASE_URL}favicon.svg`;

const navLinks = [
  ['Home', '/'],
  ['Browse Builders', '/browse'],
  ['VibeStudio', '/vibestudio'],
  ['Difference', '/difference'],
  ['Are You a Vibe Coder?', '/vibe-coder-if'],
  ['Manifesto', '/manifesto'],
  ['For Founders', '/founders'],
  ['For Builders', '/builders'],
];

const footerLinks = [
  ['About', '/'],
  ['Browse Builders', '/browse'],
  ['VibeStudio', '/vibestudio'],
  ['Difference', '/difference'],
  ['Manifesto', '/manifesto'],
  ['For Founders', '/founders'],
  ['For Builders', '/builders'],
  ['Categories', '/browse'],
  ['Contact', '/'],
  ['Terms', '/'],
  ['Privacy', '/'],
];

function useScrollReveal(refreshKey) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal'));

    if (!nodes.length) {
      return undefined;
    }

    const makeVisible = (node) => node.classList.add('is-visible');
    const fallbackTimer = window.setTimeout(() => {
      nodes.forEach(makeVisible);
    }, 450);

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(makeVisible);
      window.clearTimeout(fallbackTimer);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            makeVisible(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
    );

    nodes.forEach((node) => {
      if (!node.classList.contains('is-visible')) {
        observer.observe(node);
      }
    });

    window.requestAnimationFrame(() => {
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          makeVisible(node);
          observer.unobserve(node);
        }
      });
    });

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [refreshKey]);
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const browserHash = window.location.hash || '';
    const nestedHashStart = browserHash.indexOf('#', 1);
    const nestedHash = nestedHashStart >= 0 ? browserHash.slice(nestedHashStart) : '';
    const activeHash = location.hash || nestedHash;

    if (activeHash) {
      const target = document.getElementById(activeHash.slice(1));

      if (target) {
        window.requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.hash, location.pathname]);

  return null;
}

function App() {
  const location = useLocation();
  useScrollReveal(`${location.pathname}${location.search}${location.hash}`);

  return (
    <div className="min-h-screen overflow-hidden bg-void text-slate-100">
      <ScrollToTop />
      <SiteBackground />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/difference" element={<DifferencePage />} />
          <Route path="/vibestudio" element={<VibeStudioPage />} />
          <Route path="/vibe-coder-if" element={<VibeCoderIfPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/founders" element={<FoundersPage />} />
          <Route path="/builders" element={<BuildersPage />} />
          <Route path="/manifesto" element={<ManifestoPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-brand-radial" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:64px_64px] opacity-35" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyanNeon/50 to-transparent" />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-void/[.78] backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-[100rem] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <BrandMark />
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-bold text-white sm:text-base">
              Vibe Coder Marketplace
            </span>
            <span className="block truncate text-xs text-zinc-400">Experience beats syntax.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navLinks.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 min-[1700px]:flex">
          <Button to="/browse" variant="ghost" icon={Search}>
            Find a Vibe Coder
          </Button>
          <Button to="/builders" icon={Rocket}>
            Become a Vibe Coder
          </Button>
        </div>

        <button className="icon-button xl:hidden" type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu className="size-5" />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-void/[.96] px-4 py-5 backdrop-blur-xl xl:hidden">
          <div className="mx-auto max-w-lg">
            <div className="flex items-center justify-between">
              <LogoCompact />
              <button className="icon-button" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-8 grid gap-2">
              {navLinks.map(([label, to]) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => `mobile-link ${isActive ? 'mobile-link-active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
            </div>
            <div className="mt-8 grid gap-3">
              <Button to="/browse" icon={Search} onClick={() => setOpen(false)}>
                Find a Vibe Coder
              </Button>
              <Button to="/builders" variant="ghost" icon={Rocket} onClick={() => setOpen(false)}>
                Become a Vibe Coder
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function LogoCompact() {
  return (
    <div className="flex items-center gap-3">
      <BrandMark />
      <span>
        <span className="block font-display text-sm font-bold text-white">Vibe Coder Marketplace</span>
        <span className="block text-xs text-zinc-400">Experience beats syntax.</span>
      </span>
    </div>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img src={brandMark} alt="" />
    </span>
  );
}

function Button({ children, to, icon: Icon, variant = 'primary', className = '', onClick }) {
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

function Badge({ children, tone = 'violet', icon: Icon }) {
  return (
    <span className={`badge badge-${tone}`}>
      {Icon && <Icon className="size-3.5" />}
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={`reveal mb-10 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <div className="mb-4 text-xs font-bold uppercase text-cyanNeon">{eyebrow}</div>}
      <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-8 text-zinc-300 sm:text-lg">{text}</p>}
    </div>
  );
}

function HomePage() {
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
            We do not match you with generic coders. We match you with builders who understand your world.
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
              Vibe Coder Marketplace matches founders with people who know the workflow before the first feature list.
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

function DefinitionCallout({ compact = false }) {
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

function BuilderCard({ builder, saved, compared, onSave, onCompare, showCompare = false }) {
  return (
    <article className="builder-card reveal">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          <Avatar builder={builder} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-xl font-bold text-white">{builder.name}</h3>
              <Badge tone="green" icon={BadgeCheck}>
                AI-Native
              </Badge>
            </div>
            <p className="mt-2 text-sm text-zinc-400">In real life: {builder.profession}</p>
            <p className="mt-1 text-base font-semibold text-cyanNeon">{builder.headline}</p>
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

      <p className="mt-5 border-l-2 border-cyanNeon/60 pl-4 text-sm leading-6 text-zinc-300">"{builder.advantage}"</p>

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
        <Button to="/browse" variant="ghost" icon={Bookmark} className="sm:flex-1">
          Save Builder
        </Button>
      </div>
    </article>
  );
}

function Avatar({ builder }) {
  return (
    <div className="avatar" aria-hidden="true">
      <span>{builder.initials}</span>
    </div>
  );
}

function InfoBlock({ title, items }) {
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

function Metric({ icon: Icon, value, label }) {
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

function CtaBand() {
  return (
    <section className="section-shell pb-24">
      <div className="cta-band reveal">
        <Badge tone="coral" icon={Sparkles}>
          Experience beats syntax
        </Badge>
        <h2 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
          Your experience is your code.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
          Stop waiting for a developer to understand your world. You already know the problem. AI can help with the
          code. That is enough to start.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/builders" icon={Rocket}>
            Join as a Vibe Coder
          </Button>
          <Button to="/founders" variant="ghost" icon={MessageCircle}>
            Post Your Idea
          </Button>
        </div>
      </div>
    </section>
  );
}

function BrowsePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');
  const [tool, setTool] = useState('');
  const [availability, setAvailability] = useState('All');
  const [minimumRating, setMinimumRating] = useState('All');
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
      return categoryMatch && queryMatch && toolMatch && availabilityMatch && ratingMatch;
    });
  }, [activeCategory, availability, minimumRating, query, tool]);

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

        <div className="reveal mt-10 grid gap-4 rounded-lg border border-white/10 bg-white/[.045] p-4 backdrop-blur-xl lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <Field icon={Search} label="Search by profession, industry, or build">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Doctor, trading dashboard, kitchen..." />
          </Field>
          <Field icon={Code2} label="AI tools">
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

function Field({ icon: Icon, label, children }) {
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

function DifferencePage() {
  return (
    <section className="page-shell">
      <div className="mx-auto max-w-7xl">
        <PageHero
          badge="Contrarian thesis"
          title="Difference Between Coder and Vibe Coder"
          text="A coder is syntax-first. A vibe coder is experience-first. A vibe coder uses lived experience and AI to build anything they imagine."
        />
        <DefinitionCallout compact />

        <div className="reveal mt-12 grid gap-5 lg:grid-cols-2">
          <ManifestoPanel
            icon={Code2}
            title="A coder starts with"
            items={['Code', 'Frameworks', 'Architecture', 'Best practices', 'Technical structure']}
          />
          <ManifestoPanel
            icon={Workflow}
            title="A vibe coder starts with"
            items={['Lived experience', 'Pain', 'Workflow', 'Instinct', 'The real-world problem']}
          />
        </div>

        <div className="reveal my-14 border-y border-white/10 py-10 text-center">
          <p className="font-display text-4xl font-bold text-white sm:text-6xl">Experience beats syntax.</p>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
            Founders do not only need someone who can code. They need someone who understands why the thing matters.
          </p>
        </div>

        <div className="reveal overflow-hidden rounded-lg border border-white/10">
          <div className="grid grid-cols-2 bg-white/[.06]">
            <div className="border-r border-white/10 p-5 font-display text-xl font-bold text-white">Traditional Coder</div>
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
          text="The old marketplace sells technical labor. This marketplace sells lived context."
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

function VibeCoderIfPage() {
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

function ProfilePage() {
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

function FoundersPage() {
  return (
    <section className="page-shell">
      <div className="mx-auto max-w-7xl">
        <PageHero
          badge="For founders"
          title="Find a builder who already understands your world."
          text="You should not have to spend hours translating your industry to someone who only knows frameworks. Discover experience-first AI builders who understand the workflow, bottlenecks, pressure, customers, and friction before they build."
        />
        <WorkflowGrid
          items={[
            ['Post your idea', 'Describe the problem, the customer, and the domain pressure.'],
            ['Browse experience-first builders', 'Search by profession, industry, AI tools, proof, and availability.'],
            ['Match by real-life profession', 'Find people who have lived the workflow you are building for.'],
            ['Start a scoped MVP', 'Turn the idea into a sharp first version with visible milestones.'],
            ['Keep ownership and clarity', 'Founder-owned repo, assets, handover docs, and build history.'],
            ['Launch faster', 'Ship the useful proof before the market moment passes.'],
          ]}
        />
        <div className="mt-14">
          <CtaBand />
        </div>
      </div>
    </section>
  );
}

function BuildersPage() {
  return (
    <section className="page-shell">
      <div className="mx-auto max-w-7xl">
        <PageHero
          badge="For builders"
          title="Your real-life experience is now a software-building superpower."
          text="You do not need to be a traditional coder to become a builder. If you have lived experience and can use AI to build anything you imagine, you belong here."
        />
        <DefinitionCallout compact />
        <WorkflowGrid
          items={[
            ['Create your builder card', 'Lead with your real-life identity and the software you can build with AI.'],
            ['Show your real-life profession', 'Make your profession the signal founders understand instantly.'],
            ['Prove what you understand', 'Show the workflow, pain, pressure, and customers you know firsthand.'],
            ['Add AI-built demos', 'Upload prototypes, demos, tools used, and build logs.'],
            ['Get verified', 'Earn real-life, AI build, and founder-safe proof badges.'],
            ['Get discovered by founders', 'Turn lived experience into scoped software projects.'],
          ]}
        />
        <div className="mt-14">
          <CtaBand />
        </div>
      </div>
    </section>
  );
}

function VibeStudioPage() {
  const translations = [
    ['Routes', 'Pages'],
    ['Database schema', 'Saved information'],
    ['APIs', 'Outside services'],
    ['Environment variables', 'Secret keys'],
    ['Commits', 'What changed'],
    ['Dependency risk', 'What might break'],
    ['QA pipeline', 'Check before launch'],
    ['Technical documentation', 'Owner Manual'],
    ['Deployment logs', 'Launch status'],
    ['Pull request', 'Proposed change'],
    ['Rollback', 'Go back to last safe version'],
    ['Repository', 'App source folder'],
  ];

  const modes = [
    {
      name: 'Life Map',
      text:
        'VibeStudio begins with who you are in real life and what problem you understand. Instead of starting with code, it asks what you have lived, what workflow breaks, who suffers, and what a generic coder would miss.',
      phrase: 'Start with lived context, not files.',
      fields: [
        'In real life, I am a...',
        'The problem I understand is...',
        'The workflow that breaks is...',
        'The user suffering from this is...',
        'The current workaround is...',
        'What a generic coder would miss is...',
      ],
    },
    {
      name: 'Workflow Map',
      text:
        'Turn lived experience into a clear product map. VibeStudio identifies users, pain points, decision points, bottlenecks, screens, saved information, risks, and the first useful version.',
      phrase: 'Do not build everything. Build the first useful version.',
      fields: ['Users', 'Pain points', 'Bottlenecks', 'Screens', 'Risks', 'First useful version'],
    },
    {
      name: 'Build Studio',
      text:
        'Generate screens, app logic, data structure, build prompts, and implementation plans in plain English. VibeStudio can create Codex, Replit, and Lovable-ready prompts before it becomes a full build engine.',
      phrase: 'From real-world knowledge to build-ready instructions.',
      fields: ['Screens', 'App logic', 'Saved information', 'Build prompts', 'Implementation plan'],
    },
    {
      name: 'Owner Mode',
      text:
        'Owner Mode explains what your app is made of, what services it uses, what costs money, what can break, what not to touch, and how to update safely.',
      phrase: 'Know what you own. Know how to keep it alive.',
      fields: ['App health', 'Services', 'Costs', 'Risks', 'Safe updates', 'What not to touch'],
    },
    {
      name: 'Handover Pack',
      text:
        'Every project gets an exportable handover package that makes the app understandable to the founder, the builder, or any future developer.',
      phrase: 'A clean bridge from build to long-term ownership.',
      fields: ['App summary', 'Service list', 'Secret keys checklist', 'Testing checklist', 'Maintenance plan'],
    },
    {
      name: 'VibeGuide',
      label: (
        <>
          VibeGuide<sup>&trade;</sup>
        </>
      ),
      text:
        'A dedicated help conversation that remembers what you asked, learns where you get stuck, and teaches you through your actual app.',
      phrase: 'Help that learns how you learn.',
      fields: ['Past questions', 'Stuck points', 'Confidence gaps', 'Next lesson', 'Safe help', 'Your own app'],
    },
  ];

  const ownerManual = [
    'What this app does',
    'Who uses it',
    'What pages it has',
    'What information it saves',
    'What outside services it uses',
    'What secret keys are needed',
    'What it costs to run',
    'What can break',
    'What not to touch',
    'How to test it',
    'How to update it safely',
    'How to hand it to another builder',
  ];

  const expertCards = [
    ['Doctors', 'clinical tools'],
    ['Farmers', 'ag-tech'],
    ['Producers', 'creator tools'],
    ['Chefs', 'kitchen systems'],
    ['Traders', 'dashboards'],
    ['Paralegals', 'legal intake'],
    ['Teachers', 'learning tools'],
    ['Operators', 'workflow tools'],
  ];

  const helpMemory = [
    ['Saved information', '12 times', 'Still learning', '2 days ago'],
    ['Secret keys', '7 times', 'Needs caution', '5 days ago'],
    ['Pages and layout', '3 times', 'Comfortable', '3 weeks ago'],
    ['Payments', '9 times', 'Risk area', 'Yesterday'],
    ['Launching', '5 times', 'Improving', '1 week ago'],
  ];

  const confidenceMap = [
    ['You are confident with', ['Pages', 'Text changes', 'Basic layout edits', 'Simple forms']],
    ['You are still learning', ['Saved information', 'Secret keys', 'Payments', 'Launch settings']],
    ['You often ask about', ['Where data is stored', 'What can break', 'How to test changes', 'What is safe to touch']],
    ['You have improved in', ['Understanding pages', 'Launching small updates', 'Using safe prompts', 'Reading change summaries']],
  ];

  const appTeachingPairs = [
    [
      'A database stores structured data.',
      'In your app, saved information means your builder profiles, project notes, saved prompts, and owner manual entries. They live in Supabase.',
    ],
    [
      'An API connects services.',
      'In your app, outside services means Stripe for payments, Resend for email, and Supabase for login and saved information.',
    ],
    [
      'Run tests before deployment.',
      'Before launching this change, test sign-up, the builder filter, saved projects, and the Owner Manual export.',
    ],
  ];

  return (
    <section className="relative z-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:px-8 lg:py-20">
        <div className="reveal">
          <Badge tone="amber" icon={Sparkles}>
            Second product
          </Badge>
          <h1 className="mt-6 font-display text-6xl font-bold leading-tight text-white sm:text-8xl">VibeStudio</h1>
          <p className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            Build it. Ship it. <span className="gradient-text">Own it. Forever.</span>
          </p>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-zinc-200">
            The no-jargon build environment for domain experts.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            VibeStudio is where domain experts build real apps without code, without developer dependency, and without
            being abandoned after launch.
          </p>
          <div className="mt-6 max-w-2xl rounded-lg border border-cyanNeon/20 bg-cyanNeon/10 p-5 text-sm leading-7 text-zinc-200">
            Most AI tools help you create software. VibeStudio helps you understand, maintain, update, hand over, and
            own it.
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button to="/vibestudio" icon={Rocket}>
              Explore VibeStudio
            </Button>
            <Button to="/vibestudio#vibeguide" variant="ghost" icon={MessageCircle}>
              Meet VibeGuide
            </Button>
            <Button to="/builders" variant="ghost" icon={Sparkles}>
              Join the Waitlist
            </Button>
            <Button to="/vibestudio#how-it-works" variant="ghost" icon={Workflow}>
              See How It Works
            </Button>
          </div>
        </div>
        <VibeStudioWorkspaceMock />
      </div>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Why VibeStudio exists"
          title="Coding has evolved into language. But most coding tools still speak like coding tools."
          text="AI has changed how software gets built. A person can describe an app in plain language and AI can help generate the code, but most tools still drop non-coders back into files, errors, dependencies, frameworks, terminals, APIs, commits, environment variables, deployment settings, and build logs."
        />
        <div className="grid gap-5 lg:grid-cols-[1fr_.72fr]">
          <div className="feature-card reveal">
            <p className="text-lg leading-9 text-zinc-300">
              For non-coders, that is where the fear begins. VibeStudio is built for people who know the problem, not
              the jargon. It does not just let you talk to AI. It makes the entire build environment understandable.
            </p>
            <p className="mt-6 text-lg leading-9 text-zinc-300">
              Because if the future of coding is language, the future of the IDE must be plain English.
            </p>
          </div>
          <div className="pull-quote reveal">
            Coding has evolved into language. Now the environment has to evolve too.
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="No-jargon environment"
          title="No jargon. No mystery code. No abandoned app."
          text="VibeStudio does not hide complexity. It translates it. You still get serious software, but the environment speaks in words a real owner can understand."
        />
        <div className="translation-grid reveal">
          {translations.map(([technical, plain]) => (
            <div key={technical} className="translation-row">
              <span>{technical}</span>
              <ArrowRight className="size-4 text-cyanNeon" />
              <strong>{plain}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Different from AI IDEs"
          title="Most tools help you build. VibeStudio helps you own."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <ComparisonList
            title="Other AI coding tools"
            muted
            items={[
              'Help you generate an app',
              'Focus on code, files, previews, and deployment',
              'Assume you can interpret technical errors',
              'Often stop at launch',
              'Leave maintenance unclear',
              'Make ownership feel fragile',
            ]}
          />
          <ComparisonList
            title="VibeStudio"
            items={[
              'Starts with your lived experience',
              'Builds from real-world workflows',
              'Explains every part in plain English',
              'Creates an Owner Manual automatically',
              'Shows what can break and how to maintain it',
              'Creates handover packs and safe update flows',
            ]}
          />
        </div>
        <div className="reveal mt-8 rounded-lg border border-amberSignal/25 bg-amberSignal/10 p-6 text-center font-display text-3xl font-bold text-white">
          Build is only half the product. Ownership is the other half.
        </div>
      </section>

      <section id="how-it-works" className="section-shell">
        <SectionHeader
          eyebrow="Six modes"
          title="The six modes of VibeStudio"
          text="Each mode turns lived experience into an understandable product, then keeps the owner in control after launch."
        />
        <div className="grid gap-5">
          {modes.map((mode, index) => (
            <article key={mode.name} className="studio-mode-card reveal">
              <div>
                <span className="number-mark">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 font-display text-3xl font-bold text-white">{mode.label || mode.name}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{mode.text}</p>
                <p className="mt-5 border-l-2 border-cyanNeon/70 pl-4 text-sm font-bold leading-6 text-cyanNeon">
                  {mode.phrase}
                </p>
              </div>
              <div className="studio-fields">
                {mode.fields.map((field) => (
                  <span key={field}>{field}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="owner-mode" className="section-shell">
        <SectionHeader
          eyebrow="Owner Mode"
          title="Owner Mode is the missing layer every AI IDE forgot."
          text="Most AI coding tools behave like: Here is your app. Good luck. That is not enough for non-coders. The bigger fear is what happens after it is built."
        />
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="feature-card reveal">
            {[
              'Who updates it?',
              'What breaks if something changes?',
              'What does it cost to run?',
              'Where is the data?',
              'What services does it depend on?',
              'What should never be touched?',
              'How do you ask AI to change it safely?',
            ].map((question) => (
              <div key={question} className="question-row">
                <MessageCircle className="size-4 text-cyanNeon" />
                <span>{question}</span>
              </div>
            ))}
          </div>
          <OwnerModeDashboard />
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Safe Update Flow"
          title="Update without breaking everything."
          text="For non-coders, changing an app after launch can feel dangerous. VibeStudio plans, explains, tests, and makes every change reversible."
        />
        <div className="safe-flow reveal">
          {[
            'Describe the change in plain English',
            'Identify affected pages, saved information, and outside services',
            'Explain what might break',
            'Create a safe checkpoint',
            'Apply the change',
            'Run the plain-English test checklist',
            'Launch or go back to the last safe version',
          ].map((step, index) => (
            <div key={step} className="safe-step">
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
        <div className="prompt-card reveal">
          <p className="text-xs font-bold uppercase text-amberSignal">Generated safe prompt</p>
          <p className="mt-3 text-base leading-8 text-zinc-200">
            "I want to add a new booking field. First inspect the current app structure, identify affected pages and
            saved information, explain the plan in plain English, then wait for approval before editing."
          </p>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Owner Manual"
          title="Every app gets an Owner Manual."
          text="This is not technical documentation written for engineers. It is a plain-English guide that helps the owner understand the product, maintain it, update it, and hand it over safely."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
          <div className="owner-manual reveal">
            <div className="manual-toolbar">
              <span>Owner Manual</span>
              <Badge tone="green" icon={CheckCircle2}>
                Living doc
              </Badge>
            </div>
            <h3>KitchenDrop owner guide</h3>
            <p>Plain-English product map, service list, risks, tests, and safe future prompts.</p>
            <div className="manual-lines">
              {ownerManual.slice(0, 8).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            {ownerManual.map((item) => (
              <div key={item} className="manual-section-chip reveal">
                <CheckCircle2 className="size-4 text-acid" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vibeguide" className="section-shell">
        <div className="vibeguide-shell reveal">
          <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
            <div>
              <Badge tone="amber" icon={MessageCircle}>
                Special feature
              </Badge>
              <h2 className="mt-6 font-display text-5xl font-bold leading-tight text-white sm:text-7xl">
                VibeGuide<sup className="ml-1 text-2xl text-amberSignal sm:text-3xl">&trade;</sup>
              </h2>
              <p className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
                Help that learns how you learn.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                Old help systems answer questions. VibeGuide learns the person asking them.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
                It is a dedicated help conversation inside VibeStudio that understands your app, your project stage,
                your past questions, your repeated stuck points, your skill level, and what you are trying to do next.
              </p>
              <div className="mt-7 rounded-lg border border-cyanNeon/25 bg-cyanNeon/10 p-5 font-display text-2xl font-bold text-white shadow-cyan">
                Help should not be a manual. Help should be a memory.
              </div>
            </div>
            <VibeGuideInterface />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Two conversations"
          title="Two conversations. Two different jobs."
          text="Building and understanding should not be trapped in the same chat."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <ConversationPanel
            title="Build Conversation"
            description="This is where the user talks to AI to create or change the app."
            items={[
              'Add a booking page',
              'Change the dashboard',
              'Create a customer form',
              'Generate the Owner Manual',
              'Prepare a Codex prompt',
              'Build the next feature',
            ]}
          />
          <ConversationPanel
            title="Help Conversation"
            highlight
            description="This is where the user learns, understands, and gets unstuck."
            items={[
              'Explain this like I am not technical',
              'Why did this break?',
              'Have I asked this before?',
              'What do I keep getting stuck on?',
              'Am I safe to change this?',
              'I am scared to touch this',
            ]}
          />
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Help Memory"
          title="VibeGuide remembers what confused you, so it can help you grow."
          text="Most tools treat every help question like a one-off. VibeGuide keeps a running memory of the user's learning journey."
        />
        <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <HelpMemoryDashboard items={helpMemory} />
          <div className="grid gap-4">
            {[
              'Repeated questions',
              'Topic frequency',
              'Last asked date',
              'Unresolved confusion',
              'Confidence level',
              'Project area affected',
              'Explanations that helped',
              'Topics the user stopped asking about',
            ].map((item) => (
              <div key={item} className="memory-chip reveal">
                <Bookmark className="size-4 text-amberSignal" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Builder Confidence Map"
          title="Your Builder Confidence Map"
          text="VibeGuide turns your behaviour into a private confidence map. It shows what you are comfortable with, what still needs guidance, and what to learn next."
        />
        <ConfidenceMapPanel sections={confidenceMap} />
        <div className="reveal mt-6 rounded-lg border border-cyanNeon/25 bg-cyanNeon/10 p-6">
          <p className="text-xs font-bold uppercase text-cyanNeon">Recommended next lesson</p>
          <p className="mt-2 font-display text-3xl font-bold text-white">How your app remembers information</p>
          <p className="mt-4 text-base leading-7 text-zinc-300">VibeStudio learns the builder, not just the codebase.</p>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Warm memory"
          title='"You asked this before."'
          text="When a question repeats, VibeGuide gently connects it to a previous explanation without making the owner feel stupid."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            'You asked a similar question last week when we connected Stripe. This is the same idea: secret keys are private passwords that let your app talk to outside services. This time, the key is for email instead of payments.',
            "You used to ask what deployment meant. You have launched three updates since then, so I will keep this short: this change is ready to publish, but test login first.",
          ].map((bubble) => (
            <div key={bubble} className="guide-bubble reveal">
              <MessageCircle className="size-5 text-cyanNeon" />
              <p>{bubble}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Teach me from my own app"
          title="Generic lessons are not enough."
          text="VibeGuide does not teach generic software lessons. It explains concepts using the user's actual project."
        />
        <div className="grid gap-5">
          {appTeachingPairs.map(([generic, guide]) => (
            <div key={generic} className="app-teaching-row reveal">
              <div>
                <span>Generic help says</span>
                <p>{generic}</p>
              </div>
              <ArrowRight className="size-5 text-cyanNeon" />
              <div>
                <span>VibeGuide says</span>
                <p>{guide}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Change memory"
          title="Explain what changed since I last understood it"
          text="As apps evolve, non-coders lose confidence because they no longer know what changed. VibeGuide can summarise changes in plain English."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            'Since your last owner review, we added the builder filter, changed the profile cards, created the VibeStudio page, and updated the navigation. No payment, login, or saved information logic was changed.',
            'This update changed checkout and order confirmation. Test payments, customer emails, and the admin order view before launch.',
          ].map((item) => (
            <div key={item} className="change-summary-card reveal">
              <GitCompare className="size-5 text-amberSignal" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="fear-button-panel reveal">
          <div>
            <Badge tone="coral" icon={ShieldCheck}>
              Safety button
            </Badge>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
              "I am scared to touch this."
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
              This is an actual help button inside VibeStudio. VibeGuide explains what the thing is, why it matters,
              whether it is safe to change, what could break, what to test after, and whether to ask a builder for help.
            </p>
          </div>
          <div className="fear-response">
            <p className="text-xs font-bold uppercase text-coral">VibeGuide response</p>
            <p>
              This touches payments, so we should slow down. I recommend creating a safe checkpoint first. After the
              change, test checkout, order confirmation, and admin payment status. Nothing should be launched until
              those pass.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Human learning moat"
          title="Help that knows the app and the person"
          text="Most AI tools focus on the codebase. VibeGuide focuses on the app, the owner, the owner's understanding, the project stage, repeated questions, and confidence gaps."
        />
        <div className="reveal rounded-lg border border-amberSignal/30 bg-amberSignal/10 p-7 text-center shadow-coral">
          <p className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            Every app can add AI chat. Very few help systems learn the human building it.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="cta-band reveal">
          <Badge tone="amber" icon={Sparkles}>
            VibeGuide<sup>&trade;</sup>
          </Badge>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
            Help that does not just answer you. It learns you.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
            VibeGuide is the dedicated help conversation for non-coders who want to understand, maintain, and own what
            they build.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/vibestudio#owner-mode" icon={ShieldCheck}>
              Explore Owner Mode
            </Button>
            <Button to="/builders" variant="ghost" icon={Sparkles}>
              Join the VibeStudio Waitlist
            </Button>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Built for domain experts"
          title="Built for people who know the problem, not the jargon."
          text="VibeStudio does not ask you to think like a developer. It asks you to think like the person who has lived the problem."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {expertCards.map(([who, what]) => (
            <div key={who} className="expert-card reveal">
              <Sparkles className="size-5 text-amberSignal" />
              <h3>{who}</h3>
              <p>building {what}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Ecosystem"
          title="Marketplace finds the builder. VibeStudio keeps the build alive."
          text="Together, Vibe Coder Marketplace and VibeStudio create a new ecosystem: find the right builder, build from real-world experience, ship the first useful version, understand what was built, maintain it safely, and own it forever."
        />
        <div className="ecosystem-flow reveal">
          {['Vibe Coder Marketplace', 'VibeStudio', 'Owner Mode', 'VibeGuide', 'Handover Pack', 'Long-term ownership'].map((item, index) => (
            <div key={item} className="ecosystem-node">
              <span>{index + 1}</span>
              <p>
                {item === 'VibeGuide' ? (
                  <>
                    VibeGuide<sup>&trade;</sup>
                  </>
                ) : (
                  item
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionHeader
          eyebrow="Defensibility"
          title="The moat is not only code generation. The moat is ownership and learning memory."
          text="VibeStudio does not just understand the app. It understands the owner's relationship with the app: what they asked before, where they keep getting stuck, what they have learned, and what they need explained next."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <ComparisonList
            title="Before the code"
            items={[
              'Extracts the real-world problem from lived experience',
              'Maps workflows before screens',
              'Asks what a generic coder would miss',
              'Identifies the first useful version',
            ]}
          />
          <ComparisonList
            title="After the code"
            items={[
              'Explains the app in plain English',
              'Creates the Owner Manual',
              'Tracks what can break',
              'Guides safe updates',
              'Creates handover packs',
              'Helps non-coders keep control',
              'Learns where the owner needs help next',
            ]}
          />
        </div>
        <div className="reveal mt-8 rounded-lg border border-cyanNeon/25 bg-cyanNeon/10 p-7 text-center">
          <p className="font-display text-4xl font-bold text-white">Build + Explain + Maintain + Handover.</p>
          <p className="mt-4 text-xl font-bold text-cyanNeon">Current tools generate software. VibeStudio creates software owners.</p>
          <p className="mt-3 text-lg font-bold text-amberSignal">VibeGuide helps those owners grow.</p>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="cta-band reveal">
          <Badge tone="amber" icon={Rocket}>
            VibeStudio
          </Badge>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
            Build it. Ship it. Own it. Forever.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
            VibeStudio is the no-jargon build environment for domain experts who want to turn real-world experience into
            software and keep control after launch.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/builders" icon={Sparkles}>
              Join the VibeStudio Waitlist
            </Button>
            <Button to="/" variant="ghost" icon={Search}>
              Explore Vibe Coder Marketplace
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}

function VibeStudioWorkspaceMock() {
  const tabs = ['Life Map', 'Workflow Map', 'Build Studio', 'Owner Mode', 'Handover Pack', 'VibeGuide'];
  return (
    <div className="studio-mock reveal">
      <div className="studio-topbar">
        <span className="studio-dot bg-coral" />
        <span className="studio-dot bg-amberSignal" />
        <span className="studio-dot bg-acid" />
        <strong>VibeStudio workspace</strong>
      </div>
      <div className="studio-tabs">
        {tabs.map((tab, index) => (
          <span key={tab} className={index === 5 ? 'studio-tab-active' : ''}>
            {tab === 'VibeGuide' ? (
              <>
                VibeGuide<sup>&trade;</sup>
              </>
            ) : (
              tab
            )}
          </span>
        ))}
      </div>
      <div className="studio-body">
        <div className="studio-sidebar">
          {['App summary', 'Pages', 'Saved information', 'Outside services', 'Secret keys', 'Safe updates'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="studio-main-panel">
          <Badge tone="cyan" icon={ShieldCheck}>
            VibeGuide<sup>&trade;</sup>
          </Badge>
          <h3>Help that learns how you learn.</h3>
          <div className="studio-health-grid">
            {[
              ['Repeated topic', 'Saved information'],
              ['Asked', '12 times'],
              ['Confidence', 'Still learning'],
              ['Next lesson', 'How data is saved'],
              ['Safe step', 'Create checkpoint'],
              ['Tone', 'Warm and plain'],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VibeGuideInterface() {
  return (
    <div className="vibeguide-interface">
      <div className="guide-window guide-window-build">
        <div className="guide-window-head">
          <Code2 className="size-4 text-ultraviolet" />
          <span>Build Conversation</span>
        </div>
        {['Add a booking page.', 'Create the customer form.', 'Generate the handover pack.'].map((item) => (
          <div key={item} className="guide-chat-line">
            {item}
          </div>
        ))}
      </div>
      <div className="guide-window guide-window-help">
        <div className="guide-window-head">
          <MessageCircle className="size-4 text-cyanNeon" />
          <span>
            VibeGuide<sup>&trade;</sup> Help Conversation
          </span>
        </div>
        {[
          'You have asked about saved information 12 times.',
          'This change touches data storage.',
          'Want me to explain it using your app?',
          'Recommended next safe step: create a checkpoint.',
        ].map((item) => (
          <div key={item} className="guide-chat-line guide-chat-line-active">
            {item}
          </div>
        ))}
      </div>
      <div className="guide-mini-grid">
        {['Stuck Points', 'Learning Trail', 'Confidence Map', 'Next Safe Step'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function ConversationPanel({ title, description, items, highlight = false }) {
  return (
    <article className={`conversation-panel reveal ${highlight ? 'conversation-panel-highlight' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase text-cyanNeon">{highlight ? 'Help space' : 'Build space'}</p>
          <h3>{title}</h3>
        </div>
        {highlight ? <MessageCircle className="size-5 text-cyanNeon" /> : <Code2 className="size-5 text-ultraviolet" />}
      </div>
      <p>{description}</p>
      <div className="conversation-examples">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
}

function HelpMemoryDashboard({ items }) {
  return (
    <div className="help-memory-dashboard reveal">
      <div className="manual-toolbar">
        <span>Help Memory</span>
        <Badge tone="cyan" icon={Bookmark}>
          Learning profile
        </Badge>
      </div>
      <div className="memory-table">
        <div className="memory-table-head">
          <span>Topic</span>
          <span>Asked</span>
          <span>Confidence</span>
          <span>Last asked</span>
        </div>
        {items.map(([topic, asked, confidence, lastAsked]) => (
          <div key={topic} className="memory-table-row">
            <strong>{topic}</strong>
            <span>{asked}</span>
            <span>{confidence}</span>
            <span>{lastAsked}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfidenceMapPanel({ sections }) {
  return (
    <div className="confidence-map-panel reveal">
      {sections.map(([title, items]) => (
        <article key={title} className="confidence-map-card">
          <h3>{title}</h3>
          <div>
            {items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function ComparisonList({ title, items, muted = false }) {
  return (
    <div className={`comparison-list reveal ${muted ? 'comparison-list-muted' : ''}`}>
      <h3>{title}</h3>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="comparison-list-row">
            <CheckCircle2 className={`size-4 ${muted ? 'text-zinc-500' : 'text-acid'}`} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OwnerModeDashboard() {
  const health = [
    ['Last deploy', '2 days ago'],
    ['Services', '5 connected'],
    ['Secret keys', 'All active'],
    ['Saved information', '68% free tier used'],
    ['Login', 'Working'],
    ['Payments', 'Needs test'],
    ['Mobile layout', 'Passed'],
    ['Known risk', 'Payment webhook not verified'],
  ];

  return (
    <div className="owner-dashboard reveal">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase text-cyanNeon">App Health</p>
          <h3 className="mt-2 font-display text-3xl font-bold text-white">KitchenDrop</h3>
        </div>
        <Badge tone="green" icon={CheckCircle2}>
          Stable
        </Badge>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {health.map(([label, value]) => (
          <div key={label} className="owner-health-card">
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-amberSignal/25 bg-amberSignal/10 p-4">
        <p className="text-xs font-bold uppercase text-amberSignal">Next maintenance task</p>
        <p className="mt-2 text-sm leading-6 text-zinc-200">Run payment test before the next public launch.</p>
      </div>
    </div>
  );
}

function WorkflowGrid({ items }) {
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

function ManifestoPage() {
  const lines = [
    ['Coders are syntax-first.', 'Vibe coders are experience-first.'],
    ['AI made syntax cheap.', 'Experience became the new moat.'],
    ['A vibe coder has lived experience.', 'They use AI to build anything they imagine.'],
    ['Your industry is your advantage.', 'Not your prison.'],
    ['A coder knows how to build.', 'A vibe coder knows why it needs to be built.'],
    ['A coder builds apps.', 'A vibe coder builds solutions.'],
    ['A coder builds from code.', 'A vibe coder builds from life.'],
  ];

  return (
    <section className="page-shell">
      <div className="mx-auto max-w-6xl">
        <PageHero
          badge="Manifesto"
          title="The Vibe Coder Manifesto"
          text="Before AI, software belonged mainly to people who could write syntax. After AI, software also belongs to people who understand problems."
          center
        />
        <div className="mt-12 grid gap-5">
          {lines.map(([coder, vibe]) => (
            <div key={coder} className="manifesto-line reveal">
              <p className="text-zinc-500">{coder}</p>
              <p className="gradient-text">{vibe}</p>
            </div>
          ))}
        </div>
        <div className="reveal mt-14 border-y border-white/10 py-12 text-center">
          <p className="mx-auto max-w-4xl text-xl leading-9 text-zinc-300">
            The future of software will not only be built by coders. It will be built by doctors, farmers, musicians,
            chefs, teachers, traders, nurses, mechanics, operators, paralegals, therapists, retailers, and founders who
            know the pain and use AI to make the solution real.
          </p>
          <p className="mt-8 font-display text-5xl font-bold text-white">Experience beats syntax.</p>
        </div>
      </div>
    </section>
  );
}

function PageHero({ badge, title, text, center = false }) {
  return (
    <div className={`reveal ${center ? 'mx-auto text-center' : ''} max-w-5xl`}>
      <Badge tone="cyan" icon={Sparkles}>
        {badge}
      </Badge>
      <h1 className="mt-6 font-display text-5xl font-bold leading-tight text-white sm:text-7xl">{title}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">{text}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <LogoCompact />
          <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-400">
            The marketplace for experience-first AI builders. Experience beats syntax.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {footerLinks.map(([label, to]) => (
            <Link key={label} to={to} className="text-sm text-zinc-400 transition hover:text-cyanNeon">
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-zinc-500 sm:flex-row">
        <span>Coders build from code. Vibe coders build from life.</span>
        <span className="flex gap-4">
          <a href="https://github.com/BeatViral/VIBE-CODER-MARKETPLACE" className="hover:text-cyanNeon">
            GitHub
          </a>
          <a href="mailto:hello@vibecoder.market" className="hover:text-cyanNeon">
            Email
          </a>
        </span>
      </div>
    </footer>
  );
}

export default App;
