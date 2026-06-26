import OutputPanel from './OutputPanel.jsx';

export default function FirstUsefulVersionPanel({ generated }) {
  return (
    <OutputPanel
      eyebrow="First Useful Version"
      title="The smallest useful version worth building."
      text="This keeps the product focused enough to prove the idea without building the entire future too soon."
      rows={generated?.firstUsefulVersion || []}
    />
  );
}
