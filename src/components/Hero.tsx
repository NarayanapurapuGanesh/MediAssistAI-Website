import React, { useState } from 'react';
import {
  Download,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Server,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { Phone3DCanvas } from './3d/Phone3DCanvas';
import { triggerApkDownload } from '../utils/downloadHelper';

interface HeroProps {
  onOpenInstallGuide: () => void;
  onOpenBackendModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenInstallGuide,
  onOpenBackendModal,
}) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'preparing' | 'success' | 'error'>('idle');
  const [downloadMessage, setDownloadMessage] = useState<string>('');

  const handleDownload = async () => {
    setDownloadState('preparing');
    setDownloadMessage('Preparing MediAssist APK package...');

    try {
      const result = await triggerApkDownload();
      if (result.success) {
        setDownloadState('success');
        setDownloadMessage('Downloading MediAssist APK v' + APP_CONFIG.appVersion);
        setTimeout(() => {
          setDownloadState('idle');
        }, 6000);
      } else {
        setDownloadState('error');
        setDownloadMessage(result.message);
      }
    } catch {
      setDownloadState('error');
      setDownloadMessage('Download could not start automatically. Use the direct link below.');
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-white border-b border-slate-200/80 bg-grid-subtle"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Content & Call to Actions */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left space-y-4 sm:space-y-5 z-10">
            
            {/* AI Healthcare Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold shadow-2xs">
              <span className="flex h-2 w-2 relative">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>CLINICAL AI HEALTHCARE ASSISTANT</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              Intelligent health guidance <br />
              <span className="text-sky-600">
                built for Android.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed font-normal">
              MediAssist provides conversational health support, medication dosage reminders, vital trends tracking, and encrypted connectivity to our live Render cloud backend.
            </p>

            {/* APK Meta Badges */}
            <div className="flex flex-wrap gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
                <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                <span className="font-medium">{APP_CONFIG.minAndroidVersion}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
                <span className="text-sky-600 font-mono font-bold">APK</span>
                <span className="font-medium">v{APP_CONFIG.appVersion} • {APP_CONFIG.apkFileSize}</span>
              </div>
              <button
                onClick={onOpenBackendModal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 hover:bg-emerald-100/70 transition-colors font-medium cursor-pointer"
              >
                <Server className="w-3.5 h-3.5 text-emerald-600" />
                <span>Render Backend Online</span>
              </button>
            </div>

            {/* Primary Action & Download Box */}
            <div className="w-full max-w-lg space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Primary Download Button */}
                <button
                  id="hero-primary-download-btn"
                  onClick={handleDownload}
                  disabled={downloadState === 'preparing'}
                  className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3 sm:py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base shadow-xs hover:shadow-md active:scale-[0.98] transition-all cursor-pointer group"
                >
                  <Download className={`w-4 h-4 text-white transition-transform group-hover:-translate-y-0.5 ${downloadState === 'preparing' ? 'animate-bounce' : ''}`} />
                  <span>
                    {downloadState === 'preparing'
                      ? 'Preparing Download...'
                      : 'Download MediAssist APK'}
                  </span>
                </button>

                {/* Secondary Explore Features Button */}
                <a
                  href="#features"
                  id="hero-explore-features-btn"
                  className="flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm shadow-2xs transition-all"
                >
                  <span>Explore Features</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                </a>
              </div>

              {/* Download Feedback State Alert */}
              {downloadState === 'preparing' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs sm:text-sm animate-fadeIn">
                  <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping" />
                  <span>{downloadMessage}</span>
                </div>
              )}

              {downloadState === 'success' && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Download started! Check your notification bar or Downloads folder.</span>
                  </div>
                  <button
                    onClick={onOpenInstallGuide}
                    className="underline text-emerald-800 hover:text-emerald-950 font-semibold flex-shrink-0 ml-2"
                  >
                    Install Guide
                  </button>
                </div>
              )}

              {downloadState === 'error' && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm space-y-1.5">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>{downloadMessage}</span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href={APP_CONFIG.apkDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-rose-800 underline font-semibold hover:text-rose-950"
                    >
                      <span>Direct Download Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {/* Install Helper Subtext */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 px-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Safe Android Package • SHA-256 Verified</span>
                </div>
                <button
                  id="hero-help-link"
                  onClick={onOpenInstallGuide}
                  className="text-sky-700 hover:text-sky-900 underline flex items-center gap-1 font-medium"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Installation Help</span>
                </button>
              </div>
            </div>

            {/* Value Pillars List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-4 border-t border-slate-200">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">AI Health Advisor</h4>
                  <p className="text-[11px] text-slate-500">Contextual medical Q&A</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Medicine Lookup</h4>
                  <p className="text-[11px] text-slate-500">Uses, dosage & alerts</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Render Cloud Sync</h4>
                  <p className="text-[11px] text-slate-500">Continuous backend</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Phone Experience */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-full relative">
              {/* 3D Viewport container */}
              <div className="w-full card-clean rounded-3xl p-2 sm:p-4 shadow-md relative overflow-hidden bg-slate-50/50">
                <Phone3DCanvas />
              </div>

              {/* Floating Clean Tags */}
              <div className="absolute -top-3 -right-2 sm:-right-4 bg-white border border-slate-200 rounded-2xl p-3 shadow-md hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-sky-700">AI Engine</div>
                  <div className="text-xs font-bold text-slate-900">Active Intelligence</div>
                </div>
              </div>

              <div className="absolute -bottom-3 -left-2 sm:-left-4 bg-white border border-slate-200 rounded-2xl p-3 shadow-md hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Server className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-emerald-700">Render Cloud</div>
                  <div className="text-xs font-bold text-slate-900">Continuous HTTPS API</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
