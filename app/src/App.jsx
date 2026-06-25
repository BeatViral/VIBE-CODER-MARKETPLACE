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
  ['Difference', '/difference'],
  ['Are You a Vibe Coder?', '/vibe-coder-if'],
  ['Manifesto', '/manifesto'],
  ['For Founders', '/founders'],
  ['For Builders', '/builders'],
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

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
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

        <div className="hidden items-center gap-3 lg:flex">
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
            turn lived experience into working software.
          </p>
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
          text="A coder is syntax-first. A vibe coder is experience-first. One builds from the keyboard. The other builds from life."
        />

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
          text="You build from intuition, lived experience, and the pressure of a problem you know firsthand."
        />
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
          text="You do not need to be a traditional coder to become a builder. If you understand a real-world problem deeply and can use AI to create useful software, you belong here."
        />
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
          {['About', 'Browse Builders', 'Difference', 'Manifesto', 'For Founders', 'For Builders', 'Categories', 'Contact', 'Terms', 'Privacy'].map((link) => (
            <Link key={link} to={link === 'Browse Builders' ? '/browse' : link === 'Difference' ? '/difference' : link === 'Manifesto' ? '/manifesto' : link === 'For Founders' ? '/founders' : link === 'For Builders' ? '/builders' : '/'} className="text-sm text-zinc-400 transition hover:text-cyanNeon">
              {link}
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
