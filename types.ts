export interface UserData {
  fullName: string;
  city: string;
  email: string;
  phone: string;
  role: string;
  education: string;
  imdbLink: string;
  documents: File[];
}

export type AppView = 'wizard' | 'dashboard';
export type Language = 'ru' | 'en';

export enum WizardStep {
  PERSONAL = 1,
  PROFESSIONAL = 2,
  DOCUMENTS = 3,
  REVIEW = 4
}

export interface DashboardTab {
  id: string;
  label: string;
  icon: any;
}