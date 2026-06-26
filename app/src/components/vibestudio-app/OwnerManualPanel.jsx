import OutputPanel from './OutputPanel.jsx';

export default function OwnerManualPanel({ generated }) {
  return (
    <OutputPanel
      eyebrow="Owner Manual"
      title="Know what you own. Know how to keep it alive."
      text="Owner Notes are the plain-English guide to the app. The generated Owner Manual lives inside them."
      rows={generated?.ownerManual || []}
    />
  );
}
