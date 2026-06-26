import CopyButton from './CopyButton.jsx';

function valueOr(value, fallback) {
  return value?.trim?.() ? value.trim() : fallback;
}

export default function PlanPanel({ formData, generated }) {
  const pages = generated?.previewData?.pages || [];
  const savedInformation = generated?.previewData?.savedInformation || [];
  const firstUseful = generated?.firstUsefulVersion?.find(([label]) => label === 'Smallest useful version worth building')?.[1];

  const rows = [
    ['What this app is', `${valueOr(formData.projectName, generated?.projectName || 'This app')} is ${valueOr(formData.appType || formData.launchShape, 'a simple app')} for ${valueOr(formData.users || formData.personSuffering, 'the people who need this workflow')}.`],
    ['Who it is for', valueOr(formData.users || formData.personSuffering, 'The main users you described in the prompt.')],
    ['What problem it solves', valueOr(formData.problem || formData.builderPrompt, 'It turns the app idea into a focused first version.')],
    ['First useful version', firstUseful || valueOr(formData.firstUsefulResult, 'A small useful version that proves the idea before building too much.')],
    ['Main pages', pages.join(', ')],
    ['What the app needs to remember', savedInformation.join(', ')],
    ['What can be added later', 'Web link publishing, desktop app export, deeper automation, payments, AI features, analytics, and collaboration can come later.'],
    ['What not to build yet', valueOr(formData.doNotBuildYet, 'Do not build the big future version yet. Build the useful proof first.')],
  ];

  return (
    <div className="vs-panel-stack">
      <div className="vs-section-head">
        <p className="vs-kicker">Plan</p>
        <h1>Your app plan.</h1>
        <p>VibeStudio turned your prompt into a simple build plan. You can refine details later.</p>
        <CopyButton text={rows.map(([label, text]) => `## ${label}\n\n${text}`).join('\n\n')} label="Copy plan" />
      </div>
      <div className="vs-plan-grid">
        {rows.map(([label, text]) => (
          <article key={label} className="vs-plan-card">
            <span>{label}</span>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
