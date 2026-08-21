/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string;
  readonly VITE_APP_VERSION?: string;
  readonly VITE_APP_DESCRIPTION?: string;
  readonly VITE_APK_DOWNLOAD_URL?: string;
  readonly VITE_BACKEND_URL?: string;
  readonly VITE_APK_FILE_SIZE?: string;
  readonly VITE_MIN_ANDROID_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
