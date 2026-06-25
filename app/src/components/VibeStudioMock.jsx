import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Code2,
  GitCompare,
  Grid3X3,
  Heart,
  Layers3,
  Menu,
  MessageCircle,
  Rocket,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  UserRoundCheck,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import { Badge } from './ui.jsx';

export function VibeStudioProductGallery() {
  const panels = [
    {
      title: 'Life Map',
      eyebrow: 'Start from lived experience',
      accent: 'cyan',
      rows: ['In real life, I am a clinic operator.', 'The workflow that breaks is patient intake.', 'What a generic coder would miss is handoff pressure.'],
    },
    {
      title: 'Workflow Map',
      eyebrow: 'Turn experience into product shape',
      accent: 'violet',
      rows: ['Users: front desk, nurse, doctor', 'Saved information: notes, triage status, appointment reason', 'First useful version: intake + routing'],
    },
    {
      title: 'Build Studio',
      eyebrow: 'Plain-English build prompt',
      accent: 'amber',
      rows: ['Create the intake page.', 'Add a triage dashboard.', 'Generate a Codex-ready implementation plan.'],
    },
    {
      title: 'Owner Mode',
      eyebrow: 'Know what you own',
      accent: 'green',
      rows: ['App health: stable', 'Services: Supabase, Resend, Stripe', 'Risk: payment webhook needs test'],
    },
    {
      title: 'Safe Update Flow',
      eyebrow: 'Change without panic',
      accent: 'coral',
      rows: ['Create checkpoint', 'Explain affected pages', 'Test login, payments, saved information'],
    },
    {
      title: 'Owner Manual',
      eyebrow: 'Readable product memory',
      accent: 'cyan',
      rows: ['What this app does', 'What can break', 'What not to touch'],
    },
    {
      title: 'Handover Pack',
      eyebrow: 'Transfer without black boxes',
      accent: 'violet',
      rows: ['App summary', 'Service list', 'Secret keys checklist'],
    },
    {
      title: 'VibeGuide',
      eyebrow: 'Help that learns you',
      accent: 'amber',
      rows: ['Saved information asked 12 times', 'Confidence: still learning', 'Next safe step: create checkpoint'],
    },
  ];

  return (
    <div className="product-gallery">
      {panels.map((panel) => (
        <article key={panel.title} className={`product-panel product-panel-${panel.accent} reveal`}>
          <div className="product-panel-head">
            <span>{panel.eyebrow}</span>
            <strong>{panel.title}</strong>
          </div>
          <div className="product-panel-screen">
            {panel.rows.map((row) => (
              <div key={row}>
                <CheckCircle2 className="size-4 text-acid" />
                <p>{row}</p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export function VibeStudioWorkspaceMock() {
  const tabs = ['Life Map', 'Workflow Map', 'Build Studio', 'Owner Mode', 'Handover Pack', 'VibeGuide'];
  return (
    <div className="studio-mock reveal">
      <div className="studio-topbar">
        <span className="studio-dot bg-coral" />
        <span className="studio-dot bg-amberSignal" />
        <span className="studio-dot bg-acid" />
        <strong>VibeStudio workspace</strong>
      </div>
      <div className="studio-tabs">
        {tabs.map((tab, index) => (
          <span key={tab} className={index === 5 ? 'studio-tab-active' : ''}>
            {tab === 'VibeGuide' ? (
              <>
                VibeGuide<sup>&trade;</sup>
              </>
            ) : (
              tab
            )}
          </span>
        ))}
      </div>
      <div className="studio-body">
        <div className="studio-sidebar">
          {['App summary', 'Pages', 'Saved information', 'Outside services', 'Secret keys', 'Safe updates'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="studio-main-panel">
          <Badge tone="cyan" icon={ShieldCheck}>
            VibeGuide<sup>&trade;</sup>
          </Badge>
          <h3>Help that learns how you learn.</h3>
          <div className="studio-health-grid">
            {[
              ['Repeated topic', 'Saved information'],
              ['Asked', '12 times'],
              ['Confidence', 'Still learning'],
              ['Next lesson', 'How data is saved'],
              ['Safe step', 'Create checkpoint'],
              ['Tone', 'Warm and plain'],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComparisonList({ title, items, muted = false }) {
  return (
    <div className={`comparison-list reveal ${muted ? 'comparison-list-muted' : ''}`}>
      <h3>{title}</h3>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="comparison-list-row">
            <CheckCircle2 className={`size-4 ${muted ? 'text-zinc-500' : 'text-acid'}`} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OwnerModeDashboard() {
  const health = [
    ['Last deploy', '2 days ago'],
    ['Services', '5 connected'],
    ['Secret keys', 'All active'],
    ['Saved information', '68% free tier used'],
    ['Login', 'Working'],
    ['Payments', 'Needs test'],
    ['Mobile layout', 'Passed'],
    ['Known risk', 'Payment webhook not verified'],
  ];

  return (
    <div className="owner-dashboard reveal">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase text-cyanNeon">App Health</p>
          <h3 className="mt-2 font-display text-3xl font-bold text-white">KitchenDrop</h3>
        </div>
        <Badge tone="green" icon={CheckCircle2}>
          Stable
        </Badge>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {health.map(([label, value]) => (
          <div key={label} className="owner-health-card">
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-amberSignal/25 bg-amberSignal/10 p-4">
        <p className="text-xs font-bold uppercase text-amberSignal">Next maintenance task</p>
        <p className="mt-2 text-sm leading-6 text-zinc-200">Run payment test before the next public launch.</p>
      </div>
    </div>
  );
}
