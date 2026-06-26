import { BookOpen, Box, Eye, FileText, FolderTree, HelpCircle, Home, ListChecks, Package, PanelsTopLeft } from 'lucide-react';

const icons = {
  start: Home,
  plan: ListChecks,
  preview: Eye,
  pages: PanelsTopLeft,
  files: FolderTree,
  owner: BookOpen,
  export: Package,
  help: HelpCircle,
};

export const workspaceTabs = [
  ['start', 'Start'],
  ['plan', 'Plan'],
  ['preview', 'Preview'],
  ['pages', 'Pages'],
  ['files', 'Files'],
  ['owner', 'Owner Notes'],
  ['export', 'Export'],
  ['help', 'Help'],
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
          const locked = !generated && !['start', 'help'].includes(id);

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
