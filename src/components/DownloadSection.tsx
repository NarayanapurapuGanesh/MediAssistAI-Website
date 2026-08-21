import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  QrCode,
  Copy,
  Check,
  HelpCircle,
  HardDrive,
  Cpu,
} from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { triggerApkDownload } from '../utils/downloadHelper';

interface DownloadSectionProps {
  onOpenInstallGuide: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  onOpenInstallGuide,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  const handleDownload = async () => {
    setDownloading(true);
    setDownloadStatus('Connecting to APK mirror...');

    try {
      const result = await triggerApkDownload();
      if (result.success) {
        setDownloadStatus(`Download started! File: MediAssist-v${APP_CONFIG.appVersion}.apk`);
      } else {
        setDownloadStatus(result.message);
      }
    } catch {
      setDownloadStatus('Download could not start automatically. Please use the direct mirror below.');
    } finally {
      setTimeout(() => setDownloading(false), 2500);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(APP_CONFIG.apkDownloadUrl);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  // Generate SVG QR Code pointing directly to the official APK download link
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    APP_CONFIG.apkDownloadUrl
  )}&color=0369A1&bgcolor=FFFFFF`;

  return (
    <section id="download" className="py-20 md:py-28 relative bg-[#F8FAFC] border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Download Card */}
        <div className="max-w-5xl mx-auto card-clean rounded-3xl sm:rounded-[32px] bg-white border border-slate-200 p-6 sm:p-10 lg:p-14 shadow-md relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Download CTA Details */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5 text-sky-600" />
                Direct Android APK Release
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Ready to Experience <span className="text-sky-700">MediAssist</span>?
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Download the official Android package to get AI healthcare answers, medicine schedules, and secure Render cloud synchronization on your phone.
              </p>

              {/* Specs pill row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
                    <HardDrive className="w-3.5 h-3.5 text-sky-600" />
                    <span>Package Size</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">{APP_CONFIG.apkFileSize}</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
                    <Cpu className="w-3.5 h-3.5 text-sky-600" />
                    <span>Min. Android</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">8.0 (API 26+)</div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cost</span>
                  </div>
                  <div className="text-sm font-bold text-emerald-700">Free Download</div>
                </div>
              </div>

              {/* Big CTA Download Button */}
              <div className="space-y-3 pt-2">
                <button
                  id="section-main-download-btn"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base sm:text-lg shadow-sm hover:shadow-md active:scale-[0.99] transition-all cursor-pointer group"
                >
                  <Download className={`w-5 h-5 text-white transition-transform group-hover:-translate-y-0.5 ${downloading ? 'animate-bounce' : ''}`} />
                  <span>
                    {downloading ? 'Preparing MediAssist APK...' : 'Download MediAssist APK'}
                  </span>
                </button>

                {downloadStatus && (
                  <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs sm:text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    <span className="font-medium">{downloadStatus}</span>
                  </div>
                )}
              </div>

              {/* Installation Notice Note */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
                <ShieldCheck className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">Installation Notice:</span>
                  <p className="text-slate-600 leading-relaxed">
                    Android may prompt: <em>"Allow installation from this source"</em>. This is standard for direct APK downloads outside Google Play.
                  </p>
                  <button
                    onClick={onOpenInstallGuide}
                    className="text-sky-700 hover:text-sky-800 font-semibold flex items-center gap-1 pt-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Read Android Step-by-Step Installation Instructions</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Scan to Download QR Code & Direct Mirror Links */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-4">
              
              <div className="flex items-center gap-2 text-sky-700 text-xs font-bold uppercase tracking-wider">
                <QrCode className="w-4 h-4" />
                <span>Scan with Phone Camera</span>
              </div>

              {/* QR Code Container */}
              <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow group">
                <a
                  href={APP_CONFIG.apkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                  title="Click or scan to download MediAssist APK directly"
                >
                  <img
                    src={qrCodeUrl}
                    alt="Scan QR code to download MediAssist APK on Android"
                    className="w-44 h-44 sm:w-48 sm:h-48 rounded-xl object-contain transition-transform group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </a>
              </div>

              <div className="space-y-0.5 text-center">
                <h4 className="text-xs font-bold text-slate-900">Scan to Download APK</h4>
                <p className="text-[11px] text-slate-500 max-w-xs">
                  Scan with your Android camera or QR app to open the APK download directly on your phone.
                </p>
              </div>

              {/* Direct Link Copier */}
              <div className="w-full pt-3 border-t border-slate-200 space-y-2">
                <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-slate-200 text-[11px] shadow-2xs">
                  <span className="font-mono text-slate-600 truncate max-w-[190px]">
                    {APP_CONFIG.apkDownloadUrl}
                  </span>
                  <button
                    onClick={copyUrl}
                    className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 transition-colors flex items-center gap-1 flex-shrink-0 text-[10px] font-semibold border border-sky-200 cursor-pointer"
                    title="Copy direct APK link"
                  >
                    {showCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{showCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <a
                  href={APP_CONFIG.apkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-sky-700 hover:text-sky-800 font-semibold underline"
                >
                  <span>Direct Download Mirror Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
