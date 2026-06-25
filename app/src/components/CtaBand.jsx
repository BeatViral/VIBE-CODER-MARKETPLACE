import { MessageCircle, Rocket, Sparkles } from 'lucide-react';
import { Badge, Button } from './ui.jsx';

export default function CtaBand() {
  return (
    <section className="section-shell pb-24">
      <div className="cta-band reveal">
        <Badge tone="coral" icon={Sparkles}>
          Experience beats syntax
        </Badge>
        <h2 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
          Your experience is your code.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
          Stop waiting for a developer to understand your world. You already know the problem. AI can help with the
          code. That is enough to start.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/builders" icon={Rocket}>
            Join as a Vibe Coder
          </Button>
          <Button to="/founders" variant="ghost" icon={MessageCircle}>
            Post Your Idea
          </Button>
        </div>
      </div>
    </section>
  );
}
