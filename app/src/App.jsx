import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import BrowsePage from './pages/BrowsePage.jsx';
import DifferencePage from './pages/DifferencePage.jsx';
import VibeStudioPage from './pages/VibeStudioPage.jsx';
import VibeCoderIfPage from './pages/VibeCoderIfPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import FoundersPage from './pages/FoundersPage.jsx';
import BuildersPage from './pages/BuildersPage.jsx';
import ManifestoPage from './pages/ManifestoPage.jsx';

function useScrollReveal(refreshKey) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal'));

    if (!nodes.length) {
      return undefined;
    }

    const makeVisible = (node) => node.classList.add('is-visible');
    const fallbackTimer = window.setTimeout(() => {
      nodes.forEach(makeVisible);
    }, 450);

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(makeVisible);
      window.clearTimeout(fallbackTimer);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            makeVisible(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
    );

    nodes.forEach((node) => {
      if (!node.classList.contains('is-visible')) {
        observer.observe(node);
      }
    });

    window.requestAnimationFrame(() => {
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          makeVisible(node);
          observer.unobserve(node);
        }
      });
    });

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [refreshKey]);
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const browserHash = window.location.hash || '';
    const nestedHashStart = browserHash.indexOf('#', 1);
    const nestedHash = nestedHashStart >= 0 ? browserHash.slice(nestedHashStart) : '';
    const activeHash = location.hash || nestedHash;

    if (activeHash) {
      const target = document.getElementById(activeHash.slice(1));

      if (target) {
        window.requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.hash, location.pathname]);

  return null;
}

function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-brand-radial" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:64px_64px] opacity-35" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyanNeon/50 to-transparent" />
    </div>
  );
}

export default function App() {
  const location = useLocation();
  useScrollReveal(`${location.pathname}${location.search}${location.hash}`);

  return (
    <div className="min-h-screen overflow-hidden bg-void text-slate-100">
      <ScrollToTop />
      <SiteBackground />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/difference" element={<DifferencePage />} />
          <Route path="/vibestudio" element={<VibeStudioPage />} />
          <Route path="/vibe-coder-if" element={<VibeCoderIfPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/founders" element={<FoundersPage />} />
          <Route path="/builders" element={<BuildersPage />} />
          <Route path="/manifesto" element={<ManifestoPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
