import {
  Activity,
  BadgeCheck,
  Brain,
  BriefcaseBusiness,
  ChefHat,
  CircleDollarSign,
  ClipboardCheck,
  GraduationCap,
  HeartPulse,
  Home,
  Music2,
  Scale,
  ShieldCheck,
  Store,
  Tractor,
  TrendingUp,
  Truck,
  UserRoundCheck,
  Utensils,
  Wrench,
} from 'lucide-react';

export const categories = [
  {
    name: 'Doctors building health tools',
    category: 'Health',
    icon: HeartPulse,
    count: 312,
    description: 'Clinical workflow, triage, patient intake, care coordination.',
  },
  {
    name: 'Teachers building education tools',
    category: 'Education',
    icon: GraduationCap,
    count: 214,
    description: 'Lessons, assessments, feedback loops, tutoring systems.',
  },
  {
    name: 'Farmers building agriculture tools',
    category: 'Agriculture',
    icon: Tractor,
    count: 148,
    description: 'Field operations, equipment logs, crop planning, harvest timing.',
  },
  {
    name: 'Musicians building creator tools',
    category: 'Music',
    icon: Music2,
    count: 186,
    description: 'Catalogs, royalties, DAW helpers, release workflows.',
  },
  {
    name: 'Chefs building kitchen systems',
    category: 'Food',
    icon: ChefHat,
    count: 132,
    description: 'Prep planning, stock, ordering, kitchen communication.',
  },
  {
    name: 'Legal teams building intake tools',
    category: 'Legal',
    icon: Scale,
    count: 121,
    description: 'Qualified intake, call scoring, document routing, CRM handoff.',
  },
  {
    name: 'Traders building market dashboards',
    category: 'Trading',
    icon: TrendingUp,
    count: 96,
    description: 'Risk panels, signal logs, trade review, backtest viewers.',
  },
  {
    name: 'Retailers building commerce tools',
    category: 'Retail',
    icon: Store,
    count: 178,
    description: 'Inventory, returns, suppliers, storefront operations.',
  },
  {
    name: 'Tradies building field-service tools',
    category: 'Field Service',
    icon: Wrench,
    count: 167,
    description: 'Jobs, dispatch, inspections, approvals, quoting.',
  },
  {
    name: 'Therapists building mental health tools',
    category: 'Mental Health',
    icon: Brain,
    count: 89,
    description: 'Practice systems, journaling, session continuity, safety.',
  },
  {
    name: 'Logistics operators building dispatch tools',
    category: 'Logistics',
    icon: Truck,
    count: 104,
    description: 'Routes, dispatch, driver notes, supply chain visibility.',
  },
  {
    name: 'Real estate agents building workflow tools',
    category: 'Real Estate',
    icon: Home,
    count: 93,
    description: 'Listings, inspections, buyer follow-up, vendor communication.',
  },
];

export const projects = [
  {
    name: 'ClinicFlow',
    domain: 'HealthTech',
    description: 'Patient intake and triage dashboard built by Dr. Sarah Malik.',
    builder: 'Dr. Sarah Malik',
    status: 'MVP Shipped',
    tools: ['Claude Code', 'Supabase', 'Cursor'],
  },
  {
    name: 'MudMap',
    domain: 'AgriTech',
    description: 'Farm task and equipment tracking built by Tom Hargreaves.',
    builder: 'Tom Hargreaves',
    status: 'Live',
    tools: ['Bolt', 'Airtable', 'Supabase'],
  },
  {
    name: 'SessionPilot',
    domain: 'CreatorTech',
    description: 'Music release workflow and catalog dashboard built by Mahmood Khan.',
    builder: 'Mahmood Khan',
    status: 'In Progress',
    tools: ['Codex', 'Claude', 'GitHub Pages'],
  },
  {
    name: 'KitchenDrop',
    domain: 'FoodTech',
    description: 'Preorder and pickup system for home kitchens built by Amira Haddad.',
    builder: 'Amira Haddad',
    status: 'MVP Shipped',
    tools: ['Lovable', 'Shopify', 'Airtable'],
  },
  {
    name: 'RiskLens',
    domain: 'TradingTech',
    description: 'Bot log dashboard and drawdown review system built by Daniel Price.',
    builder: 'Daniel Price',
    status: 'Live',
    tools: ['Python', 'Cursor', 'TradingView'],
  },
  {
    name: 'IntakeBridge',
    domain: 'LegalTech',
    description: 'Qualified legal intake and call scoring system built by Nora Finch.',
    builder: 'Nora Finch',
    status: 'MVP Shipped',
    tools: ['Claude', 'Supabase', 'Typeform'],
  },
];

export const testimonials = [
  {
    quote:
      'I did not have to explain the basics of my industry for two hours. She already knew where the workflow broke.',
    author: 'Founder, ClinicFlow',
  },
  {
    quote:
      'This felt completely different from hiring a freelancer. The builder understood the problem before we even talked about features.',
    author: 'Founder, KitchenDrop',
  },
  {
    quote:
      'A normal developer would have built the obvious app. My vibe coder helped me build the actual thing customers needed.',
    author: 'Founder, IntakeBridge',
  },
  {
    quote:
      'The prototype was lean, but it had the right instincts. That mattered more than a perfect architecture diagram.',
    author: 'Founder, RiskLens',
  },
];

export const comparisonRows = [
  ['Syntax-first', 'Experience-first'],
  ['Starts with code', 'Starts with the real problem'],
  ['Works best with defined requirements', 'Works best from lived pain'],
  ['Thinks in frameworks', 'Thinks in workflows'],
  ['Builds what is requested', 'Builds what is actually needed'],
  ['Uses AI to speed up coding', 'Uses AI to become a builder'],
  ['Optimizes for system design', 'Optimizes for the first useful proof'],
  ['Asks "what stack?"', 'Asks "what pain?"'],
  ['Technical-first', 'Problem-first'],
  ['Knows how to build', 'Knows why it matters'],
  ['Matches by technical skill', 'Matches by industry fluency'],
  ['Can miss domain nuance without context', 'Protects the details that make the idea work'],
];

export const comparisonCards = [
  ['Builds what the spec says', 'Builds what the problem needs'],
  ['Uses AI like autocomplete', 'Uses AI like a co-builder'],
  ['Can polish the system deeply', 'Ships the first useful version'],
  ['May build skyscrapers for lemonade stands', 'Builds lemonade stands that sell lemonade'],
  ['Sees technical constraints', 'Sees practical possibilities'],
  ['Knowledge-based builder', 'Experience-based builder'],
  ['Needs domain translation first', "Builds around the founder's domain reality"],
];

export const examples = [
  {
    title: 'Medical software',
    icon: Activity,
    coder: 'A coder builds a medical app. The coder builds what looks right.',
    vibe: 'A doctor who vibe codes builds a clinical tool that saves time, reduces errors, and matches reality.',
  },
  {
    title: 'Farming software',
    icon: Tractor,
    coder: 'A coder builds an agriculture dashboard about farming.',
    vibe: 'A farmer who vibe codes builds from inside farming: mud, rain, timing, breakdowns, and harvest chaos.',
  },
  {
    title: 'Music and commercial workflow',
    icon: Music2,
    coder: 'A builder without music context may make the audio fit the time slot and miss the damage done to the song.',
    vibe: 'A music-domain vibe coder knows to protect the hook, timing, energy, and emotional shape of the track.',
  },
  {
    title: 'Legal call platform',
    icon: Scale,
    coder: 'A coder builds a lead marketplace.',
    vibe: 'A legal-domain vibe coder builds a qualified-call engine around the actual value.',
  },
  {
    title: 'Home food platform',
    icon: Utensils,
    coder: 'A coder builds "Uber Eats for home kitchens."',
    vibe: 'A vibe coder builds a trust-first, compliance-first preorder system that matches how home kitchens operate.',
  },
  {
    title: 'Trading dashboard',
    icon: TrendingUp,
    coder: 'A coder builds charts that look analytical.',
    vibe: 'A trader who vibe codes builds decision support that helps prevent bad trades.',
  },
];

export const founderSteps = [
  ['Bring your idea', 'Start with the problem, the customer, and the pressure point.'],
  ['Find builders who understand your world', 'Search by real-life profession, domain, tools, and proof.'],
  ['Review experience-first cards', 'See what they build, what they understand, and where their edge comes from.'],
  ['Start a scoped build', 'Agree on a useful first version with clear ownership and milestones.'],
  ['Launch the first working version', 'Ship the proof, learn fast, and keep the keys.'],
];

export const builderSteps = [
  ['Show who you are in real life', 'Your profession becomes the first signal, not an afterthought.'],
  ['Prove the problem you understand', 'Explain the pain, workflow, stakes, and customers you know firsthand.'],
  ['Show what you can build with AI', 'Add demos, tools, build logs, and small proof projects.'],
  ['Get discovered by founders', 'Match with people building inside the world you already understand.'],
  ['Turn lived experience into software', 'Use AI to make useful tools real faster than the old path allowed.'],
];

export const trustFeatures = [
  {
    icon: UserRoundCheck,
    title: 'Experience-First Matching',
    text: 'Find builders who understand your world before they touch the code.',
  },
  {
    icon: BadgeCheck,
    title: 'Real-Life Verified',
    text: 'Builders prove the profession, workflow, or problem they know.',
  },
  {
    icon: ShieldCheck,
    title: 'AI Build Verified',
    text: 'See live demos, prototypes, tools used, and AI-built work.',
  },
  {
    icon: ClipboardCheck,
    title: 'Founder-Safe Verified',
    text: 'Milestones, repo access, communication, and handover are part of the trust layer.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Project Rooms',
    text: 'Chat, scope, share files, review build logs, and keep the MVP organized.',
  },
  {
    icon: CircleDollarSign,
    title: 'Milestone-Based Builds',
    text: 'No black box work. Clear scope, visible progress, clean handover.',
  },
];

export const vibeCoderSignals = [
  ['You do not know how to code traditionally, and that is not a weakness.', 'You are not trapped by framework-first thinking. You build from intuition, experience, and the problem.'],
  ['You learned to build by talking to AI, not memorizing syntax.', 'You describe what you want, iterate, refine, test, and ship.'],
  ['You do not get stuck in proper engineering paralysis.', 'You care about whether it works, solves the problem, and can become a useful first version.'],
  ['You do not over-engineer.', 'You build the simplest version that proves the idea.'],
  ['You do not obsess over frameworks.', 'You care less about React vs Vue and more about making the thing real.'],
  ['You can start with only an idea.', 'You do not begin with "Is this possible?" You begin with "Let us try it."'],
  ['You understand a real-world problem deeply.', 'You have lived the workflow, pain, bottleneck, pressure, customer, timing, and stakes firsthand.'],
  ['You use AI as a building partner.', 'AI is not just autocomplete. It is your co-builder.'],
  ['You care more about solving the problem than sounding technical.', 'You are not trying to impress engineers. You are trying to make something useful exist.'],
  ['You build from life.', 'Your real-world experience is the source code.'],
];
