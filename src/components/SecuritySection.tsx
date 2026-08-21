import React from 'react';
import {
  ShieldCheck,
  Server,
  Lock,
  Wifi,
  Database,
  CheckCircle,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

interface SecuritySectionProps {
  onOpenBackendModal: () => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({
  onOpenBackendModal,
}) => {
  const trustPoints = [
    {
      title: 'HTTPS TLS 1.3 Transport',
      description:
        'All client-server exchanges between the Android APK and Render backend use modern encrypted HTTPS transport protocols.',
      icon: <Wifi className="w-5 h-5 text-sky-600" />,
      tag: 'Transport Security',
    },
    {
      title: 'Continuous Render Cloud Backend',
      description:
        'The backend service is hosted 24/7 on Render cloud infrastructure, ensuring uninterrupted availability for mobile AI inquiries.',
      icon: <Server className="w-5 h-5 text-sky-600" />,
      tag: 'Cloud Infrastructure',
    },
    {
      title: 'Protected User Authentication',
      description:
        'Token-based authentication isolates user sessions and ensures health records remain confidential to the authorized account.',
      icon: <Lock className="w-5 h-5 text-sky-600" />,
      tag: 'Access Control',
    },
    {
      title: 'Android Keystore Security',
      description:
        'Sensitive session tokens stored on device utilize Android secure hardware-backed keystore mechanisms.',
      icon: <ShieldCheck className="w-5 h-5 text-sky-600" />,
      tag: 'Device Hardening',
    },
  ];

  return (
    <section id="security" className="py-20 md:py-28 relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Infrastructure & Data Protection
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Built on Reliable Cloud Architecture
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            MediAssist prioritizes privacy, transparent engineering, and secure HTTPS API synchronization with our live Render deployment.
          </p>
        </div>

        {/* Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {trustPoints.map((item, i) => (
            <div
              key={i}
              className="card-clean p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-emerald-700 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Architecture Specification</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Backend Connection Card */}
        <div className="mt-12 max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl card-clean bg-slate-50 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Live Cloud Production Target
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-slate-900">
                Render Hosted Backend Service
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                The MediAssist Android client communicates exclusively with the dedicated Render production backend over HTTPS.
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs font-mono text-sky-800 bg-white px-3 py-1.5 rounded-xl border border-slate-200 inline-flex max-w-full truncate shadow-2xs font-medium">
                <Code2 className="w-3.5 h-3.5 flex-shrink-0 text-sky-600" />
                <span className="truncate">{APP_CONFIG.backendUrl}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <button
                id="security-view-status-btn"
                onClick={onOpenBackendModal}
                className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm text-center cursor-pointer active:scale-95"
              >
                Inspect Backend Status
              </button>

              <a
                href={APP_CONFIG.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
