import confetti from 'canvas-confetti';
import { APP_CONFIG } from '../config/appConfig';

export interface DownloadResult {
  success: boolean;
  message: string;
  downloadUrl: string;
}

/**
 * Resolves any direct URL, converting standard Google Drive preview links 
 * to direct-download endpoints if provided.
 */
export function getDirectDownloadUrl(url: string = APP_CONFIG.apkDownloadUrl): string {
  if (!url) return '';

  // Google Drive standard preview link: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${driveFileMatch[1]}&confirm=t`;
  }

  // Google Drive open link: https://drive.google.com/open?id=FILE_ID
  const driveOpenMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (driveOpenMatch && driveOpenMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${driveOpenMatch[1]}&confirm=t`;
  }

  return url;
}

/**
 * Triggers the APK file download and optional celebratory confetti.
 */
export async function triggerApkDownload(customUrl?: string): Promise<DownloadResult> {
  const targetUrl = customUrl || APP_CONFIG.apkDownloadUrl;
  const directUrl = getDirectDownloadUrl(targetUrl);

  if (!directUrl) {
    return {
      success: false,
      message: 'APK download URL is currently unconfigured in the environment.',
      downloadUrl: '#',
    };
  }

  try {
    // Create an invisible anchor tag to initiate standard file download
    const link = document.createElement('a');
    link.href = directUrl;
    link.download = `MediAssist-v${APP_CONFIG.appVersion}.apk`;
    link.target = directUrl.startsWith('http') && !directUrl.startsWith(window.location.origin) ? '_blank' : '_self';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Trigger subtle celebratory confetti effect
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#0284C7', '#0EA5E9', '#38BDF8', '#10B981'],
        disableForReducedMotion: true,
      });
    } catch {
      // Confetti is optional
    }

    return {
      success: true,
      message: 'Download initiated. Check your browser downloads.',
      downloadUrl: directUrl,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message:
        err instanceof Error
          ? err.message
          : 'Could not trigger automated download. Please use direct link.',
      downloadUrl: directUrl,
    };
  }
}

