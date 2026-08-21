# MediAssist — AI-Powered Healthcare Assistant 

> **Official 3D Product Showcase & Android APK Download Portal**
Live Link :: https://mediassistai-app.netlify.app/
MediAssist is an intelligent AI-powered healthcare assistant designed for Android. It enables users to consult conversational medical guidance, look up prescription medicine usages and dosages, track health vitals, and communicate with a dedicated **Render** cloud backend over encrypted HTTPS.

---

## 🌟 Key Features

1. **3D Interactive Smartphone Experience**:
   - Real-time procedural 3D model built with Three.js.
   - Interactive drag-to-rotate, mouse parallax, and medical particle fields.
   - Automatic low-power device optimization and WebGL fallback.
2. **One-Click APK Download**:
   - Instant direct download for Android APK (`MediAssist-v1.0.0.apk`).
   - Centralized environment configuration for APK release URLs and mirrors.
   - Integrated QR Code for instant phone camera scanning.
3. **Continuous Render Backend Integration**:
   - Built to communicate with the production Render web service over HTTPS.
   - Zero hardcoded credentials or client-exposed secrets.
4. **Android Installation Guide**:
   - Step-by-step instructions for allowing APK installation from Chrome/Downloads on Samsung, Pixel, Xiaomi, OnePlus, and other Android devices.
5. **Mobile-First Responsive Design**:
   - Tested across 320px to 4K displays with zero horizontal overflow.
   - Accessible WCAG AA compliant colors and full `prefers-reduced-motion` support.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **3D Graphics**: Three.js, Canvas Textures, ACES Filmic Tone Mapping
- **Icons**: Lucide React
- **Animations**: CSS Transitions, Keyframe Animations, Canvas Confetti
- **Backend Architecture**: Render Cloud Web Service (HTTPS / REST)

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (refer to `.env.example`):

```env
# Application metadata
VITE_APP_NAME="MediAssist"
VITE_APP_VERSION="1.0.0"
VITE_APP_DESCRIPTION="AI-Powered Healthcare Assistant for Android"

# Configurable APK Download URL (GitHub Releases, Cloud Storage, or Render)
VITE_APK_DOWNLOAD_URL="https://github.com/nganesh-dev/mediassist/releases/download/v1.0.0/mediassist-v1.0.0.apk"

# Production Render Backend URL (Do NOT modify unless your backend host changes)
VITE_BACKEND_URL="https://mediassist-backend.onrender.com"

# Package information
VITE_APK_FILE_SIZE="24.8 MB"
VITE_MIN_ANDROID_VERSION="Android 8.0 (API 26)+"
```

---

## 🚀 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Validate TypeScript & Syntax**:
   ```bash
   npm run lint
   ```

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```
   The compiled static files will be placed inside the `dist/` folder.

---

## 🌐 Render Deployment (Static Site)

To deploy this website on **Render** as a Static Site:

1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Static Site**.
3. Connect your GitHub repository.
4. Set the following build settings:
   - **Name**: `mediassist-website`
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Under **Environment Variables**, add:
   - `VITE_APK_DOWNLOAD_URL` = your APK direct download URL.
   - `VITE_BACKEND_URL` = `https://mediassist-backend.onrender.com`
   - `VITE_APP_VERSION` = `1.0.0`
6. Click **Create Static Site**.

---

## 🔄 How to Update the APK in the Future

When you release a new version of the Android APK (e.g. `v1.1.0`):

1. **Build the new Android APK** from Android Studio.
2. **Upload the APK** to GitHub Releases (e.g. `https://github.com/nganesh-dev/mediassist/releases/tag/v1.1.0`) or your file host.
3. Update `.env` or your Render Environment settings:
   ```env
   VITE_APP_VERSION="1.1.0"
   VITE_APK_DOWNLOAD_URL="https://github.com/nganesh-dev/mediassist/releases/download/v1.1.0/mediassist-v1.1.0.apk"
   ```
4. Trigger a new deploy on Render (or push to GitHub). The website will automatically update all download buttons, version badges, QR codes, and metadata.

---

## 🔒 Security & Privacy

- All API communications between the Android client and the backend require HTTPS TLS 1.3 encryption.
- No private API keys or database connection strings are exposed in client-side code.
- MediAssist provides informational health guidance and does not replace certified clinical consultations.

---

## 📄 License

© 2026 MediAssist. All rights reserved.
