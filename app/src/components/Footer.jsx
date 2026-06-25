import { Link } from 'react-router-dom';
import { LogoCompact } from './Navbar.jsx';

const footerLinks = [
  ['Browse Builders', '/browse'],
  ['VibeStudio', '/vibestudio'],
  ['Difference', '/difference'],
  ['Manifesto', '/manifesto'],
  ['For Founders', '/founders'],
  ['For Builders', '/builders'],
  ['Categories', '/browse'],
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <LogoCompact />
          <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-400">
            Vibe Coder Marketplace finds experience-first AI builders. VibeStudio helps owners build, ship, understand, maintain, and own the app.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {footerLinks.map(([label, to]) => (
            <Link key={label} to={to} className="text-sm text-zinc-400 transition hover:text-cyanNeon">
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-5 border-t border-white/10 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center">
        <span>Coders build from code. Vibe coders build from life.</span>
        <span className="flex flex-wrap gap-3">
          <a href="https://github.com/BeatViral/VIBE-CODER-MARKETPLACE" className="footer-action">
            GitHub
          </a>
          <a href="mailto:hello@vibecoder.market" className="footer-action">
            Email
          </a>
        </span>
      </div>
    </footer>
  );
}
