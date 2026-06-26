import { Download } from 'lucide-react';
import CopyButton from './CopyButton.jsx';

export default function ExportPackagePanel({ generated }) {
  const markdown = generated?.fullMarkdown || '';
  const ownerManual = generated?.ownerManual?.map(([title, text]) => `## ${title}\n\n${text}`).join('\n\n') || '';
  const filesText = Object.entries(generated?.files || {})
    .map(([path, content]) => `# ${path}\n\n${content}`)
    .join('\n\n---\n\n');

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${generated?.projectName || 'vibestudio-package'}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="vs-panel-stack">
      <div className="vs-section-head">
        <p className="vs-kicker">Export Package</p>
        <h1>Take the project with you.</h1>
        <p>
          VibeStudio v1 runs locally. Web link publishing and desktop app export will come later. You should never need
          to understand Git, terminal, branches, commits, or deployment settings.
        </p>
        <div className="vs-inline-actions">
          <CopyButton text={markdown} label="Copy Full Markdown Package" />
          <button type="button" className="vs-mini-button vs-mini-button-hot" onClick={downloadMarkdown} disabled={!markdown}>
            <Download className="size-4" />
            Download Markdown
          </button>
          <CopyButton text={filesText} label="Copy Project Files" />
          <CopyButton text={ownerManual} label="Copy Owner Manual" />
        </div>
      </div>

      <div className="vs-export-options">
        {[
          ['Copy full package', 'Available now'],
          ['Download Markdown', 'Available now'],
          ['Copy app files', 'Available now'],
          ['Prepare for future web link', 'Available now'],
          ['Create Website Link', 'Coming later'],
          ['Create Desktop App', 'Coming later'],
        ].map(([label, status]) => (
          <article key={label} className="vs-export-option">
            <strong>{label}</strong>
            <span>{status}</span>
          </article>
        ))}
      </div>

      <div className="vs-export-preview">
        <pre>{markdown || 'Generate a workspace to create the full Markdown package.'}</pre>
      </div>
    </div>
  );
}
