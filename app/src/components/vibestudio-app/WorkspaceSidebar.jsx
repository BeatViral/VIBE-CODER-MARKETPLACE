import { BookOpen, Box, ClipboardList, Eye, FileText, FolderTree, Home, Map, Package, Sparkles } from 'lucide-react';

const icons = {
  start: Home,
  life: Sparkles,
  workflow: Map,
  first: ClipboardList,
  files: FolderTree,
  preview: Eye,
  owner: BookOpen,
  export: Package,
};

export const workspaceTabs = [
  ['start', 'Start'],
  ['life', 'Life Map'],
  ['workflow', 'Workflow Map'],
  ['first', 'First Useful Version'],
  ['files', 'Project Files'],
  ['preview', 'Preview'],
  ['owner', 'Owner Manual'],
  ['export', 'Export Package'],
];

export default function WorkspaceSidebar({ activeTab, onTabChange, generated }) {
  return (
    <aside className="vs-sidebar">
      <div className="vs-sidebar-label">
        <Box className="size-4" />
        Workspace
      </div>
      <nav className="vs-sidebar-nav">
        {workspaceTabs.map(([id, label]) => {
          const Icon = icons[id] || FileText;
          const locked = !generated && !['start', 'life'].includes(id);

          return (
            <button
              key={id}
              type="button"
              className={`vs-sidebar-link ${activeTab === id ? 'vs-sidebar-link-active' : ''}`}
              onClick={() => onTabChange(id)}
              disabled={locked}
            >
              <Icon className="size-4" />
              <span>{label}</span>
              {locked && <em>Generate first</em>}
            </button>
          );
        })}
      </nav>
      <div className="vs-sidebar-note">
        <strong>No Git. No terminal. No jargon.</strong>
        <span>Just build, preview, save, export, and own.</span>
      </div>
    </aside>
  );
}
