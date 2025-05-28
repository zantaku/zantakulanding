import { AniListAuthResponse, AniListUser } from '../types/affiliate';

const ANILIST_CLIENT_ID = '26188';
const ANILIST_REDIRECT_URI = 'http://localhost:8080/auth';

export const getAniListAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: ANILIST_CLIENT_ID,
    redirect_uri: ANILIST_REDIRECT_URI,
    response_type: 'code',
  });
  
  return `https://anilist.co/api/v2/oauth/authorize?${params.toString()}`;
};

export const exchangeCodeForToken = async (code: string): Promise<AniListAuthResponse> => {
  const response = await fetch('https://anilist.co/api/v2/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: ANILIST_CLIENT_ID,
      redirect_uri: ANILIST_REDIRECT_URI,
      code,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  return response.json();
};

export const getAniListUserInfo = async (accessToken: string): Promise<AniListUser> => {
  const query = `
    query {
      Viewer {
        id
        name
        avatar {
          medium
          large
        }
      }
    }
  `;

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  const data = await response.json();
  return data.data.Viewer;
};

export const handleAniListCallback = async (code: string) => {
  try {
    const tokenData = await exchangeCodeForToken(code);
    const userInfo = await getAniListUserInfo(tokenData.access_token);
    
    // Store in localStorage
    localStorage.setItem('anilist_username', userInfo.name);
    localStorage.setItem('anilist_avatar', userInfo.avatar.large);
    
    // Post message to parent window
    window.opener?.postMessage(
      {
        type: 'ANILIST_AUTH_SUCCESS',
        data: {
          username: userInfo.name,
          avatar: userInfo.avatar.large,
        },
      },
      '*'
    );
    
    // Close the popup window
    window.close();
  } catch (error) {
    console.error('AniList authentication error:', error);
    window.opener?.postMessage(
      {
        type: 'ANILIST_AUTH_ERROR',
        error: 'Authentication failed',
      },
      '*'
    );
    window.close();
  }
}; 