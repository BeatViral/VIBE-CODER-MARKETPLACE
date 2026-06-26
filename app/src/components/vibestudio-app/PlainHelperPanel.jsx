import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { plainDictionary, translateToPlain } from '../../utils/plainDictionary.js';

const tabTerms = {
  start: 'Repository',
  plan: 'Routes',
  preview: 'Deployment',
  pages: 'Routes',
  files: 'Repository',
  owner: 'Technical documentation',
  export: 'Build artifact',
  help: 'Database',
};

export default function PlainHelperPanel({ activeTab, formData }) {
  const [term, setTerm] = useState('');
  const selected = useMemo(() => translateToPlain(term || tabTerms[activeTab] || 'Database'), [activeTab, term]);
  const savedInfo = formData.savedInformation || 'users, projects, notes';

  return (
    <aside className="vs-helper">
      <div>
        <p className="vs-kicker">Plain Helper</p>
        <h2>Plain is not code.</h2>
        <p>Plain is how non-coders understand code.</p>
      </div>

      <label className="vs-search">
        <Search className="size-4" />
        <input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Translate: API, commit, database..." />
      </label>

      <div className="vs-plain-card">
        <span>{selected.technical}</span>
        <strong>{selected.plain}</strong>
        <p>{selected.explanation}</p>
      </div>

      <div className="vs-plain-example">
        <span>From your project</span>
        <p>
          In {formData.projectName || 'this app'}, saved information means things like {savedInfo}. These power the pages,
          preview, Owner Manual, and export package.
        </p>
      </div>

      <div className="vs-dictionary-list">
        {plainDictionary.slice(0, 8).map((entry) => (
          <button key={entry.technical} type="button" onClick={() => setTerm(entry.technical)}>
            <span>{entry.technical}</span>
            <strong>{entry.plain}</strong>
          </button>
        ))}
      </div>
    </aside>
  );
}
