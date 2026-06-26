const fallbackProjectName = 'VibeApp';

export function splitList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);

  return String(value || '')
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function toProjectName(formData) {
  return formData.projectName?.trim() || fallbackProjectName;
}

export function toFolderName(formData) {
  return toProjectName(formData)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'vibe-app';
}

export function toComponentName(value) {
  const cleaned = String(value || fallbackProjectName)
    .replace(/[^a-zA-Z0-9 ]+/g, ' ')
    .trim();
  const words = cleaned ? cleaned.split(/\s+/) : [fallbackProjectName];
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

export function getGeneratedPageNames(formData) {
  const world = `${formData.industry || ''} ${formData.designVibe || ''}`.toLowerCase();
  const features = splitList(formData.mustHaveFeatures).join(' ').toLowerCase();

  if (world.includes('music') || world.includes('creator')) {
    return ['HomePage.jsx', 'SessionDashboard.jsx', 'SongWorkflowPage.jsx', 'ExportChecklistPage.jsx', 'OwnerModePage.jsx'];
  }

  if (world.includes('food') || world.includes('kitchen') || world.includes('hospitality')) {
    return ['HomePage.jsx', 'MenuPage.jsx', 'OrderPage.jsx', 'KitchenDashboard.jsx', 'OwnerModePage.jsx'];
  }

  if (world.includes('trading') || world.includes('trade')) {
    return ['HomePage.jsx', 'TradeLogPage.jsx', 'RiskDashboard.jsx', 'ReviewPage.jsx', 'OwnerModePage.jsx'];
  }

  if (world.includes('health') || world.includes('medical') || world.includes('clinic')) {
    return ['HomePage.jsx', 'IntakePage.jsx', 'TriageDashboard.jsx', 'PatientFlowPage.jsx', 'OwnerModePage.jsx'];
  }

  if (world.includes('legal')) {
    return ['HomePage.jsx', 'IntakePage.jsx', 'MatterDashboard.jsx', 'DocumentChecklistPage.jsx', 'OwnerModePage.jsx'];
  }

  const base = ['HomePage.jsx', 'DashboardPage.jsx', 'WorkflowPage.jsx', 'OwnerModePage.jsx'];
  if (features.includes('admin')) base.splice(3, 0, 'AdminPage.jsx');
  else base.splice(3, 0, 'NotFoundPage.jsx');
  return base;
}

export function generateFileTree(formData) {
  const pages = getGeneratedPageNames(formData);
  const folder = toFolderName(formData);

  return [
    `${folder}/package.json`,
    `${folder}/index.html`,
    `${folder}/README.md`,
    `${folder}/OWNER_MANUAL.md`,
    `${folder}/src/main.jsx`,
    `${folder}/src/App.jsx`,
    `${folder}/src/data/mockData.js`,
    `${folder}/src/components/Navbar.jsx`,
    `${folder}/src/components/PageShell.jsx`,
    `${folder}/src/components/Card.jsx`,
    `${folder}/src/components/FormSection.jsx`,
    `${folder}/src/components/OwnerModePanel.jsx`,
    ...pages.map((page) => `${folder}/src/pages/${page}`),
    `${folder}/src/styles/index.css`,
  ];
}

export function generatePackageJsonFile(formData) {
  return JSON.stringify(
    {
      name: toFolderName(formData),
      private: true,
      version: '0.1.0',
      type: 'module',
      scripts: {
        dev: 'vite --host 127.0.0.1',
        build: 'vite build',
        preview: 'vite preview',
      },
      dependencies: {
        '@vitejs/plugin-react': 'latest',
        vite: 'latest',
        react: 'latest',
        'react-dom': 'latest',
      },
      devDependencies: {},
    },
    null,
    2,
  );
}

export function generateIndexHtmlFile(formData) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${toProjectName(formData)}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
}

export function generateMockDataFile(formData) {
  const savedInformation = splitList(formData.savedInformation);
  const features = splitList(formData.mustHaveFeatures);

  return `export const projectInfo = ${JSON.stringify(
    {
      name: toProjectName(formData),
      role: formData.realLifeRole || 'Domain expert',
      industry: formData.industry || 'Real-world workflow',
      firstUsefulResult: formData.firstUsefulResult || 'Create a useful first version.',
      savedInformation,
      features,
    },
    null,
    2,
  )};

export const sampleItems = [
  ${savedInformation.map((item, index) => `{ id: ${index + 1}, type: '${item}', status: 'Ready to shape' }`).join(',\n  ')}
];
`;
}

export function generateReactPageFile(formData, pageName) {
  const componentName = pageName.replace('.jsx', '');
  const savedInformation = splitList(formData.savedInformation).slice(0, 4);
  const features = splitList(formData.mustHaveFeatures).slice(0, 5);

  return `import Card from '../components/Card.jsx';
import PageShell from '../components/PageShell.jsx';

export default function ${componentName}() {
  return (
    <PageShell
      eyebrow="${formData.industry || 'Generated app'}"
      title="${componentName.replace(/([A-Z])/g, ' $1').trim()}"
      text="${formData.firstUsefulResult || 'This page supports the first useful version.'}"
    >
      <div className="grid">
        ${[...savedInformation, ...features].slice(0, 6).map((item) => `<Card title="${item}" text="Shape this around the real workflow." />`).join('\n        ')}
      </div>
    </PageShell>
  );
}
`;
}

export function generateAppFile(formData) {
  const pages = getGeneratedPageNames(formData);
  const navItems = pages.map((page) => page.replace('.jsx', '').replace(/Page$/, ''));

  return `import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import ${pages[0].replace('.jsx', '')} from './pages/${pages[0]}';
import './styles/index.css';

const navItems = ${JSON.stringify(navItems, null, 2)};

export default function App() {
  const [active, setActive] = useState(navItems[0]);

  return (
    <div className="app">
      <Navbar items={navItems} active={active} onSelect={setActive} />
      <${pages[0].replace('.jsx', '')} />
    </div>
  );
}
`;
}

export function generateReadmeFile(formData) {
  return `# ${toProjectName(formData)}

Generated by VibeStudio Phase 1.

## What this app is

${formData.problem || 'A local-first app workspace generated from a Life Map.'}

## First useful result

${formData.firstUsefulResult || 'Create a useful first version that proves the idea.'}

## Who it helps

${formData.personSuffering || formData.users || 'The people closest to the workflow.'}

## Plain note

This app folder can be handed to another builder later. You do not need to understand Git, terminal, branches, or commits to understand what VibeStudio generated.
`;
}

export function generateOwnerManualFile(formData) {
  return `# Owner Manual

## What this app does

${formData.problem || 'This app supports the real-world workflow captured in the Life Map.'}

## Who uses it

${formData.users || formData.personSuffering || 'Users from the target workflow.'}

## What it remembers

${splitList(formData.savedInformation).map((item) => `- ${item}`).join('\n') || '- Add saved information in the Life Map.'}

## Outside services

${splitList(formData.outsideServices).map((item) => `- ${item}`).join('\n') || '- No outside services listed yet.'}

## What not to touch

${formData.doNotBuildYet || 'Do not expand beyond the first useful version until the workflow is proven.'}
`;
}

export function generateMaintenanceFile(formData) {
  return `# Maintenance Plan

## Before every launch

- Test the main pages.
- Test forms and saved information.
- Check mobile layout.
- Review outside services: ${formData.outsideServices || 'none listed yet'}.
- Read what changed before making the app live.

## Risk areas

${formData.doNotBuildYet || 'The riskiest area is expanding too fast before the first useful version proves the workflow.'}
`;
}

export function generateHandoverFile(formData) {
  return `# Handover Pack

## Project summary

${formData.projectName || 'Untitled project'} is built from the lived experience of ${formData.realLifeRole || 'a domain expert'}.

## Future builder must understand

${formData.genericCoderMiss || 'The domain nuance captured in the Life Map.'}

## App folder

${generateFileTree(formData).map((path) => `- ${path}`).join('\n')}
`;
}

export function generateProjectFiles(formData) {
  const folder = toFolderName(formData);
  const pages = getGeneratedPageNames(formData);
  const files = {
    [`${folder}/package.json`]: generatePackageJsonFile(formData),
    [`${folder}/index.html`]: generateIndexHtmlFile(formData),
    [`${folder}/README.md`]: generateReadmeFile(formData),
    [`${folder}/OWNER_MANUAL.md`]: generateOwnerManualFile(formData),
    [`${folder}/src/main.jsx`]: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
`,
    [`${folder}/src/App.jsx`]: generateAppFile(formData),
    [`${folder}/src/data/mockData.js`]: generateMockDataFile(formData),
    [`${folder}/src/components/Navbar.jsx`]: `export default function Navbar({ items, active, onSelect }) {
  return (
    <nav className="navbar">
      <strong>${toProjectName(formData)}</strong>
      <div>
        {items.map((item) => (
          <button key={item} onClick={() => onSelect(item)} className={active === item ? 'active' : ''}>
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}
`,
    [`${folder}/src/components/PageShell.jsx`]: `export default function PageShell({ eyebrow, title, text, children }) {
  return (
    <main className="page-shell">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{text}</p>
      {children}
    </main>
  );
}
`,
    [`${folder}/src/components/Card.jsx`]: `export default function Card({ title, text }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
`,
    [`${folder}/src/components/FormSection.jsx`]: `export default function FormSection({ title, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
`,
    [`${folder}/src/components/OwnerModePanel.jsx`]: `export default function OwnerModePanel() {
  return (
    <aside className="card owner-panel">
      <h2>Owner Mode</h2>
      <p>Know what you own. Know how to keep it alive.</p>
    </aside>
  );
}
`,
    [`${folder}/src/styles/index.css`]: `body {
  margin: 0;
  background: #05050a;
  color: white;
  font-family: Inter, system-ui, sans-serif;
}

.app {
  min-height: 100vh;
}

.navbar {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, .12);
}

.navbar button,
.active {
  border: 1px solid rgba(0, 229, 255, .35);
  background: rgba(0, 229, 255, .08);
  color: white;
  border-radius: .5rem;
  padding: .65rem .8rem;
}

.page-shell {
  padding: 3rem 1rem;
  max-width: 1100px;
  margin: 0 auto;
}

.eyebrow {
  color: #00e5ff;
  font-weight: 800;
  text-transform: uppercase;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  margin-top: 2rem;
}

.card {
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: .75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, .05);
}
`,
  };

  pages.forEach((page) => {
    files[`${folder}/src/pages/${page}`] = generateReactPageFile(formData, page);
  });

  return files;
}
