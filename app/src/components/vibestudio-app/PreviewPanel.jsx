import { Monitor, RefreshCw, Smartphone } from 'lucide-react';
import { useState } from 'react';
import CopyButton from './CopyButton.jsx';

export default function PreviewPanel({ generated }) {
  const [mode, setMode] = useState('desktop');
  const preview = generated?.previewData;

  if (!preview) {
    return <div className="vs-empty-state">Generate a workspace to preview the app.</div>;
  }

  const summary = `${preview.title}\n${preview.subtitle}\nPages: ${preview.pages.join(', ')}\nSaved information: ${preview.savedInformation.join(', ')}`;

  return (
    <div className="vs-panel-stack">
      <div className="vs-section-head">
        <p className="vs-kicker">Preview</p>
        <h1>See your app before shipping.</h1>
        <p>Preview lets you see your app before shipping. This is your local view. It is not live on the internet yet.</p>
        <div className="vs-inline-actions">
          <button type="button" className={`vs-mini-button ${mode === 'desktop' ? 'vs-mini-button-hot' : ''}`} onClick={() => setMode('desktop')}>
            <Monitor className="size-4" />
            Desktop
          </button>
          <button type="button" className={`vs-mini-button ${mode === 'mobile' ? 'vs-mini-button-hot' : ''}`} onClick={() => setMode('mobile')}>
            <Smartphone className="size-4" />
            Mobile
          </button>
          <button type="button" className="vs-mini-button">
            <RefreshCw className="size-4" />
            Refresh Preview
          </button>
          <CopyButton text={summary} label="Copy preview summary" />
        </div>
      </div>

      <div className={`vs-preview-frame ${mode === 'mobile' ? 'vs-preview-frame-mobile' : ''}`}>
        <div className="vs-preview-app">
          <nav>
            <strong>{preview.title}</strong>
            <div>
              {preview.pages.slice(0, 5).map((page) => (
                <span key={page}>{page}</span>
              ))}
            </div>
          </nav>
          <section className="vs-preview-hero">
            <p>{preview.ownerPanel.status}</p>
            <h2>{preview.title}</h2>
            <span>{preview.subtitle}</span>
          </section>
          <section className="vs-preview-grid">
            {preview.features.slice(0, 6).map((feature) => (
              <article key={feature}>
                <span>Feature</span>
                <strong>{feature}</strong>
              </article>
            ))}
          </section>
          <section className="vs-preview-grid">
            {preview.savedInformation.slice(0, 6).map((item) => (
              <article key={item}>
                <span>Saved information</span>
                <strong>{item}</strong>
              </article>
            ))}
          </section>
          <aside className="vs-preview-owner">
            <strong>Owner Mode</strong>
            <p>{preview.ownerPanel.manual}</p>
            <p>App folder: {preview.ownerPanel.folder}</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
