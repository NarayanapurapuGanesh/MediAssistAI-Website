import React from 'react';
import {
  X,
  Smartphone,
  Download,
  Settings,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { triggerApkDownload } from '../utils/downloadHelper';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: '1',
      title: 'Download the APK',
      desc: `Click the "Download APK" button to save MediAssist-v${APP_CONFIG.appVersion}.apk to your Android device.`,
      icon: <Download className="w-5 h-5 text-sky-600" />,
    },
    {
      num: '2',
      title: 'Open Downloaded File',
      desc: 'Tap the download notification in your status bar or open your Files / Downloads app and tap the APK file.',
      icon: <Smartphone className="w-5 h-5 text-sky-600" />,
    },
    {
      num: '3',
      title: 'Allow Installation from Source',
      desc: 'If Android prompts "Install unknown apps", tap Settings and switch the toggle to ON (Allow from this source).',
      icon: <Settings className="w-5 h-5 text-sky-600" />,
    },
    {
      num: '4',
      title: 'Confirm Installation',
      desc: 'Return to the installer screen, tap "Install", and wait a few seconds for completion.',
      icon: <ShieldCheck className="w-5 h-5 text-sky-600" />,
    },
    {
      num: '5',
      title: 'Open & Connect to Render',
      desc: 'Tap "Open". Make sure your Android device has an active internet connection so MediAssist connects to the live backend.',
      icon: <CheckCircle2 className="w-5 h-5 text-sky-600" />,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl text-left flex flex-col max-h-[88vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header (Sticky / Fixed) */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 flex-shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shadow-2xs">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                Android Setup Guide
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                How to Install MediAssist APK
              </h3>
            </div>
          </div>

          <button
            id="close-install-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close installation guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3.5">
          {/* Step-by-Step List */}
          <div className="space-y-2.5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-sky-200">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Android Manufacturer Tips */}
          <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Device Specific Tips</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed">
              • <strong>Samsung:</strong> Settings &gt; Apps &gt; Special access &gt; Install unknown apps &gt; Toggle Chrome/My Files.<br />
              • <strong>Xiaomi/Redmi:</strong> Settings &gt; Privacy Protection &gt; Special Permissions &gt; Install unknown apps.<br />
              • <strong>Google Pixel:</strong> Tap download prompt &gt; Settings &gt; Allow from this source.
            </p>
          </div>
        </div>

        {/* Modal Action Footer (Sticky / Fixed) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-200 flex-shrink-0 bg-slate-50/80">
          <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
            Package: <code className="text-slate-800 font-mono font-semibold">{APP_CONFIG.packageId}</code>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                triggerApkDownload();
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download APK</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
