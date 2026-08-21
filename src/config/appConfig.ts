/**
 * MediAssist Application Configuration
 * Centralized configuration for all APK details, backend endpoints, and application metadata.
 */

export interface AppConfig {
  appName: string;
  appVersion: string;
  appTagline: string;
  appDescription: string;
  apkDownloadUrl: string;
  backendUrl: string;
  apkFileSize: string;
  minAndroidVersion: string;
  releaseDate: string;
  githubUrl: string;
  contactEmail: string;
  packageId: string;
}

export const APP_CONFIG: AppConfig = {
  appName: import.meta.env.VITE_APP_NAME || "MediAssist",
  appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",
  appTagline: "AI-Powered Healthcare Assistant for Android",
  appDescription:
    "MediAssist connects you to intelligent medical information, prescription guidance, and personal health tracking, communicating securely with our continuous cloud backend.",
  // Configurable download URL (points to user's Google Drive release APK)
  apkDownloadUrl:
    import.meta.env.VITE_APK_DOWNLOAD_URL ||
    "https://drive.google.com/file/d/1Fs2D0HvGPN_qklx41ITOFETRZbGK7Su5/view?usp=sharing",
  // Live Render backend URL
  backendUrl:
    import.meta.env.VITE_BACKEND_URL || "https://mediassist-backend.onrender.com",
  apkFileSize: import.meta.env.VITE_APK_FILE_SIZE || "60 MB",
  minAndroidVersion:
    import.meta.env.VITE_MIN_ANDROID_VERSION || "Android 8.0 (Oreo, API 26)+",
  releaseDate: "August 2026",
  githubUrl: "https://github.com/nganesh-dev/mediassist",
  contactEmail: "nganesh.dev@gmail.com",
  packageId: "com.mediassist.app",
};
