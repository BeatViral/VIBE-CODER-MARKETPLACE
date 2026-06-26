import PlainHelperPanel from './PlainHelperPanel.jsx';
import WorkspaceSidebar from './WorkspaceSidebar.jsx';
import WorkspaceTopbar from './WorkspaceTopbar.jsx';

export default function WorkspaceLayout({
  activeTab,
  children,
  formData,
  generated,
  onExport,
  onSave,
  onTabChange,
  projectName,
  saveStatus,
}) {
  return (
    <section className="vs-workspace">
      <WorkspaceTopbar projectName={projectName} saveStatus={saveStatus} onSave={onSave} onExport={onExport} />
      <div className="vs-workspace-grid">
        <WorkspaceSidebar activeTab={activeTab} generated={generated} onTabChange={onTabChange} />
        <main className="vs-main-panel">{children}</main>
        <PlainHelperPanel activeTab={activeTab} formData={formData} />
      </div>
    </section>
  );
}
