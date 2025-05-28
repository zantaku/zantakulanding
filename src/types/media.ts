export type MediaType = 'ANIME' | 'MANGA';

export interface Media {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  coverImage: {
    large: string;
    extraLarge?: string;
  };
  meanScore: number;
  episodes?: number;
  chapters?: number;
  genres: string[];
  description?: string | null;
  type: MediaType;
}

export interface AniListMediaResponse {
  id: number;
  title: {
    romaji: string;
    english: string | null;
  };
  coverImage: {
    large: string;
    extraLarge?: string;
  };
  meanScore: number | null;
  episodes?: number | null;
  chapters?: number | null;
  genres: string[];
  description?: string | null;
}

export interface MediaStats {
  anime: number;
  manga: number;
  users: number;
} 