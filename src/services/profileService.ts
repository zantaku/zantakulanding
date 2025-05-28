// src/services/profileService.ts

// AniList GraphQL query for user profile
const ANILIST_USER_QUERY = `
  query ($username: String) {
    User(name: $username) {
      id
      name
      avatar {
        large
        medium
      }
      bannerImage
      about
      statistics {
        anime {
          count
          meanScore
          genres {
            genre
            count
          }
        }
        manga {
          count
          meanScore
          genres {
            genre
            count
          }
        }
      }
    }
  }
`;

// Fetch profile from AniList
export const fetchAniListProfile = async (username: string) => {
  try {
    console.log('Fetching AniList profile for:', username);
    
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: ANILIST_USER_QUERY,
        variables: { username }
      })
    });

    if (!response.ok) {
      console.error('AniList API error:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('AniList profile data:', data);

    if (data.errors) {
      console.error('AniList GraphQL errors:', data.errors);
      return null;
    }

    return data.data.User;
  } catch (error) {
    console.error('Error fetching AniList profile:', error);
    return null;
  }
};

// Fetch profile from MyAnimeList (using Jikan API)
export const fetchMyAnimeListProfile = async (username: string) => {
  try {
    console.log('Fetching MAL profile for:', username);
    
    // Using Jikan API v4
    const response = await fetch(`https://api.jikan.moe/v4/users/${username}/full`);
    
    if (!response.ok) {
      console.error('MyAnimeList API error:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('MyAnimeList profile data:', data);

    if (data.error) {
      console.error('MyAnimeList API error:', data.error);
      return null;
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching MyAnimeList profile:', error);
    return null;
  }
};

// Main function to fetch profile data based on platform
export const fetchProfileData = async (platform: string, username: string) => {
  if (!platform || !username) {
    console.error('Missing platform or username');
    return null;
  }

  let profileData = null;

  try {
    if (platform === 'AniList') {
      profileData = await fetchAniListProfile(username);
    } else if (platform === 'MyAnimeList') {
      profileData = await fetchMyAnimeListProfile(username);
    } else {
      console.error('Unsupported platform:', platform);
      return null;
    }

    if (!profileData) {
      console.error(`No profile found for ${username} on ${platform}`);
      return null;
    }

    // Extract the relevant data based on the platform
    const extractedData = {
      pfp_url: platform === 'AniList' 
        ? profileData.avatar?.large || profileData.avatar?.medium
        : profileData.images?.jpg?.image_url,
      bannerImage: platform === 'AniList'
        ? profileData.bannerImage
        : null,
      about: platform === 'AniList'
        ? profileData.about
        : profileData.about,
    };

    console.log('Extracted profile data:', extractedData);
    return extractedData;
  } catch (error) {
    console.error('Error in fetchProfileData:', error);
    return null;
  }
}; 