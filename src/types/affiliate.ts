export interface AffiliateProfile {
  id?: number;
  username: string;
  pfp_url: string;
  about: string;
  why_zantaku: string;
  created_at?: string;
  user_id?: string;
  is_verified?: boolean;
  is_public?: boolean;
  is_approved?: boolean;
  submitted_at?: string;
  pronouns?: string;
  custom_pronouns?: string;
  country?: string;
  state?: string;
  reason?: string;
  excitement?: number;
  contact_method?: 'Email' | 'Discord';
  email?: string;
  discord?: string;
  is_in_discord?: boolean;
  heard_from?: string;
  theme_id?: number;
  platform?: string;
  anilist_username?: string;
  anilist_avatar?: string;
}

export interface AniListAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

export interface AniListUser {
  id: number;
  name: string;
  avatar: {
    medium: string;
    large: string;
  };
}

export type ContactMethod = 'Email' | 'Discord';

export type HeardFrom = 'Twitter' | 'Discord' | 'Friend' | 'Other';

export interface CustomLinkFormData {
  username: string;
  pfp_url: string;
  pronouns: string;
  custom_pronouns?: string;
  country: string;
  state?: string;
  reason: string;
  why_zantaku: string;
  show_guidelines: boolean;
  excitement: number;
  contact_method: ContactMethod;
  email?: string;
  discord?: string;
  is_in_discord: boolean;
  heard_from: HeardFrom;
  theme_id?: number;
  platform: string;
  anilist_username: string;
  anilist_avatar: string;
  is_verified: boolean;
} 