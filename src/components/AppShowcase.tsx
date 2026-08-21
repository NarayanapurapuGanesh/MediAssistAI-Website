import React, { useState } from 'react';
import {
  Smartphone,
  MessageSquare,
  Pill,
  Activity,
  ShieldCheck,
  Sparkles,
  Bot,
  Send,
  Calendar,
  Check,
  Clock,
  Heart,
  TrendingUp,
  Server,
} from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

export const AppShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'meds' | 'vitals' | 'auth'>('chat');

  return (
    <section id="showcase" className="py-20 md:py-28 relative bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5 text-sky-600" />
            Application Interface
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Designed for Better Healthcare Access
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Experience an intuitive, clutter-free mobile interface designed specifically for fast medical answers, dosage tracking, and stress-free health management.
          </p>

          {/* Interactive Screen Selector Tabs */}
          <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 mt-6 max-w-full">
            <button
              id="tab-screen-chat"
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI Assistant Chat</span>
            </button>

            <button
              id="tab-screen-meds"
              onClick={() => setActiveTab('meds')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'meds'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Medicine Schedule</span>
            </button>

            <button
              id="tab-screen-vitals"
              onClick={() => setActiveTab('vitals')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'vitals'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Vitals & Records</span>
            </button>

            <button
              id="tab-screen-auth"
              onClick={() => setActiveTab('auth')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'auth'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Cloud Sync & Security</span>
            </button>
          </div>
        </div>

        {/* Central Showcase Device Mockup with Side Summary Cards */}
        <div className="relative max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mt-6">
          
          {/* Left Orbital Card */}
          <div className="w-full lg:w-72 order-2 lg:order-1 space-y-4">
            <div className="card-clean p-5 rounded-2xl shadow-sm space-y-2.5 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">AI Health Engine</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Contextual Medical Guidance</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Trained to process user medical symptoms and provide structured health information, without replacing professional physicians.
              </p>
            </div>

            <div className="card-clean p-5 rounded-2xl shadow-sm space-y-2.5 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Render Live API</h4>
                  <p className="text-[10px] text-emerald-600 font-medium">Continuous 24/7 Hosting</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Low-latency HTTPS communication delivering immediate AI analysis directly to your Android device.
              </p>
            </div>
          </div>

          {/* Center Phone Device Wrapper */}
          <div className="w-full max-w-[340px] sm:max-w-[370px] order-1 lg:order-2 relative group">
            {/* Phone Outer Chassis */}
            <div className="relative rounded-[44px] bg-slate-900 border-[6px] border-slate-700 shadow-xl p-2.5 overflow-hidden">
              
              {/* Top Camera Punch Hole Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-full z-30 flex items-center justify-between px-3 border border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>

              {/* Inner Screen Content */}
              <div className="rounded-[34px] bg-slate-50 min-h-[580px] p-4 pt-8 pb-6 flex flex-col justify-between relative overflow-hidden border border-slate-200">
                
                {/* Header in Screen */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                      +
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-none">MediAssist</h4>
                      <span className="text-[9px] text-emerald-600 font-medium">Render Online</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono font-medium">09:41 AM</span>
                </div>

                {/* DYNAMIC SCREEN CONTENT BASED ON ACTIVE TAB */}
                {activeTab === 'chat' && (
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* AI Welcome Bubble */}
                      <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-sky-700 font-bold text-[11px]">
                          <Bot className="w-3.5 h-3.5 text-sky-600" />
                          <span>MediAssist Assistant</span>
                        </div>
                        <p className="text-slate-700 text-[11px] leading-relaxed">
                          Hello Alex. I reviewed your medication plan. You have 1 upcoming dosage today at 12:00 PM.
                        </p>
                      </div>

                      {/* User Query Bubble */}
                      <div className="p-2.5 rounded-2xl bg-sky-600 text-white text-xs ml-6 text-right shadow-2xs">
                        <p className="text-white text-[11px]">
                          Can I take my antibiotic with orange juice or only water?
                        </p>
                        <span className="text-[9px] text-sky-100">09:42 AM</span>
                      </div>

                      {/* AI Answer Bubble */}
                      <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs space-y-1.5">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[10px]">
                          <span>✓ Verified Medical Knowledge</span>
                        </div>
                        <p className="text-slate-700 text-[11px] leading-relaxed">
                          It is recommended to take Amoxicillin with a full glass of water. Acidic fruit juices can occasionally reduce absorption or upset digestion.
                        </p>
                      </div>
                    </div>

                    {/* Bottom Message Input Mock */}
                    <div className="mt-2 pt-2 border-t border-slate-200">
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        <input
                          type="text"
                          readOnly
                          value="Type a health query..."
                          className="bg-transparent text-slate-400 text-xs flex-1 outline-none font-medium"
                        />
                        <div className="w-6 h-6 rounded-lg bg-sky-600 flex items-center justify-center text-white cursor-pointer">
                          <Send className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'meds' && (
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Daily Medication Plan</span>
                      <span className="text-[10px] text-sky-700 font-semibold">2 Pending</span>
                    </div>

                    {/* Med Card 1 */}
                    <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Metformin • 500mg</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                          ✓ Completed
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">Taken with Breakfast (08:00 AM)</p>
                    </div>

                    {/* Med Card 2 */}
                    <div className="p-3 rounded-xl bg-white border border-sky-300 shadow-2xs space-y-1.5 ring-1 ring-sky-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Amoxicillin • 500mg</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 font-semibold border border-sky-200">
                          ⏰ Due at 12:00 PM
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">With water after lunch</p>
                    </div>

                    {/* Med Card 3 */}
                    <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Vitamin D3 • 1000 IU</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                          Evening 08:00 PM
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">1 softgel daily</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-[10px] text-sky-800 text-center font-medium">
                      🔔 Push notifications active on Android
                    </div>
                  </div>
                )}

                {activeTab === 'vitals' && (
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Vitals & Activity Logs</span>
                      <span className="text-[10px] text-emerald-700 font-semibold">All Normal</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                          <Heart className="w-3 h-3 text-rose-500" />
                          <span>Heart Rate</span>
                        </div>
                        <div className="text-base font-extrabold text-slate-900">72 bpm</div>
                        <span className="text-[9px] text-emerald-600 font-medium">Resting Normal</span>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                          <TrendingUp className="w-3 h-3 text-sky-600" />
                          <span>Blood Pressure</span>
                        </div>
                        <div className="text-base font-extrabold text-slate-900">120/80</div>
                        <span className="text-[9px] text-emerald-600 font-medium">Optimal</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                      <span className="text-[10px] font-bold text-slate-700 tracking-wider">WEEKLY HEALTH SUMMARY</span>
                      <div className="h-16 flex items-end justify-between gap-1 pt-2">
                        {[40, 65, 55, 80, 70, 90, 75].map((val, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full bg-sky-500 hover:bg-sky-600 rounded-t transition-all"
                              style={{ height: `${val}%` }}
                            />
                            <span className="text-[8px] text-slate-500 font-medium">D{i + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'auth' && (
                  <div className="space-y-3 flex-1">
                    <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-center space-y-1">
                      <ShieldCheck className="w-6 h-6 text-sky-600 mx-auto" />
                      <h5 className="text-xs font-bold text-slate-900">Encrypted Cloud Link</h5>
                      <p className="text-[10px] text-slate-600">
                        Device is securely authenticated with the Render backend.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-[11px] space-y-0.5">
                        <div className="text-slate-500 text-[10px]">Cloud Endpoint</div>
                        <div className="text-sky-700 font-mono truncate text-[10px] font-medium">
                          {APP_CONFIG.backendUrl}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-[11px] space-y-0.5">
                        <div className="text-slate-500 text-[10px]">Package ID</div>
                        <div className="text-slate-900 font-mono text-[10px] font-medium">{APP_CONFIG.packageId}</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-[11px] space-y-0.5">
                        <div className="text-slate-500 text-[10px]">Transport Security</div>
                        <div className="text-emerald-700 font-semibold text-[10px]">TLS 1.3 End-to-End</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Android Home Pill */}
                <div className="mt-3 pt-2 flex justify-center">
                  <div className="w-24 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>

            <div className="text-center mt-3">
              <span className="text-[10px] text-slate-500 font-medium">
                Interactive preview • Native APK render mode
              </span>
            </div>
          </div>

          {/* Right Orbital Card */}
          <div className="w-full lg:w-72 order-3 space-y-4">
            <div className="card-clean p-5 rounded-2xl shadow-sm space-y-2.5 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center">
                  <Pill className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Smart Reminders</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Never Miss a Dose</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated schedule alerts that sync seamlessly between local Android notifications and the cloud backend.
              </p>
            </div>

            <div className="card-clean p-5 rounded-2xl shadow-sm space-y-2.5 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Private & Protected</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Zero Unsolicited Sharing</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Session tokens and medical records are stored strictly on encrypted device storage and authenticated cloud channels.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
