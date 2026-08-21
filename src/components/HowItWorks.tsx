import React from 'react';
import {
  Download,
  Settings,
  Server,
  Sparkles,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

interface HowItWorksProps {
  onOpenInstallGuide: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenInstallGuide }) => {
  const steps = [
    {
      number: '01',
      title: 'Download APK',
      subtitle: 'Official Package',
      description:
        'Download the signed MediAssist Android APK package directly to your phone or desktop computer.',
      icon: <Download className="w-6 h-6 text-sky-600" />,
      tag: `${APP_CONFIG.apkFileSize} • v${APP_CONFIG.appVersion}`,
    },
    {
      number: '02',
      title: 'Install on Android',
      subtitle: 'Quick Setup',
      description:
        'Open the downloaded file. When prompted, enable "Install unknown apps" in Android settings and proceed with installation.',
      icon: <Settings className="w-6 h-6 text-sky-600" />,
      tag: 'Android 8.0+ Required',
    },
    {
      number: '03',
      title: 'Secure Cloud Link',
      subtitle: 'Render Backend',
      description:
        'Upon opening, MediAssist automatically verifies encrypted connectivity with the live Render cloud API.',
      icon: <Server className="w-6 h-6 text-sky-600" />,
      tag: 'HTTPS TLS 1.3',
    },
    {
      number: '04',
      title: 'AI Health Companion',
      subtitle: 'Ready to Assist',
      description:
        'Ask medical queries, schedule prescriptions, record health metrics, and experience reliable health support on the go.',
      icon: <Sparkles className="w-6 h-6 text-sky-600" />,
      tag: 'Instant Assistance',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative bg-[#F8FAFC] border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            How to Get Started with MediAssist
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            From direct download to live AI healthcare interaction in less than two minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="card-clean p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 transition-all duration-200 flex flex-col justify-between group relative shadow-sm"
            >
              {/* Step Number Watermark */}
              <span className="text-4xl font-extrabold text-slate-100 group-hover:text-sky-100 transition-colors absolute top-4 right-5 select-none">
                {step.number}
              </span>

              <div>
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {step.icon}
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 block mb-1">
                  {step.subtitle}
                </span>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              {/* Tag / Meta */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                  {step.tag}
                </span>
                {idx < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-300 hidden lg:block" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Help & Permission Banner */}
        <div className="mt-12 p-6 rounded-3xl card-clean bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">First time installing an APK?</h4>
              <p className="text-xs text-slate-600">
                Learn how to enable installation permissions on Samsung, Xiaomi, Pixel, and other Android devices.
              </p>
            </div>
          </div>

          <button
            id="how-it-works-guide-btn"
            onClick={onOpenInstallGuide}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition-all flex-shrink-0 active:scale-95 shadow-sm cursor-pointer"
          >
            <span>View Step-by-Step Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
