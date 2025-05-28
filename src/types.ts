export interface LaunchTimer {
  id: number;
  label: string;
  expires_at: string; // ISO date string
  created_at: string;
  show: boolean;
} 