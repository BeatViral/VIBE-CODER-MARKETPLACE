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

export function VibeGuideInterface() {
  const helpMemory = [
    ['Saved information', '12 times', 'Still learning'],
    ['Secret keys', '7 times', 'Needs caution'],
    ['Pages/layout', '3 times', 'Comfortable'],
    ['Payments', '9 times', 'Risk area'],
    ['Launching', '5 times', 'Improving'],
  ];

  return (
    <div className="vibeguide-interface">
      <div className="guide-cockpit-main">
        <div className="guide-window guide-window-build">
          <div className="guide-window-head">
            <Code2 className="size-4 text-ultraviolet" />
            <span>Build Conversation</span>
          </div>
          {['Add a booking page.', 'Create the customer form.', 'Generate the handover pack.'].map((item) => (
            <div key={item} className="guide-chat-line">
              {item}
            </div>
          ))}
        </div>
        <div className="guide-window guide-window-help">
          <div className="guide-window-head">
            <MessageCircle className="size-4 text-cyanNeon" />
            <span>
              VibeGuide<sup>&trade;</sup> Help Conversation
            </span>
          </div>
          {[
            'You have asked about saved information 12 times.',
            'This change touches data storage.',
            'Want me to explain it using your app?',
            'Recommended next safe step: create a checkpoint.',
          ].map((item) => (
            <div key={item} className="guide-chat-line guide-chat-line-active">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="guide-cockpit-side">
        <div className="guide-memory-panel">
          <span>Help Memory</span>
          {helpMemory.map(([topic, asked, confidence]) => (
            <div key={topic}>
              <strong>{topic}</strong>
              <em>{asked}</em>
              <p>{confidence}</p>
            </div>
          ))}
        </div>
        <div className="guide-mini-grid">
          {[
            ['Stuck Points', 'Secret keys, payments'],
            ['Learning Trail', 'Pages -> data -> launch'],
            ['Confidence Map', 'Layout comfortable'],
            ['Next Safe Step', 'Create checkpoint'],
          ].map(([label, value]) => (
            <span key={label}>
              <strong>{label}</strong>
              <em>{value}</em>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConversationPanel({ title, description, items, highlight = false }) {
  return (
    <article className={`conversation-panel reveal ${highlight ? 'conversation-panel-highlight' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase text-cyanNeon">{highlight ? 'Help space' : 'Build space'}</p>
          <h3>{title}</h3>
        </div>
        {highlight ? <MessageCircle className="size-5 text-cyanNeon" /> : <Code2 className="size-5 text-ultraviolet" />}
      </div>
      <p>{description}</p>
      <div className="conversation-examples">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
}

export function HelpMemoryDashboard({ items }) {
  return (
    <div className="help-memory-dashboard reveal">
      <div className="manual-toolbar">
        <span>Help Memory</span>
        <Badge tone="cyan" icon={Bookmark}>
          Learning profile
        </Badge>
      </div>
      <div className="memory-table">
        <div className="memory-table-head">
          <span>Topic</span>
          <span>Asked</span>
          <span>Confidence</span>
          <span>Last asked</span>
        </div>
        {items.map(([topic, asked, confidence, lastAsked]) => (
          <div key={topic} className="memory-table-row">
            <strong>{topic}</strong>
            <span>{asked}</span>
            <span>{confidence}</span>
            <span>{lastAsked}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ConfidenceMapPanel({ sections }) {
  return (
    <div className="confidence-map-panel reveal">
      {sections.map(([title, items]) => (
        <article key={title} className="confidence-map-card">
          <h3>{title}</h3>
          <div>
            {items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
