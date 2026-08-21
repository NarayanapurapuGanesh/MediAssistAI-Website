import React from 'react';
import {
  Download,
  ShieldCheck,
  Server,
  Github,
  ChevronUp,
  Heart,
} from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { triggerApkDownload } from '../utils/downloadHelper';

interface FooterProps {
  onOpenBackendModal: () => void;
  onOpenInstallGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBackendModal,
  onOpenInstallGuide,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-12 relative text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <a href="#hero" className="flex items-center gap-2.5 inline-flex">
              <div className="w-8 h-8 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                +
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Medi<span className="text-sky-400">Assist</span>
              </span>
            </a>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {APP_CONFIG.appTagline}. Intelligent medical answers, prescription guidance, and secure online backend connectivity for Android.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px]">
                v{APP_CONFIG.appVersion} Stable
              </span>
              <button
                onClick={onOpenBackendModal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-[11px] hover:bg-emerald-900/60 transition-colors cursor-pointer"
              >
                <Server className="w-3 h-3" />
                <span>Render Backend Live</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home & 3D Overview
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  AI Capabilities & Medicine Info
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-white transition-colors">
                  Application Interface
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Installation Steps
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-white transition-colors">
                  Security & Cloud Architecture
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & APK */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Direct Package
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Download the official Android APK or review step-by-step instructions.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                id="footer-download-btn"
                onClick={() => triggerApkDownload()}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download APK (v{APP_CONFIG.appVersion})</span>
              </button>

              <button
                onClick={onOpenInstallGuide}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium text-xs transition-colors text-center cursor-pointer"
              >
                Install Guide
              </button>
            </div>

            <div className="pt-1">
              <a
                href={APP_CONFIG.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs"
              >
                <Github className="w-4 h-4" />
                <span>View Source & Release Logs on GitHub</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-slate-400 text-center sm:text-left">
            <span>© 2026 MediAssist. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>AI-Powered Healthcare Assistant for Android</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs cursor-pointer"
              title="Scroll to top"
            >
              <span>Back to Top</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Medical Advisory Note */}
        <div className="mt-8 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 text-center max-w-3xl mx-auto leading-relaxed">
          <span className="text-slate-300 font-semibold">Medical Note:</span> MediAssist is an intelligent informational health assistant designed to organize medicine details and health inquiries. It is not a substitute for clinical diagnosis or emergency medical care. Consult certified medical professionals for personal diagnoses.
        </div>

      </div>
    </footer>
  );
};
