import { useEffect, useState } from 'react';
import ExportPackagePanel from '../components/vibestudio-app/ExportPackagePanel.jsx';
import HelpPanel from '../components/vibestudio-app/HelpPanel.jsx';
import LifeMapForm from '../components/vibestudio-app/LifeMapForm.jsx';
import OwnerManualPanel from '../components/vibestudio-app/OwnerManualPanel.jsx';
import PagesPanel from '../components/vibestudio-app/PagesPanel.jsx';
import PlanPanel from '../components/vibestudio-app/PlanPanel.jsx';
import PreviewPanel from '../components/vibestudio-app/PreviewPanel.jsx';
import ProjectFilesPanel from '../components/vibestudio-app/ProjectFilesPanel.jsx';
import WorkspaceLayout from '../components/vibestudio-app/WorkspaceLayout.jsx';
import {
  generateFirstUsefulVersion,
  generateFullMarkdownPackage,
  generateOwnerManual,
  generatePreviewData,
  generateWorkflowMap,
} from '../utils/generators.js';
import { generateFileTree, generateProjectFiles, toProjectName } from '../utils/projectFiles.js';
import { deleteProject, duplicateProject, loadProject, loadProjects, saveProject } from '../utils/storage.js';

const emptyForm = {
  builderPrompt: '',
  appType: '',
  styleMood: '',
  launchShape: '',
  projectName: '',
  realLifeRole: '',
  industry: '',
  problem: '',
  workflowBreaks: '',
  personSuffering: '',
  currentWorkaround: '',
  genericCoderMiss: '',
  firstUsefulResult: '',
  users: '',
  userFirstActions: '',
  ownerActions: '',
  savedInformation: '',
  outsideServices: '',
  designVibe: 'Premium dark',
  mustHaveFeatures: [],
  doNotBuildYet: '',
  launchGoal: 'Investor demo',
  complexity: 'Simple first version',
};

const sampleProject = {
  builderPrompt: 'Build me a music session planner for artists finishing songs.',
  appType: 'Dashboard',
  styleMood: 'Premium',
  launchShape: 'dashboard',
  projectName: 'SessionPilot',
  realLifeRole: 'Music Producer / Artist / Label Operator',
  industry: 'Music / Creator Economy',
  problem:
    'Independent creators struggle to finish songs because recording, vocal chains, mixing, mastering, metadata, and release planning are too technical and scattered.',
  workflowBreaks:
    'Idea -> beat -> vocal recording -> rough mix -> final mix -> master -> metadata -> release plan. Creators get stuck between demo and finished record.',
  personSuffering: 'Singer-songwriters, producers, indie artists, and creators without engineering support.',
  currentWorkaround: 'YouTube tutorials, plugin presets, hiring engineers, unfinished demos, spreadsheets, scattered notes.',
  genericCoderMiss:
    'The emotional creative block, the importance of staying in flow, vocal confidence, the difference between a file manager and a creative finishing system, and how non-engineers think about sound.',
  firstUsefulResult: 'Help a creator move from song idea to organized release-ready demo workflow.',
  users: 'Artists, singers, producers, creators.',
  userFirstActions: 'Create a session, choose a workflow, add song notes, track progress, export a release checklist.',
  ownerActions: 'Manage templates, review projects, add workflow presets.',
  savedInformation: 'users, songs, sessions, workflow steps, notes, export checklist',
  outsideServices: 'file upload, AI assistant, email, maybe payments later',
  designVibe: 'Creator/music',
  mustHaveFeatures: ['Dashboard', 'Forms', 'AI assistant', 'Export/download', 'Project rooms', 'Owner Mode'],
  doNotBuildYet: 'Full DAW, real-time audio engine, plugin hosting, collaboration marketplace, mobile app.',
  launchGoal: 'Investor demo',
  complexity: 'Simple first version',
};

function inferProjectName(prompt, appType) {
  const text = `${prompt} ${appType}`.toLowerCase();
  if (text.includes('music') || text.includes('song') || text.includes('artist') || text.includes('session')) return 'SessionPilot';
  if (text.includes('trading') || text.includes('trade')) return 'TradeReview';
  if (text.includes('cook') || text.includes('food') || text.includes('pickup') || text.includes('order')) return 'KitchenDrop';
  if (text.includes('legal') || text.includes('attorney') || text.includes('law')) return 'IntakePilot';
  if (text.includes('doctor') || text.includes('clinic') || text.includes('health')) return 'ClinicFlow';
  if (text.includes('booking') || text.includes('calendar')) return 'BookingPilot';
  if (text.includes('marketplace')) return 'MarketPilot';
  if (text.includes('dashboard')) return 'DashPilot';
  return 'VibeApp';
}

function inferProjectFromPrompt(formData) {
  const prompt = formData.builderPrompt?.trim() || formData.problem?.trim() || 'Build me a simple useful app.';
  const text = `${prompt} ${formData.appType || ''} ${formData.launchShape || ''}`.toLowerCase();
  const isMusic = text.includes('music') || text.includes('song') || text.includes('artist') || text.includes('session');
  const isTrading = text.includes('trading') || text.includes('trade') || text.includes('risk') || text.includes('entries');
  const isFood = text.includes('cook') || text.includes('food') || text.includes('pickup') || text.includes('order') || text.includes('kitchen');
  const isLegal = text.includes('legal') || text.includes('attorney') || text.includes('law') || text.includes('intake');
  const isHealth = text.includes('doctor') || text.includes('clinic') || text.includes('health') || text.includes('patient');
  const isBooking = text.includes('booking') || text.includes('calendar') || text.includes('appointment');
  const isMarketplace = text.includes('marketplace');
  const isDashboard = text.includes('dashboard') || formData.appType === 'Dashboard';

  let inferred = {
    projectName: inferProjectName(prompt, formData.appType),
    realLifeRole: 'Domain expert / founder',
    industry: 'General workflow',
    personSuffering: 'People who need this workflow',
    firstUsefulResult: 'Turn the idea into a simple first version people can use.',
    userFirstActions: 'Open the app, follow the main workflow, save progress, and review the result.',
    ownerActions: 'Review activity, update content, and understand what the app is made of.',
    savedInformation: 'users, projects, notes, status',
    outsideServices: 'email, login',
    mustHaveFeatures: ['Dashboard', 'Forms', 'Owner Mode'],
    doNotBuildYet: 'Do not build advanced automation, payments, mobile apps, or complex integrations yet.',
    designVibe: formData.styleMood === 'Dark' ? 'Premium dark' : formData.styleMood || 'Clean startup',
    launchGoal: formData.appType || formData.launchShape || 'MVP',
    complexity: 'Simple first version',
  };

  if (isMusic) {
    inferred = {
      ...inferred,
      realLifeRole: 'Music creator / producer',
      industry: 'Music / Creator Economy',
      personSuffering: 'Artists, singers, producers, and creators',
      firstUsefulResult: 'Help a creator move from song idea to organized release-ready workflow.',
      userFirstActions: 'Create a session, add song notes, track progress, and export a release checklist.',
      ownerActions: 'Manage workflow templates, review projects, and add presets.',
      savedInformation: 'users, songs, sessions, workflow steps, notes, export checklist',
      outsideServices: 'file upload, AI assistant, email',
      mustHaveFeatures: ['Dashboard', 'Forms', 'AI assistant', 'Export/download', 'Project rooms', 'Owner Mode'],
      doNotBuildYet: 'Do not build a full DAW, audio engine, plugin hosting, marketplace, or mobile app yet.',
      designVibe: 'Creator/music',
    };
  } else if (isTrading) {
    inferred = {
      ...inferred,
      realLifeRole: 'Trader / market operator',
      industry: 'Trading dashboard',
      personSuffering: 'Traders reviewing decisions and bad entries',
      firstUsefulResult: 'Help a trader log trades, spot bad entries, and review risk patterns.',
      userFirstActions: 'Add a trade, tag the setup, review mistakes, and see risk notes.',
      ownerActions: 'Manage review categories, risk rules, and dashboard summaries.',
      savedInformation: 'users, trades, setups, mistakes, screenshots, review notes',
      outsideServices: 'file upload, charts later',
      mustHaveFeatures: ['Dashboard', 'Forms', 'Search/filter', 'Reports', 'Owner Mode'],
      doNotBuildYet: 'Do not build live trading, broker connection, automation, or financial advice features yet.',
      designVibe: 'Trading dashboard',
    };
  } else if (isFood) {
    inferred = {
      ...inferred,
      realLifeRole: 'Food operator / home cook',
      industry: 'Food / Hospitality',
      personSuffering: 'Home cooks, customers, and kitchen operators',
      firstUsefulResult: 'Let customers place pickup orders and help the owner track what needs to be prepared.',
      userFirstActions: 'Browse items, place a pickup order, and receive a simple confirmation.',
      ownerActions: 'Manage menu items, see orders, update order status, and prepare pickup lists.',
      savedInformation: 'users, menu items, pickup orders, customer notes, order status',
      outsideServices: 'email, payments later',
      mustHaveFeatures: ['Dashboard', 'Forms', 'Search/filter', 'Notifications', 'Owner Mode'],
      doNotBuildYet: 'Do not build delivery routing, multi-location operations, full POS, or complex payments yet.',
      designVibe: 'Food/hospitality',
    };
  } else if (isLegal) {
    inferred = {
      ...inferred,
      realLifeRole: 'Legal operator / attorney team',
      industry: 'Legal / Intake',
      personSuffering: 'Attorneys, intake staff, and callers',
      firstUsefulResult: 'Capture legal call details and help the team decide what should happen next.',
      userFirstActions: 'Log a call, qualify the matter, add notes, and route it for review.',
      ownerActions: 'Review intake quality, manage questions, and export qualified leads.',
      savedInformation: 'callers, matters, intake notes, qualification status, follow-up tasks',
      outsideServices: 'email, file upload, calendar later',
      mustHaveFeatures: ['Dashboard', 'Forms', 'Search/filter', 'Export/download', 'Owner Mode'],
      doNotBuildYet: 'Do not build legal advice, e-signatures, billing, or full case management yet.',
      designVibe: 'Legal/professional',
    };
  } else if (isHealth) {
    inferred = {
      ...inferred,
      realLifeRole: 'Healthcare operator',
      industry: 'Healthcare / Clinic Operations',
      personSuffering: 'Patients, doctors, nurses, and admin staff',
      firstUsefulResult: 'Capture intake details and help the team route the next step clearly.',
      userFirstActions: 'Submit intake details, update status, and see what happens next.',
      ownerActions: 'Review intake, manage triage, and track patient flow.',
      savedInformation: 'patients, appointments, intake notes, triage status, care tasks',
      outsideServices: 'email, calendar, login',
      mustHaveFeatures: ['Login', 'Dashboard', 'Forms', 'Search/filter', 'Owner Mode'],
      doNotBuildYet: 'Do not build medical diagnosis, billing, prescriptions, or regulated clinical decisions yet.',
      designVibe: 'Medical/clinical',
    };
  }

  if (isBooking) {
    inferred.mustHaveFeatures = [...new Set([...inferred.mustHaveFeatures, 'Calendar/booking'])];
    inferred.outsideServices = inferred.outsideServices.includes('calendar') ? inferred.outsideServices : `${inferred.outsideServices}, calendar`;
  }

  if (isMarketplace) {
    inferred.mustHaveFeatures = [...new Set([...inferred.mustHaveFeatures, 'Search/filter', 'Marketplace'])].filter(Boolean);
    inferred.savedInformation = `${inferred.savedInformation}, listings, saved items`;
  }

  if (isDashboard) {
    inferred.mustHaveFeatures = [...new Set(['Dashboard', ...inferred.mustHaveFeatures])];
  }

  return {
    ...inferred,
    ...Object.fromEntries(Object.entries(formData).filter(([, value]) => {
      if (Array.isArray(value)) return value.length;
      return Boolean(value);
    })),
    builderPrompt: prompt,
    problem: formData.problem || prompt,
    workflowBreaks:
      formData.workflowBreaks || `Idea -> first action -> saved information -> owner review -> useful result. VibeStudio inferred this from: ${prompt}`,
    genericCoderMiss:
      formData.genericCoderMiss || 'The lived context, pressure, edge cases, and details that make this app useful in the real world.',
    currentWorkaround: formData.currentWorkaround || 'Manual work, scattered notes, spreadsheets, messages, calls, or memory.',
    projectName: formData.projectName || inferred.projectName,
    designVibe: formData.designVibe && formData.designVibe !== 'Premium dark' ? formData.designVibe : inferred.designVibe,
    launchGoal: formData.launchGoal || inferred.launchGoal,
    complexity: formData.complexity || inferred.complexity,
  };
}

function buildGeneratedState(formData) {
  const workflowMap = generateWorkflowMap(formData);
  const firstUsefulVersion = generateFirstUsefulVersion(formData);
  const ownerManual = generateOwnerManual(formData);
  const fileTree = generateFileTree(formData);
  const files = generateProjectFiles(formData);
  const previewData = generatePreviewData(formData);
  const base = {
    projectName: toProjectName(formData),
    generatedAt: new Date().toISOString(),
    workflowMap,
    firstUsefulVersion,
    ownerManual,
    fileTree,
    files,
    previewData,
  };

  return {
    ...base,
    fullMarkdown: generateFullMarkdownPackage(formData, base),
  };
}

function getMissingNote(formData) {
  const required = ['projectName', 'realLifeRole', 'industry', 'problem', 'workflowBreaks', 'firstUsefulResult'];
  const missing = required.filter((field) => !formData[field]?.trim?.());

  if (!missing.length) {
    return 'Preview generated. Your plan, pages, files, owner notes, and export package are ready.';
  }

  return 'Some sections were generated from limited information. Add more detail to improve the workspace.';
}

export default function VibeStudioAppPage() {
  const [activeTab, setActiveTab] = useState('start');
  const [formData, setFormData] = useState(emptyForm);
  const [generated, setGenerated] = useState(null);
  const [selectedFile, setSelectedFile] = useState('');
  const [projectId, setProjectId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [saveStatus, setSaveStatus] = useState('Local-first workspace');
  const [limitedNote, setLimitedNote] = useState('');

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  const persistProject = (nextForm = formData, nextGenerated = generated, id = projectId) => {
    const saved = saveProject({
      id,
      name: toProjectName(nextForm),
      formData: nextForm,
      generated: nextGenerated,
      selectedTab: activeTab,
    });
    setProjectId(saved.id);
    setProjects(loadProjects());
    setSaveStatus(`Saved ${new Date(saved.updatedAt).toLocaleTimeString()}`);
    return saved;
  };

  const generateWorkspace = (source = formData) => {
    const nextGenerated = buildGeneratedState(source);
    setFormData(source);
    setGenerated(nextGenerated);
    setSelectedFile(nextGenerated.fileTree[0] || '');
    setLimitedNote(getMissingNote(source));
    setActiveTab('preview');
    persistProject(source, nextGenerated);
  };

  const generateFromPrompt = () => {
    const inferred = inferProjectFromPrompt(formData);
    generateWorkspace(inferred);
  };

  const loadSample = () => {
    generateWorkspace(sampleProject);
  };

  const loadSaved = (id) => {
    const project = loadProject(id);
    if (!project) return;

    setProjectId(project.id);
    setFormData(project.formData || emptyForm);
    setGenerated(project.generated || null);
    setSelectedFile(project.generated?.fileTree?.[0] || '');
    setActiveTab(project.generated ? 'preview' : 'start');
    setSaveStatus(`Loaded ${new Date(project.updatedAt || Date.now()).toLocaleTimeString()}`);
  };

  const deleteSaved = (id) => {
    deleteProject(id);
    setProjects(loadProjects());
    if (id === projectId) {
      setProjectId(null);
      setSaveStatus('Deleted saved project');
    }
  };

  const duplicateSaved = (id) => {
    duplicateProject(id);
    setProjects(loadProjects());
    setSaveStatus('Duplicated saved project');
  };

  const manualSave = () => {
    persistProject();
  };

  const renderTab = () => {
    if (activeTab === 'start') {
      return (
        <LifeMapForm
          formData={formData}
          limitedNote={limitedNote}
          onChange={setFormData}
          projects={projects}
          onDelete={deleteSaved}
          onDuplicate={duplicateSaved}
          onLoad={loadSaved}
          onLoadSample={loadSample}
          onGenerate={generateFromPrompt}
        />
      );
    }

    if (!generated) {
      return (
        <div className="vs-empty-state">
          <h2>Generate the workspace first.</h2>
          <p>Type what you want to build, click Build App, then VibeStudio will create the preview, pages, files, owner notes, and export package.</p>
          <button type="button" className="vs-primary-action" onClick={() => setActiveTab('start')}>
            Go to Start
          </button>
        </div>
      );
    }

    if (activeTab === 'plan') return <PlanPanel formData={formData} generated={generated} />;
    if (activeTab === 'pages') return <PagesPanel formData={formData} generated={generated} />;
    if (activeTab === 'files') return <ProjectFilesPanel generated={generated} selectedFile={selectedFile} onSelectFile={setSelectedFile} />;
    if (activeTab === 'preview') return <PreviewPanel generated={generated} />;
    if (activeTab === 'owner') return <OwnerManualPanel generated={generated} />;
    if (activeTab === 'export') return <ExportPackagePanel generated={generated} />;
    if (activeTab === 'help') return <HelpPanel formData={formData} />;

    return null;
  };

  return (
    <WorkspaceLayout
      activeTab={activeTab}
      formData={formData}
      generated={generated}
      onExport={() => setActiveTab('export')}
      onSave={manualSave}
      onTabChange={setActiveTab}
      projectName={toProjectName(formData)}
      saveStatus={saveStatus}
    >
      {renderTab()}
    </WorkspaceLayout>
  );
}
