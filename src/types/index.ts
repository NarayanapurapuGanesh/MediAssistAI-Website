export interface FeatureItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  badge?: string;
  highlights: string[];
}

export interface AppScreenMockup {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: string;
  previewType: 'chat' | 'medicine' | 'records' | 'security';
}

export interface StepItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tip?: string;
  iconName: string;
}

export interface SecurityPoint {
  title: string;
  description: string;
  iconName: string;
  tag: string;
}
