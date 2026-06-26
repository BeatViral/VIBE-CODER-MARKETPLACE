import { ArrowLeft, Download, Save, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WorkspaceTopbar({ projectName, saveStatus, onSave, onExport }) {
  return (
    <header className="vs-topbar">
      <div className="vs-topbar-brand">
        <span className="vs-logo-mark">
          <Sparkles className="size-5" />
        </span>
        <div>
          <strong>VibeStudio</strong>
          <span>VibeStudio is the workspace.</span>
        </div>
      </div>

      <div className="vs-project-pill">
        <span>Current project</span>
        <strong>{projectName || 'Untitled workspace'}</strong>
      </div>

      <div className="vs-topbar-actions">
        <span className="vs-save-status">{saveStatus}</span>
        <button type="button" className="vs-mini-button" onClick={onSave}>
          <Save className="size-4" />
          Save Project
        </button>
        <button type="button" className="vs-mini-button vs-mini-button-hot" onClick={onExport}>
          <Download className="size-4" />
          Export Markdown
        </button>
        <Link to="/" className="vs-mini-button">
          <ArrowLeft className="size-4" />
          Back to Marketplace
        </Link>
      </div>
    </header>
  );
}
