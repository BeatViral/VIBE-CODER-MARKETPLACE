import OutputPanel from './OutputPanel.jsx';

export default function OwnerManualPanel({ generated }) {
  return (
    <OutputPanel
      eyebrow="Owner Manual"
      title="Know what you own. Know how to keep it alive."
      text="This is not technical documentation. It is the plain-English guide to the app."
      rows={generated?.ownerManual || []}
    />
  );
}
