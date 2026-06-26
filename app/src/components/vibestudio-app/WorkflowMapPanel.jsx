import OutputPanel from './OutputPanel.jsx';

export default function WorkflowMapPanel({ generated }) {
  return (
    <OutputPanel
      eyebrow="Workflow Map"
      title="The real-world process, translated into Plain."
      text="This is the map VibeStudio uses before creating pages, saved information, preview, and owner documents."
      rows={generated?.workflowMap || []}
    />
  );
}
