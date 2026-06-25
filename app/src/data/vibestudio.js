export const studioTranslations = [
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

export const studioModes = [
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
    text:
      'A dedicated help conversation that remembers what you asked, learns where you get stuck, and teaches you through your actual app.',
    phrase: 'Help that learns how you learn.',
    fields: ['Past questions', 'Stuck points', 'Confidence gaps', 'Next lesson', 'Safe help', 'Your own app'],
  },
];

export const ownerManualSections = [
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

export const expertCards = [
  ['Doctors', 'clinical tools'],
  ['Farmers', 'ag-tech'],
  ['Producers', 'creator tools'],
  ['Chefs', 'kitchen systems'],
  ['Traders', 'dashboards'],
  ['Paralegals', 'legal intake'],
  ['Teachers', 'learning tools'],
  ['Operators', 'workflow tools'],
];

export const helpMemoryRows = [
  ['Saved information', '12 times', 'Still learning', '2 days ago'],
  ['Secret keys', '7 times', 'Needs caution', '5 days ago'],
  ['Pages/layout', '3 times', 'Comfortable', '3 weeks ago'],
  ['Payments', '9 times', 'Risk area', 'Yesterday'],
  ['Launching', '5 times', 'Improving', '1 week ago'],
];

export const confidenceMapSections = [
  ['You are confident with', ['Pages', 'Text changes', 'Basic layout edits', 'Simple forms']],
  ['You are still learning', ['Saved information', 'Secret keys', 'Payments', 'Launch settings']],
  ['You often ask about', ['Where data is stored', 'What can break', 'How to test changes', 'What is safe to touch']],
  ['You have improved in', ['Understanding pages', 'Launching small updates', 'Using safe prompts', 'Reading change summaries']],
];

export const appTeachingPairs = [
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
