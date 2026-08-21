import React, { useState, useEffect } from 'react';
import {
  Download,
  Menu,
  X,
  Activity,
  Server,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { triggerApkDownload } from '../utils/downloadHelper';

interface NavbarProps {
  onOpenBackendModal: () => void;
  onOpenInstallGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBackendModal,
  onOpenInstallGuide,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = async () => {
    setDownloading(true);
    await triggerApkDownload();
    setTimeout(() => setDownloading(false), 2000);
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Features', href: '#features' },
    { name: '3D Showcase', href: '#showcase' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Security & Cloud', href: '#security' },
    { name: 'Download', href: '#download' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/90 py-3 shadow-xs'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <a
            href="#hero"
            id="brand-logo-link"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center shadow-xs group-hover:bg-sky-700 transition-colors">
              {/* Medical Cross SVG */}
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 6v12" />
                <path d="M6 12h12" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  Medi<span className="text-sky-600">Assist</span>
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                  APK
                </span>
              </div>
              <span className="text-[11px] text-slate-500 -mt-1 hidden sm:inline font-medium">
                Clinical Health Assistant
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Live Backend Badge */}
            <button
              id="navbar-backend-status-btn"
              onClick={onOpenBackendModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 hover:border-emerald-300 text-xs text-emerald-800 transition-all hover:bg-emerald-100/60"
              title="Click to view online Render backend status"
            >
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <Server className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold">Backend Live</span>
            </button>

            {/* Install Guide Help */}
            <button
              id="navbar-install-guide-btn"
              onClick={onOpenInstallGuide}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
              title="How to install APK on Android"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Primary Download Button */}
            <button
              id="navbar-download-btn"
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
              <span>{downloading ? 'Downloading...' : 'Download APK'}</span>
              <span className="text-[11px] opacity-75 font-mono bg-white/10 px-1.5 py-0.5 rounded">
                v{APP_CONFIG.appVersion}
              </span>
            </button>
          </div>

          {/* Mobile Menu & Download Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-quick-download-btn"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>APK</span>
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-sky-600 font-medium text-sm transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-600">Render Cloud Backend:</span>
              </div>
              <span className="text-xs font-semibold text-emerald-700">Online</span>
            </div>

            <button
              id="drawer-install-guide-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInstallGuide();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-sky-600" />
              <span>Android APK Installation Guide</span>
            </button>

            <button
              id="drawer-download-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                handleDownload();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 text-white font-semibold text-sm shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download MediAssist APK (v{APP_CONFIG.appVersion})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
