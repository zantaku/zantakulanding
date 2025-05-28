import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { handleAniListCallback } from '../services/anilistService';

export default function AniListCallback() {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleAniListCallback(code);
    } else {
      window.close();
    }
  }, [searchParams]);
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Authenticating with AniList...</p>
      </div>
    </div>
  );
} 