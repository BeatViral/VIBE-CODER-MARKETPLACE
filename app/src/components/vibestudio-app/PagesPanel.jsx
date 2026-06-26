import { Pencil } from 'lucide-react';

function humanizePage(page) {
  return page
    .replace(/Page$/, ' page')
    .replace(/Dashboard$/, ' dashboard')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/\s+/g, ' ');
}

function pagePurpose(page, formData) {
  const lower = page.toLowerCase();
  if (lower.includes('home')) return 'Introduces the app and points users to the first useful action.';
  if (lower.includes('dashboard')) return 'Shows the main progress, saved information, and next actions.';
  if (lower.includes('owner')) return 'Gives the owner a control room for understanding and maintaining the app.';
  if (lower.includes('order')) return 'Lets users create, review, or manage orders.';
  if (lower.includes('session') || lower.includes('song')) return 'Helps creators move work from idea to finished output.';
  if (lower.includes('risk') || lower.includes('trade')) return 'Helps users review decisions and spot risky patterns.';
  if (lower.includes('intake')) return 'Collects the right information before the owner or team responds.';
  return `Supports the first useful version for ${formData.projectName || 'this app'}.`;
}

export default function PagesPanel({ formData, generated }) {
  const pages = generated?.previewData?.pages || [];
  const savedInformation = generated?.previewData?.savedInformation || [];
  const firstAction = formData.userFirstActions || 'start and complete the main workflow';

  return (
    <div className="vs-panel-stack">
      <div className="vs-section-head">
        <p className="vs-kicker">Pages</p>
        <h1>The screens your app starts with.</h1>
        <p>These are plain-language page cards. The code files are behind them in Files.</p>
      </div>
      <div className="vs-pages-grid">
        {pages.map((page) => (
          <article key={page} className="vs-page-card">
            <span>Page</span>
            <h2>{humanizePage(page)}</h2>
            <p>{pagePurpose(page, formData)}</p>
            <div>
              <strong>Users can do here</strong>
              <em>{firstAction}</em>
            </div>
            <div>
              <strong>Information it uses</strong>
              <em>{savedInformation.slice(0, 4).join(', ') || 'Project details'}</em>
            </div>
            <button type="button" className="vs-mini-button">
              <Pencil className="size-4" />
              Edit page
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
