import { Copy, FolderOpen, Trash2 } from 'lucide-react';

export default function SavedProjectsPanel({ projects, onDelete, onDuplicate, onLoad }) {
  return (
    <div className="vs-saved-panel">
      <div className="vs-section-head vs-section-head-compact">
        <p className="vs-kicker">Saved locally</p>
        <h2>Load Saved Project</h2>
        <p>Saved projects live in this browser on this computer.</p>
      </div>
      <div className="vs-saved-list">
        {projects.length === 0 && <div className="vs-empty-mini">No saved projects yet. Load the sample or generate your first workspace.</div>}
        {projects.map((project) => (
          <article key={project.id} className="vs-saved-item">
            <div>
              <strong>{project.name || project.formData?.projectName || 'Untitled project'}</strong>
              <span>Updated {project.updatedAt ? new Date(project.updatedAt).toLocaleString() : 'just now'}</span>
            </div>
            <div>
              <button type="button" onClick={() => onLoad(project.id)} aria-label="Load project">
                <FolderOpen className="size-4" />
              </button>
              <button type="button" onClick={() => onDuplicate(project.id)} aria-label="Duplicate project">
                <Copy className="size-4" />
              </button>
              <button type="button" onClick={() => onDelete(project.id)} aria-label="Delete project">
                <Trash2 className="size-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
