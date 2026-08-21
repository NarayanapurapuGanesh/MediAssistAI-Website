import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { AppShowcase } from './components/AppShowcase';
import { HowItWorks } from './components/HowItWorks';
import { SecuritySection } from './components/SecuritySection';
import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';
import { InstallGuideModal } from './components/InstallGuideModal';
import { BackendStatusModal } from './components/BackendStatusModal';

export default function App() {
  const [installGuideOpen, setInstallGuideOpen] = useState(false);
  const [backendModalOpen, setBackendModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-sky-600 selection:text-white relative">
      {/* Top Fixed Navigation */}
      <Navbar
        onOpenBackendModal={() => setBackendModalOpen(true)}
        onOpenInstallGuide={() => setInstallGuideOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero with 3D Smartphone Viewport & Primary APK CTA */}
        <Hero
          onOpenInstallGuide={() => setInstallGuideOpen(true)}
          onOpenBackendModal={() => setBackendModalOpen(true)}
        />

        {/* 2. Core Capabilities & Feature Deep-Dive */}
        <Features />

        {/* 3. 3D & Interactive Interface Showcase */}
        <AppShowcase />

        {/* 4. How It Works 4-Step Flow */}
        <HowItWorks onOpenInstallGuide={() => setInstallGuideOpen(true)} />

        {/* 5. Security & Render Cloud Architecture */}
        <SecuritySection
          onOpenBackendModal={() => setBackendModalOpen(true)}
        />

        {/* 6. High-Conversion Download & QR Code Section */}
        <DownloadSection
          onOpenInstallGuide={() => setInstallGuideOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBackendModal={() => setBackendModalOpen(true)}
        onOpenInstallGuide={() => setInstallGuideOpen(true)}
      />

      {/* Interactive Modals */}
      <InstallGuideModal
        isOpen={installGuideOpen}
        onClose={() => setInstallGuideOpen(false)}
      />

      <BackendStatusModal
        isOpen={backendModalOpen}
        onClose={() => setBackendModalOpen(false)}
      />
    </div>
  );
}
