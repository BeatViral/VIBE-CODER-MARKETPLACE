import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Rocket, Search, X } from 'lucide-react';
import { Button } from './ui.jsx';

const brandMark = `${import.meta.env.BASE_URL}favicon.svg`;

const navLinks = [
  ['Home', '/'],
  ['Browse Builders', '/browse'],
  ['VibeStudio', '/vibestudio'],
  ['VibeStudio App', '/vibestudio-app'],
  ['Difference', '/difference'],
  ['Are You a Vibe Coder?', '/vibe-coder-if'],
  ['Manifesto', '/manifesto'],
  ['For Founders', '/founders'],
  ['For Builders', '/builders'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-void/[.78] backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-[100rem] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <BrandMark />
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-bold text-white sm:text-base">
              Vibe Coder Marketplace
            </span>
            <span className="block truncate text-xs text-zinc-400">Experience beats syntax.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navLinks.map(([label, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 min-[1700px]:flex">
          <Button to="/browse" variant="ghost" icon={Search}>
            Find a Vibe Coder
          </Button>
          <Button to="/builders" icon={Rocket}>
            Become a Vibe Coder
          </Button>
        </div>

        <button className="icon-button xl:hidden" type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu className="size-5" />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-void/[.96] px-4 py-5 backdrop-blur-xl xl:hidden">
          <div className="mx-auto max-w-lg">
            <div className="flex items-center justify-between">
              <LogoCompact />
              <button className="icon-button" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-8 grid gap-2">
              {navLinks.map(([label, to]) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => `mobile-link ${isActive ? 'mobile-link-active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
            </div>
            <div className="mt-8 grid gap-3">
              <Button to="/browse" icon={Search} onClick={() => setOpen(false)}>
                Find a Vibe Coder
              </Button>
              <Button to="/builders" variant="ghost" icon={Rocket} onClick={() => setOpen(false)}>
                Become a Vibe Coder
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function LogoCompact() {
  return (
    <div className="flex items-center gap-3">
      <BrandMark />
      <span>
        <span className="block font-display text-sm font-bold text-white">Vibe Coder Marketplace</span>
        <span className="block text-xs text-zinc-400">Experience beats syntax.</span>
      </span>
    </div>
  );
}

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img src={brandMark} alt="" />
    </span>
  );
}
