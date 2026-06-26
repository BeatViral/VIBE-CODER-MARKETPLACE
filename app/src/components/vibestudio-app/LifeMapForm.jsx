import { Sparkles } from 'lucide-react';

const designVibes = [
  'Premium dark',
  'Clean startup',
  'Friendly simple',
  'Medical/clinical',
  'Creator/music',
  'Trading dashboard',
  'Food/hospitality',
  'Legal/professional',
  'Other',
];

const featureOptions = [
  'Login',
  'Dashboard',
  'Forms',
  'Search/filter',
  'Payments',
  'Messages',
  'File upload',
  'Calendar/booking',
  'Admin panel',
  'AI assistant',
  'Notifications',
  'Export/download',
  'Reports',
  'Ratings/reviews',
  'Project rooms',
  'Owner Mode',
];

const launchGoals = ['Landing page demo', 'Internal tool', 'MVP', 'Investor demo', 'Paid pilot', 'Marketplace prototype', 'Client project'];
const complexityOptions = ['Simple first version', 'Medium MVP', 'Advanced prototype'];

function Field({ label, children, helper }) {
  return (
    <label className="vs-form-field">
      <span>{label}</span>
      {children}
      {helper && <em>{helper}</em>}
    </label>
  );
}

function ChipGroup({ options, value, onChange, multi = false }) {
  const values = Array.isArray(value) ? value : [value].filter(Boolean);

  return (
    <div className="vs-chip-grid">
      {options.map((option) => {
        const active = values.includes(option);
        return (
          <button
            key={option}
            type="button"
            className={`vs-select-chip ${active ? 'vs-select-chip-active' : ''}`}
            onClick={() => {
              if (!multi) {
                onChange(option);
                return;
              }

              onChange(active ? values.filter((item) => item !== option) : [...values, option]);
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default function LifeMapForm({ formData, onChange, onGenerate, limitedNote }) {
  const setField = (field, value) => onChange({ ...formData, [field]: value });

  return (
    <div className="vs-panel-stack">
      <div className="vs-section-head">
        <p className="vs-kicker">Life Map</p>
        <h1>Start with the real-world problem you understand.</h1>
        <p>
          VibeStudio turns lived experience into a workflow map, first useful version, app folder, preview, Owner
          Manual, and export package.
        </p>
      </div>

      {limitedNote && <div className="vs-success-note">{limitedNote}</div>}

      <div className="vs-form-grid">
        <Field label="Project name">
          <input value={formData.projectName || ''} onChange={(event) => setField('projectName', event.target.value)} placeholder="SessionPilot, KitchenDrop, ClinicFlow" />
        </Field>
        <Field label="In real life, I am a">
          <input value={formData.realLifeRole || ''} onChange={(event) => setField('realLifeRole', event.target.value)} placeholder="music producer, trader, doctor, chef, teacher" />
        </Field>
        <Field label="My industry/world is">
          <input value={formData.industry || ''} onChange={(event) => setField('industry', event.target.value)} placeholder="music, trading, healthcare, food, legal" />
        </Field>
        <Field label="The person suffering from this problem is">
          <input value={formData.personSuffering || ''} onChange={(event) => setField('personSuffering', event.target.value)} placeholder="artist, patient, chef, trader, customer" />
        </Field>
      </div>

      <div className="vs-form-grid vs-form-grid-wide">
        <Field label="The problem I understand is">
          <textarea value={formData.problem || ''} onChange={(event) => setField('problem', event.target.value)} rows={4} />
        </Field>
        <Field label="The workflow that breaks is" helper="Describe the real process from beginning to end.">
          <textarea value={formData.workflowBreaks || ''} onChange={(event) => setField('workflowBreaks', event.target.value)} rows={4} />
        </Field>
        <Field label="The current workaround is">
          <textarea value={formData.currentWorkaround || ''} onChange={(event) => setField('currentWorkaround', event.target.value)} rows={3} placeholder="spreadsheets, WhatsApp, paper, screenshots, manual calls" />
        </Field>
        <Field label="What a generic coder would probably miss is" helper="This captures your lived-experience advantage.">
          <textarea value={formData.genericCoderMiss || ''} onChange={(event) => setField('genericCoderMiss', event.target.value)} rows={3} />
        </Field>
      </div>

      <div className="vs-form-grid">
        <Field label="The first useful result should be">
          <input value={formData.firstUsefulResult || ''} onChange={(event) => setField('firstUsefulResult', event.target.value)} placeholder="finish songs, manage bookings, qualify leads" />
        </Field>
        <Field label="Who would use this app?">
          <input value={formData.users || ''} onChange={(event) => setField('users', event.target.value)} />
        </Field>
        <Field label="What should users be able to do first?">
          <input value={formData.userFirstActions || ''} onChange={(event) => setField('userFirstActions', event.target.value)} />
        </Field>
        <Field label="What should owners/admins be able to do?">
          <input value={formData.ownerActions || ''} onChange={(event) => setField('ownerActions', event.target.value)} />
        </Field>
        <Field label="Saved information" helper="Examples: users, orders, projects, appointments, messages, payments, notes">
          <input value={formData.savedInformation || ''} onChange={(event) => setField('savedInformation', event.target.value)} />
        </Field>
        <Field label="What outside services might it need?" helper="Examples: email, payments, AI, maps, calendar, file upload, login">
          <input value={formData.outsideServices || ''} onChange={(event) => setField('outsideServices', event.target.value)} />
        </Field>
      </div>

      <div className="vs-form-block">
        <span>Design vibe</span>
        <ChipGroup options={designVibes} value={formData.designVibe || 'Premium dark'} onChange={(value) => setField('designVibe', value)} />
      </div>

      <div className="vs-form-block">
        <span>Must-have features</span>
        <ChipGroup options={featureOptions} value={formData.mustHaveFeatures || []} onChange={(value) => setField('mustHaveFeatures', value)} multi />
      </div>

      <div className="vs-form-grid">
        <Field label="What should NOT be built yet?">
          <textarea value={formData.doNotBuildYet || ''} onChange={(event) => setField('doNotBuildYet', event.target.value)} rows={3} />
        </Field>
        <div className="vs-form-block">
          <span>Launch goal</span>
          <ChipGroup options={launchGoals} value={formData.launchGoal || 'Investor demo'} onChange={(value) => setField('launchGoal', value)} />
        </div>
        <div className="vs-form-block">
          <span>Complexity preference</span>
          <ChipGroup options={complexityOptions} value={formData.complexity || 'Simple first version'} onChange={(value) => setField('complexity', value)} />
        </div>
      </div>

      <div className="vs-action-band">
        <div>
          <strong>Generate App Workspace</strong>
          <span>Creates Workflow Map, First Useful Version, app folder, preview, Owner Manual, and export package.</span>
        </div>
        <button type="button" className="vs-primary-action" onClick={onGenerate}>
          <Sparkles className="size-4" />
          Generate App Workspace
        </button>
      </div>
    </div>
  );
}
