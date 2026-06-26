import { HelpCircle, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const quickQuestions = ['Explain in plain English', 'Show me an example from my app', 'What can break?', 'What should I test?', 'Is this safe to touch?'];

function makeAnswer(question, formData) {
  const appName = formData.projectName || 'your app';
  const savedInfo = formData.savedInformation || 'the information your app needs to remember';
  const outsideServices = formData.outsideServices || 'any outside services you add later';

  if (question.toLowerCase().includes('break')) {
    return `In ${appName}, the safest things to check are pages, forms, saved information, and outside services. If you change anything connected to ${savedInfo}, test the main user flow before sharing.`;
  }

  if (question.toLowerCase().includes('test')) {
    return `Test the first useful action, each generated page, mobile preview, saved information, and any outside services like ${outsideServices}.`;
  }

  if (question.toLowerCase().includes('safe')) {
    return 'Start small. Save the project first, describe the change in plain English, check the pages it touches, then preview before exporting.';
  }

  if (question.toLowerCase().includes('example')) {
    return `In ${appName}, saved information means ${savedInfo}. VibeStudio uses that to shape pages, preview cards, owner notes, and export files.`;
  }

  return `Here is the plain version: VibeStudio is turning your app idea into a plan, preview, pages, files, owner notes, and an export package. You do not need Git, terminal, or deployment language to understand it.`;
}

export default function HelpPanel({ formData }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(makeAnswer('Explain in plain English', formData));

  const ask = (value = question) => {
    const nextQuestion = value.trim() || 'Explain in plain English';
    setQuestion(nextQuestion);
    setAnswer(makeAnswer(nextQuestion, formData));
  };

  return (
    <div className="vs-panel-stack">
      <div className="vs-section-head">
        <p className="vs-kicker">Help</p>
        <h1>Need help understanding something?</h1>
        <p>Ask in plain English. VibeStudio explains using your app.</p>
      </div>
      <div className="vs-help-grid">
        <section className="vs-help-card">
          <MessageCircle className="size-5 text-cyanNeon" />
          <h2>Ask a question</h2>
          <textarea value={question} onChange={(event) => setQuestion(event.target.value)} rows={5} placeholder="What does saved information mean? What should I test? Is this safe to touch?" />
          <button type="button" className="vs-primary-action" onClick={() => ask()}>
            <HelpCircle className="size-4" />
            Ask Help
          </button>
        </section>
        <section className="vs-help-card vs-help-answer">
          <span>Answer</span>
          <p>{answer}</p>
        </section>
      </div>
      <div className="vs-chip-grid">
        {quickQuestions.map((item) => (
          <button key={item} type="button" className="vs-select-chip" onClick={() => ask(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
