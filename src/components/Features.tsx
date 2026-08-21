import React, { useState } from 'react';
import {
  Sparkles,
  Pill,
  FileText,
  Lock,
  Cloud,
  Smartphone,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  HeartPulse,
  Bot,
} from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

interface FeatureCardData {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  color: string;
  details: string[];
  mockup: {
    header: string;
    sub: string;
    items: { label: string; value: string; status?: string }[];
    actionText: string;
  };
}

export const Features: React.FC = () => {
  const [activeFeatureId, setActiveFeatureId] = useState<string>('ai-assistant');

  const features: FeatureCardData[] = [
    {
      id: 'ai-assistant',
      title: 'AI Health Assistant',
      category: 'Intelligent Guidance',
      description:
        'Conversational AI assistance engineered to answer health questions, explain medical terminology, and provide contextual wellness guidance.',
      icon: <Sparkles className="w-5 h-5 text-sky-600" />,
      badge: 'Core Intelligence',
      color: 'from-sky-500 to-blue-600',
      details: [
        'Natural conversational health inquiries',
        'Clear, plain-language medical context',
        'Immediate assistance anytime on Android',
      ],
      mockup: {
        header: 'MediAssist AI Health Chat',
        sub: 'Contextual Health Dialogue',
        items: [
          { label: 'Patient Prompt', value: 'What should I do if I missed my morning dose?' },
          {
            label: 'AI Recommendation',
            value: 'Take it as soon as remembered unless close to next scheduled dose. Do not double up.',
            status: 'Verified Logic',
          },
          { label: 'Response Latency', value: '< 250ms via Render Backend', status: 'Online' },
        ],
        actionText: 'Ask Follow-up Question',
      },
    },
    {
      id: 'medicine-info',
      title: 'Medicine Information & Dosages',
      category: 'Pharmacology',
      description:
        'Lookup clear information regarding pharmaceutical uses, proper dosage guidelines, active ingredients, and important precaution alerts.',
      icon: <Pill className="w-5 h-5 text-sky-600" />,
      badge: 'Prescription Guide',
      color: 'from-teal-500 to-emerald-600',
      details: [
        'Comprehensive drug information directory',
        'Dosage schedules & timing reminders',
        'Key side effects and storage warnings',
      ],
      mockup: {
        header: 'Medicine Lookup: Amoxicillin',
        sub: 'Antibiotic • Oral Capsule',
        items: [
          { label: 'Standard Dosage', value: '500 mg every 8 hours with meals' },
          { label: 'Storage', value: 'Store below 25°C in a dry location' },
          { label: 'Course Progress', value: 'Day 3 of 7 Completed', status: 'Active' },
        ],
        actionText: 'Set Dosage Reminder',
      },
    },
    {
      id: 'health-records',
      title: 'Health Records & Timeline',
      category: 'Personal Logs',
      description:
        'Keep organized, accessible logs of your vital metrics, prescription history, doctor recommendations, and ongoing wellness milestones.',
      icon: <FileText className="w-5 h-5 text-sky-600" />,
      badge: 'Record Vault',
      color: 'from-blue-500 to-indigo-600',
      details: [
        'Organized chronological health timeline',
        'Track vital trends (BP, glucose, heart rate)',
        'Exportable summary notes for consultations',
      ],
      mockup: {
        header: 'Patient Health Timeline',
        sub: 'Alex Morgan • Health Profile',
        items: [
          { label: 'Blood Pressure', value: '118 / 76 mmHg (Normal)', status: 'Optimal' },
          { label: 'Resting Heart Rate', value: '68 bpm (Stable)', status: 'Optimal' },
          { label: 'Last Check-in', value: 'Today at 08:30 AM', status: 'Logged' },
        ],
        actionText: 'Add New Record Entry',
      },
    },
    {
      id: 'secure-auth',
      title: 'Secure Accounts & Privacy',
      category: 'Data Protection',
      description:
        'Protected account authentication ensuring your personal health data and assistant conversations remain confidential.',
      icon: <Lock className="w-5 h-5 text-sky-600" />,
      badge: 'Protected Access',
      color: 'from-purple-500 to-pink-600',
      details: [
        'Protected user authentication tokens',
        'Secure session management on device',
        'No unauthorized data exposure',
      ],
      mockup: {
        header: 'Protected Security Shield',
        sub: 'Session ID: #SEC-9842',
        items: [
          { label: 'Authentication', value: 'Verified Token-Based Access', status: 'Active' },
          { label: 'Local Encryption', value: 'Android Keystore Protected', status: 'Secure' },
          { label: 'Data Privacy', value: 'User-Specific Protected Vault', status: 'Verified' },
        ],
        actionText: 'Manage Security Keys',
      },
    },
    {
      id: 'online-backend',
      title: 'Continuous Online Backend',
      category: 'Cloud Infrastructure',
      description:
        'MediAssist connects seamlessly with our dedicated Render-hosted cloud backend, providing constant uptime, rapid AI processing, and real-time synchronization.',
      icon: <Cloud className="w-5 h-5 text-sky-600" />,
      badge: 'Render Hosted',
      color: 'from-sky-500 to-teal-600',
      details: [
        'Hosted 24/7 on scalable Render cloud servers',
        'HTTPS encrypted API communication',
        'Low latency responses for mobile requests',
      ],
      mockup: {
        header: 'Render Cloud Infrastructure',
        sub: APP_CONFIG.backendUrl,
        items: [
          { label: 'Backend Server', value: 'Render Web Service', status: 'Live 99.9%' },
          { label: 'API Protocol', value: 'TLS 1.3 HTTPS Rest Endpoints', status: 'Encrypted' },
          { label: 'Response Protocol', value: 'JSON API Payloads', status: 'Standard' },
        ],
        actionText: 'View Endpoint Status',
      },
    },
    {
      id: 'mobile-optimized',
      title: 'Built for Android Devices',
      category: 'Mobility & Speed',
      description:
        'Engineered from the ground up for modern Android smartphones. Fluid touch navigation, lightweight footprint, and reliable offline-tolerant design.',
      icon: <Smartphone className="w-5 h-5 text-sky-600" />,
      badge: 'Android Native',
      color: 'from-emerald-500 to-sky-600',
      details: [
        'Optimized for Android 8.0 through Android 15+',
        'Lightweight ~25MB APK package footprint',
        'Fast launch speeds and minimal battery drain',
      ],
      mockup: {
        header: 'Android Runtime Performance',
        sub: `${APP_CONFIG.appName} v${APP_CONFIG.appVersion}`,
        items: [
          { label: 'Memory Footprint', value: '< 65 MB RAM Consumption', status: 'Efficient' },
          { label: 'Battery Impact', value: 'Optimized Background Wakelocks', status: 'Minimal' },
          { label: 'Package Size', value: APP_CONFIG.apkFileSize, status: 'Compact' },
        ],
        actionText: 'Check Compatibility',
      },
    },
  ];

  const activeFeature = features.find((f) => f.id === activeFeatureId) || features[0];

  return (
    <section id="features" className="py-20 md:py-28 relative bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold uppercase tracking-wider">
            <HeartPulse className="w-3.5 h-3.5 text-sky-600" />
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Engineered for Intelligent Healthcare
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            MediAssist brings together responsive AI diagnostics support, medicine schedules, and secure cloud connectivity in one streamlined Android application.
          </p>
        </div>

        {/* Interactive Feature Grid & Live Detail Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Feature Selection List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => {
              const isSelected = feature.id === activeFeatureId;
              return (
                <button
                  key={feature.id}
                  id={`feature-card-${feature.id}`}
                  onClick={() => setActiveFeatureId(feature.id)}
                  className={`text-left p-5 rounded-2xl transition-all duration-200 border cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-white border-sky-500 shadow-md ring-1 ring-sky-500/20'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-sky-50 border-sky-200 text-sky-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700 group-hover:border-slate-300'
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                        isSelected
                          ? 'bg-sky-50 text-sky-700 border-sky-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-sky-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {feature.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-sky-600 group-hover:translate-x-1 transition-transform">
                    <span>Explore details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Live Visual Preview Panel */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="card-clean rounded-3xl p-6 sm:p-7 shadow-md relative overflow-hidden bg-white">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center shadow-2xs">
                    {activeFeature.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-sky-700">
                      {activeFeature.category}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900">{activeFeature.title}</h4>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>

              <div className="my-5">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {activeFeature.description}
                </p>

                <div className="space-y-2.5">
                  {activeFeature.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* In-app Simulator UI Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-sky-600" />
                    <span className="text-xs font-bold text-slate-900">{activeFeature.mockup.header}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {activeFeature.mockup.sub}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeFeature.mockup.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 flex flex-col space-y-1 shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">{item.label}</span>
                        {item.status && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                            {item.status}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-900 font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1 text-emerald-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Synchronized with Render</span>
                  </div>
                  <span className="font-mono text-sky-700 font-semibold">v{APP_CONFIG.appVersion}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
