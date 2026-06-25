import { Sparkles } from 'lucide-react';
import { Badge } from './ui.jsx';

export function PageHero({ badge, title, text, center = false }) {
  return (
    <div className={`reveal ${center ? 'mx-auto text-center' : ''} max-w-5xl`}>
      <Badge tone="cyan" icon={Sparkles}>
        {badge}
      </Badge>
      <h1 className="mt-6 font-display text-5xl font-bold leading-tight text-white sm:text-7xl">{title}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">{text}</p>
    </div>
  );
}

export default PageHero;
