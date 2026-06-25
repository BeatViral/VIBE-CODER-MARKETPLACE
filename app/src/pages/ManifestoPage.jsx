import PageHero from '../components/PageHero.jsx';

export default function ManifestoPage() {
  const lines = [
    ['Coders are syntax-first.', 'Vibe coders are experience-first.'],
    ['AI made syntax cheap.', 'Experience became the new moat.'],
    ['A vibe coder has lived experience.', 'They use AI to build anything they imagine.'],
    ['Your industry is your advantage.', 'Not your prison.'],
    ['A coder knows how to build.', 'A vibe coder knows why it needs to be built.'],
    ['A coder builds apps.', 'A vibe coder builds solutions.'],
    ['A coder builds from code.', 'A vibe coder builds from life.'],
  ];

  return (
    <section className="page-shell">
      <div className="mx-auto max-w-6xl">
        <PageHero
          badge="Manifesto"
          title="The Vibe Coder Manifesto"
          text="Before AI, software belonged mainly to people who could write syntax. After AI, software also belongs to people who understand problems."
          center
        />
        <div className="mt-12 grid gap-5">
          {lines.map(([coder, vibe]) => (
            <div key={coder} className="manifesto-line reveal">
              <p className="text-zinc-500">{coder}</p>
              <p className="gradient-text">{vibe}</p>
            </div>
          ))}
        </div>
        <div className="reveal mt-14 border-y border-white/10 py-12 text-center">
          <p className="mx-auto max-w-4xl text-xl leading-9 text-zinc-300">
            The future of software will not only be built by coders. It will be built by doctors, farmers, musicians,
            chefs, teachers, traders, nurses, mechanics, operators, paralegals, therapists, retailers, and founders who
            know the pain and use AI to make the solution real.
          </p>
          <p className="mt-8 font-display text-5xl font-bold text-white">Experience beats syntax.</p>
        </div>
      </div>
    </section>
  );
}
