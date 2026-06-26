export const plainDictionary = [
  {
    technical: 'Routes',
    plain: 'Pages',
    explanation: 'The screens people can open inside your app.',
  },
  {
    technical: 'Database',
    plain: 'Saved information',
    explanation: 'The things your app needs to remember.',
  },
  {
    technical: 'Database schema',
    plain: 'How saved information is organized',
    explanation: 'The shape of each saved item, like the details kept for a project, order, user, or note.',
  },
  {
    technical: 'API',
    plain: 'Outside service',
    explanation: 'Another tool your app talks to, such as email, payments, AI, maps, or file upload.',
  },
  {
    technical: 'Environment variables',
    plain: 'Secret keys',
    explanation: 'Private passwords your app uses to talk to outside services. Never paste them into public code.',
  },
  {
    technical: 'Repository',
    plain: 'App folder',
    explanation: 'The folder that holds all the files your app is made from.',
  },
  {
    technical: 'Commit',
    plain: 'Saved version',
    explanation: 'A named safe point you can come back to later.',
  },
  {
    technical: 'Branch',
    plain: 'Safe copy',
    explanation: 'A separate copy for trying changes before touching the main app.',
  },
  {
    technical: 'Rollback',
    plain: 'Go back to last safe version',
    explanation: 'Return the app to an earlier saved version if a change goes wrong.',
  },
  {
    technical: 'Deployment',
    plain: 'Make live',
    explanation: 'Put the app somewhere other people can open it.',
  },
  {
    technical: 'Build artifact',
    plain: 'Export file',
    explanation: 'A prepared file or folder that can be shared, saved, or used later.',
  },
  {
    technical: 'Technical documentation',
    plain: 'Owner Manual',
    explanation: 'A plain-English guide that explains what the app does and how to keep it alive.',
  },
  {
    technical: 'Frontend',
    plain: 'What people see and click',
    explanation: 'The visible part of the app.',
  },
  {
    technical: 'Backend',
    plain: 'What happens behind the scenes',
    explanation: 'The hidden logic, saving, and outside-service work that supports the app.',
  },
  {
    technical: 'Authentication',
    plain: 'Login',
    explanation: 'How the app knows who someone is.',
  },
  {
    technical: 'Authorization',
    plain: 'What each user is allowed to do',
    explanation: 'The rules that decide which screens and actions each person can use.',
  },
  {
    technical: 'Hosting',
    plain: 'Where the app lives online',
    explanation: 'The place that keeps the app available on the internet.',
  },
  {
    technical: 'Domain',
    plain: 'Website address',
    explanation: 'The name people type to open the app.',
  },
  {
    technical: 'Logs',
    plain: 'Activity record',
    explanation: 'A record of what happened inside the app, useful when something goes wrong.',
  },
  {
    technical: 'Monitoring',
    plain: 'Watching if the app is healthy',
    explanation: 'Keeping an eye on errors, speed, and whether the app is working.',
  },
  {
    technical: 'Backup',
    plain: 'Safe copy',
    explanation: 'A saved copy you can keep in case something goes wrong.',
  },
  {
    technical: 'Restore',
    plain: 'Bring back a safe copy',
    explanation: 'Use a saved copy to recover the app or project.',
  },
];

export function translateToPlain(term) {
  const normalized = term.trim().toLowerCase();

  if (!normalized) {
    return plainDictionary[0];
  }

  return (
    plainDictionary.find((entry) => entry.technical.toLowerCase() === normalized) ||
    plainDictionary.find((entry) => entry.technical.toLowerCase().includes(normalized)) ||
    plainDictionary.find((entry) => entry.plain.toLowerCase().includes(normalized)) || {
      technical: term,
      plain: 'Plain explanation',
      explanation:
        'This term is not in the Phase 1 dictionary yet. Ask what it means in the context of your app, then connect it to pages, saved information, outside services, or the Owner Manual.',
    }
  );
}
