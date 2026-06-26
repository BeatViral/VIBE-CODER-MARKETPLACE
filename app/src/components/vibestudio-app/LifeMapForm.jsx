import { ChevronDown, FolderTree, Play, Sparkles } from 'lucide-react';
import { useState } from 'react';
import SavedProjectsPanel from './SavedProjectsPanel.jsx';

const appTypeChips = ['Website', 'Dashboard', 'Marketplace', 'Internal tool', 'Booking app', 'Client portal', 'Admin tool', 'Personal app'];
const styleChips = ['Clean', 'Premium', 'Friendly', 'Professional', 'Dark', 'Simple'];
const featureOptions = ['Login', 'Dashboard', 'Forms', 'Search/filter', 'Payments', 'Messages', 'File upload', 'Calendar/booking', 'Admin panel', 'AI assistant', 'Export/download', 'Project rooms', 'Owner Mode'];

function Field({ label, children, helper }) {
  return (
    <label className="vs-form-field">
      <span>{label}</span>
      {children}
      {helper && <em>{helper}</em>}
    </label>
  );
}

function ChipGroup({ options, value, onChange, multi = false, className = '' }) {
  const values = Array.isArray(value) ? value : [value].filter(Boolean);

  return (
    <div className={`vs-chip-grid ${className}`}>
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

export default function LifeMapForm({
  formData,
  limitedNote,
  onChange,
  onDelete,
  onDuplicate,
  onGenerate,
  onLoad,
  onLoadSample,
  projects = [],
}) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const setField = (field, value) => onChange({ ...formData, [field]: value });

  return (
    <div className="vs-panel-stack">
      <div className="vs-prompt-card">
        <p className="vs-kicker">VibeStudio</p>
        <h1>What do you want to build?</h1>
        <p>
          Describe the app in your own words. VibeStudio will turn it into a preview, pages, project files, owner notes,
          and an export package.
        </p>

        <textarea
          className="vs-prompt-box"
          value={formData.builderPrompt || ''}
          onChange={(event) => setField('builderPrompt', event.target.value)}
          placeholder={'Build me a simple app for home cooks to take pickup orders.\nBuild me a trading review dashboard that tracks bad entries.\nBuild me a music session planner for artists finishing songs.\nBuild me a legal call intake tool for attorneys.'}
          rows={7}
        />

        <div className="vs-quick-row">
          <span>No Git. No terminal. No jargon.</span>
          <div>
            <button type="button" className="vs-primary-action" onClick={onGenerate}>
              <Sparkles className="size-4" />
              Build App
            </button>
            <button type="button" className="vs-mini-button vs-mini-button-hot" onClick={onLoadSample}>
              <Play className="size-4" />
              Load Sample
            </button>
            <button
              type="button"
              className="vs-mini-button"
              onClick={() => document.getElementById('saved-projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <FolderTree className="size-4" />
              Open Saved Project
            </button>
          </div>
        </div>
      </div>

      {limitedNote && <div className="vs-success-note">{limitedNote}</div>}

      <div className="vs-simple-options">
        <div>
          <span>Optional type</span>
          <ChipGroup options={appTypeChips} value={formData.appType || ''} onChange={(value) => setField('appType', value)} />
        </div>
        <div>
          <span>Optional style</span>
          <ChipGroup options={styleChips} value={formData.styleMood || ''} onChange={(value) => setField('styleMood', value)} />
        </div>
      </div>

      <div className="vs-followup-grid">
        <Field label="Who is this mainly for?">
          <input value={formData.users || ''} onChange={(event) => setField('users', event.target.value)} placeholder="artists, doctors, attorneys, customers..." />
        </Field>
        <Field label="What should they be able to do first?">
          <input value={formData.userFirstActions || ''} onChange={(event) => setField('userFirstActions', event.target.value)} placeholder="place an order, review trades, create a session..." />
        </Field>
        <Field label="Website, dashboard, marketplace, or internal tool?">
          <input value={formData.launchShape || ''} onChange={(event) => setField('launchShape', event.target.value)} placeholder="dashboard, booking app, internal tool..." />
        </Field>
      </div>

      <div className="vs-advanced-shell">
        <button type="button" className="vs-advanced-toggle" onClick={() => setAdvancedOpen((value) => !value)}>
          <ChevronDown className={`size-4 ${advancedOpen ? 'rotate-180' : ''}`} />
          Advanced details
        </button>

        {advancedOpen && (
          <div className="vs-advanced-grid">
            <Field label="Project name">
              <input value={formData.projectName || ''} onChange={(event) => setField('projectName', event.target.value)} placeholder="SessionPilot, KitchenDrop, ClinicFlow" />
            </Field>
            <Field label="In real life, I am a">
              <input value={formData.realLifeRole || ''} onChange={(event) => setField('realLifeRole', event.target.value)} placeholder="music producer, trader, doctor, chef" />
            </Field>
            <Field label="The workflow that breaks is">
              <textarea value={formData.workflowBreaks || ''} onChange={(event) => setField('workflowBreaks', event.target.value)} rows={3} />
            </Field>
            <Field label="What a generic coder would miss">
              <textarea value={formData.genericCoderMiss || ''} onChange={(event) => setField('genericCoderMiss', event.target.value)} rows={3} />
            </Field>
            <Field label="Saved information">
              <input value={formData.savedInformation || ''} onChange={(event) => setField('savedInformation', event.target.value)} placeholder="users, orders, projects, notes" />
            </Field>
            <Field label="Outside services">
              <input value={formData.outsideServices || ''} onChange={(event) => setField('outsideServices', event.target.value)} placeholder="email, payments, AI, calendar" />
            </Field>
            <Field label="What should not be built yet?">
              <textarea value={formData.doNotBuildYet || ''} onChange={(event) => setField('doNotBuildYet', event.target.value)} rows={3} />
            </Field>
            <div className="vs-form-block">
              <span>Must-have features</span>
              <ChipGroup options={featureOptions} value={formData.mustHaveFeatures || []} onChange={(value) => setField('mustHaveFeatures', value)} multi />
            </div>
          </div>
        )}
      </div>

      <div id="saved-projects">
        <SavedProjectsPanel projects={projects} onDelete={onDelete} onDuplicate={onDuplicate} onLoad={onLoad} />
      </div>
    </div>
  );
}
