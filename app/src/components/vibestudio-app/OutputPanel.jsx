import CopyButton from './CopyButton.jsx';

export function rowsToMarkdown(title, rows = []) {
  return `# ${title}\n\n${rows.map(([label, text]) => `## ${label}\n\n${text}`).join('\n\n')}`;
}

export default function OutputPanel({ title, eyebrow, text, rows = [] }) {
  return (
    <div className="vs-panel-stack">
      <div className="vs-section-head">
        <p className="vs-kicker">{eyebrow}</p>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        <CopyButton text={rowsToMarkdown(title, rows)} label="Copy" />
      </div>

      <div className="vs-output-grid">
        {rows.map(([label, value]) => (
          <article key={label} className="vs-output-card">
            <span>{label}</span>
            <p>{value}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
