import { FileText, FolderTree, LifeBuoy, Play, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import ExportPackagePanel from '../components/vibestudio-app/ExportPackagePanel.jsx';
import FirstUsefulVersionPanel from '../components/vibestudio-app/FirstUsefulVersionPanel.jsx';
import LifeMapForm from '../components/vibestudio-app/LifeMapForm.jsx';
import OwnerManualPanel from '../components/vibestudio-app/OwnerManualPanel.jsx';
import PreviewPanel from '../components/vibestudio-app/PreviewPanel.jsx';
import ProjectFilesPanel from '../components/vibestudio-app/ProjectFilesPanel.jsx';
import SavedProjectsPanel from '../components/vibestudio-app/SavedProjectsPanel.jsx';
import WorkflowMapPanel from '../components/vibestudio-app/WorkflowMapPanel.jsx';
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
    return 'Workspace generated. Your app folder, preview, and owner documents are ready.';
  }

  return 'Some sections were generated from limited information. Add more detail to improve the workspace.';
}

function StartScreen({ onLoadSample, onOpenLifeMap, onOpenSaved, projects, onDelete, onDuplicate, onLoad }) {
  return (
    <div className="vs-panel-stack">
      <section className="vs-start-hero">
        <p className="vs-kicker">VibeStudio</p>
        <h1>Build it. Ship it. Own it. Forever.</h1>
        <p>
          Start with what you know from real life. VibeStudio turns your experience into a local app workspace, workflow
          map, first useful version, project files, preview, Owner Manual, and export package.
        </p>
        <div className="vs-start-actions">
          <button type="button" className="vs-primary-action" onClick={onOpenLifeMap}>
            <Sparkles className="size-4" />
            Start Life Map
          </button>
          <button type="button" className="vs-mini-button vs-mini-button-hot" onClick={onLoadSample}>
            <Play className="size-4" />
            Load Sample Project
          </button>
          <button type="button" className="vs-mini-button" onClick={onOpenSaved}>
            <FolderTree className="size-4" />
            Load Saved Project
          </button>
        </div>
      </section>

      <div className="vs-start-grid">
        {[
          ['Life Map', 'Start with the real-world problem you understand.', Sparkles],
          ['Project Files', 'See the app folder, pages, components, and owner documents VibeStudio creates.', FolderTree],
          ['Preview', 'See your app before shipping.', Play],
          ['Owner Manual', 'Understand what your app does, what it uses, and how to keep it alive.', FileText],
          ['Plain Helper', 'Translate technical terms into ownership language.', LifeBuoy],
        ].map(([title, text, Icon]) => (
          <article key={title} className="vs-start-card">
            <Icon className="size-5" />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <SavedProjectsPanel projects={projects} onDelete={onDelete} onDuplicate={onDuplicate} onLoad={onLoad} />
    </div>
  );
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
    setActiveTab('files');
    persistProject(source, nextGenerated);
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
    setActiveTab(project.generated ? 'files' : 'life');
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
        <StartScreen
          projects={projects}
          onDelete={deleteSaved}
          onDuplicate={duplicateSaved}
          onLoad={loadSaved}
          onLoadSample={loadSample}
          onOpenLifeMap={() => setActiveTab('life')}
          onOpenSaved={() => setActiveTab('start')}
        />
      );
    }

    if (activeTab === 'life') {
      return <LifeMapForm formData={formData} limitedNote={limitedNote} onChange={setFormData} onGenerate={() => generateWorkspace(formData)} />;
    }

    if (!generated) {
      return (
        <div className="vs-empty-state">
          <h2>Generate the workspace first.</h2>
          <p>Load the sample project or complete the Life Map to create files, preview, and owner documents.</p>
          <button type="button" className="vs-primary-action" onClick={() => setActiveTab('life')}>
            Start Life Map
          </button>
        </div>
      );
    }

    if (activeTab === 'workflow') return <WorkflowMapPanel generated={generated} />;
    if (activeTab === 'first') return <FirstUsefulVersionPanel generated={generated} />;
    if (activeTab === 'files') return <ProjectFilesPanel generated={generated} selectedFile={selectedFile} onSelectFile={setSelectedFile} />;
    if (activeTab === 'preview') return <PreviewPanel generated={generated} />;
    if (activeTab === 'owner') return <OwnerManualPanel generated={generated} />;
    if (activeTab === 'export') return <ExportPackagePanel generated={generated} />;

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
