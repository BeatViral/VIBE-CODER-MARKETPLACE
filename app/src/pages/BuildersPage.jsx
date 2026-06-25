import CtaBand from '../components/CtaBand.jsx';
import PageHero from '../components/PageHero.jsx';
import { DefinitionCallout, WorkflowGrid } from '../components/ui.jsx';

export default function BuildersPage() {
  return (
    <section className="page-shell">
      <div className="mx-auto max-w-7xl">
        <PageHero
          badge="For builders"
          title="Your real-life experience is now a software-building superpower."
          text="You do not need to be a traditional coder to become a builder. If you have lived experience and can use AI to build anything you imagine, you belong here."
        />
        <DefinitionCallout compact />
        <WorkflowGrid
          items={[
            ['Create your builder card', 'Lead with your real-life identity and the software you can build with AI.'],
            ['Show your real-life profession', 'Make your profession the signal founders understand instantly.'],
            ['Prove what you understand', 'Show the workflow, pain, pressure, and customers you know firsthand.'],
            ['Add AI-built demos', 'Upload prototypes, demos, tools used, and build logs.'],
            ['Get verified', 'Earn real-life, AI build, and founder-safe proof badges.'],
            ['Get discovered by founders', 'Turn lived experience into scoped software projects.'],
          ]}
        />
        <div className="mt-14">
          <CtaBand />
        </div>
      </div>
    </section>
  );
}
