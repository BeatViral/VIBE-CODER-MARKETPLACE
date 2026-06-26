import CopyButton from './CopyButton.jsx';
import FileTree from './FileTree.jsx';
import FileViewer from './FileViewer.jsx';

export default function ProjectFilesPanel({ generated, selectedFile, onSelectFile }) {
  const fileTree = generated?.fileTree || [];
  const files = generated?.files || {};
  const selectedContent = selectedFile ? files[selectedFile] : '';
  const allFilesText = Object.entries(files)
    .map(([path, content]) => `# ${path}\n\n${content}`)
    .join('\n\n---\n\n');

  return (
    <div className="vs-panel-stack">
      <div className="vs-section-head">
        <p className="vs-kicker">Project Files</p>
        <h1>App Folder</h1>
        <p>
          These are the app files VibeStudio created for your project. You do not need to edit them directly.
          VibeStudio shows them so you can see what your app is made of, save a backup, or hand the project to someone
          else.
        </p>
        <div className="vs-inline-actions">
          <CopyButton text={fileTree.join('\n')} label="Copy file tree" />
          <CopyButton text={allFilesText} label="Copy all files" />
        </div>
      </div>

      <div className="vs-files-grid">
        <FileTree paths={fileTree} selectedPath={selectedFile} onSelect={onSelectFile} />
        <FileViewer path={selectedFile} content={selectedContent} />
      </div>
    </div>
  );
}
