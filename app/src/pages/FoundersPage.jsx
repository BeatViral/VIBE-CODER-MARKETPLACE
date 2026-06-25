import CtaBand from '../components/CtaBand.jsx';
import PageHero from '../components/PageHero.jsx';
import { WorkflowGrid } from '../components/ui.jsx';

export default function FoundersPage() {
  return (
    <section className="page-shell">
      <div className="mx-auto max-w-7xl">
        <PageHero
          badge="For founders"
          title="Find a builder who already understands your world."
          text="You should not have to spend hours translating your industry to someone who only knows frameworks. A healthcare founder can find healthcare fluency. A music founder can find creative fluency. Discover experience-first AI builders who understand the workflow, bottlenecks, pressure, customers, and friction before they build."
        />
        <WorkflowGrid
          items={[
            ['Post your idea', 'Describe the problem, the customer, and the domain pressure.'],
            ['Browse experience-first builders', 'Search by profession, industry, AI tools, proof, and availability.'],
            ['Match by domain nuance', 'Find people who have lived the workflow and know what should never be flattened.'],
            ['Start a scoped MVP', 'Turn the idea into a sharp first version with visible milestones.'],
            ['Keep ownership and clarity', 'Founder-owned repo, assets, handover docs, and build history.'],
            ['Launch faster', 'Ship the useful proof before the market moment passes.'],
          ]}
        />
        <div className="mt-14">
          <CtaBand />
        </div>
      </div>
    </section>
  );
}
