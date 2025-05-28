import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing authentication...');
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔄 AuthCallback component mounted - starting authentication process');
    
    const handleCallback = async () => {
      try {
        // Get the code from query parameters (authorization code flow)
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');
        
        console.log('🔍 URL Query Parameters:', Object.fromEntries(queryParams.entries()));
        
        if (!code) {
          console.error('❌ No authentication code found in URL');
          setStatus('error');
          setMessage('No authentication code received');
          
          // Notify opener window about the error
          if (window.opener) {
            window.opener.postMessage({ 
              type: 'AUTH_ERROR', 
              error: 'Missing authorization code' 
            }, window.location.origin);
          }
          
          return;
        }
        
        console.log('✅ Received auth code:', code.substring(0, 5) + '...');
        setDebugInfo(`Auth code: ${code.substring(0, 10)}...`);
        
        // Store the code for later use
        localStorage.setItem('anilist_auth_code', code);
        console.log('💾 Stored auth code in localStorage');

        try {
          // STEP 1: Exchange the authorization code for an access token
          console.log('🔑 Exchanging authorization code for access token...');
          
          // Normally this should be done on a backend to keep client_secret secure
          // For development purposes only, we'll do it in the browser
          const clientId = '26188';
          const redirectUri = `${window.location.origin}/auth/callback`;
          
          // If you have a client secret in env vars, use it (but ideally this exchange happens on a backend)
          // const clientSecret = import.meta.env.VITE_ANILIST_CLIENT_SECRET || '';
          
          const tokenResponse = await fetch('https://anilist.co/api/v2/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              grant_type: 'authorization_code',
              client_id: clientId,
              // client_secret: clientSecret, // You would need this in a real implementation
              redirect_uri: redirectUri,
              code,
            }),
          });
          
          console.log('📥 Token Response Status:', tokenResponse.status);
          
          if (!tokenResponse.ok) {
            console.error('❌ Failed to exchange code for token:', tokenResponse.statusText);
            
            // If token exchange fails, try plan B: fetching public profile with username
            console.log('🔄 Token exchange failed, trying plan B...');
            handlePlanB(code);
            return;
          }
          
          const tokenData = await tokenResponse.json();
          console.log('📦 Token Data Received:', Object.keys(tokenData).join(', '));
          
          const accessToken = tokenData.access_token;
          
          if (!accessToken) {
            console.error('❌ No access token in response');
            handlePlanB(code);
            return;
          }
          
          console.log('✅ Successfully received access token');
          localStorage.setItem('anilist_access_token', accessToken);
          
          // STEP 2: Use the access token to fetch user data
          console.log('👤 Fetching user data with access token...');
          const query = `
            query {
              Viewer {
                id
                name
                avatar {
                  large
                }
              }
            }
          `;
          
          const userResponse = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ query })
          });
          
          console.log('📥 User API Response Status:', userResponse.status);
          const userData = await userResponse.json();
          console.log('📦 User Data Response:', JSON.stringify(userData, null, 2));
          
          // Check if we received valid user data
          if (userData.data?.Viewer?.name) {
            const username = userData.data.Viewer.name;
            const avatarUrl = userData.data.Viewer.avatar?.large;
            
            console.log('🎉🎉🎉 SUCCESS! AUTHENTICATED USER FOUND 🎉🎉🎉');
            console.log('👤 Username:', username);
            console.log('🆔 User ID:', userData.data.Viewer.id);
            console.log('🖼️ Avatar URL:', avatarUrl || 'none');
            
            // Validate username is not empty
            if (!username || username.trim() === '') {
              console.error('❌ Empty username received from AniList API!');
              console.log('🔍 Full Viewer object:', userData.data.Viewer);
              
              // Try to fetch username using alternative method
              handlePlanB(code);
              return;
            }
            
            // Store the retrieved data
            localStorage.setItem('anilist_username', username);
            if (avatarUrl) {
              localStorage.setItem('anilist_avatar', avatarUrl);
            }
            
            // Send the data back to the opener window
            if (window.opener) {
              console.log('📤 Sending user data to opener window');
              console.log('📤 Data being sent:', {
                type: 'AUTH_SUCCESS',
                code: code.substring(0, 10) + '...',
                username: `"${username}"`, // Show quotes to see if there are any whitespace issues
                usernameLength: username.length,
                usernameType: typeof username,
                avatarUrl: avatarUrl ? (avatarUrl.substring(0, 20) + '...') : null
              });
              
              window.opener.postMessage({
                type: 'AUTH_SUCCESS',
                code,
                username,
                avatarUrl,
                accessToken // Optionally send the token back if you need it
              }, window.location.origin);
              
              console.log('📤 Message sent with username:', username);
            } else {
              console.warn('⚠️ No opener window found');
            }
            
            // Update UI
            setStatus('success');
            setMessage(`Welcome, ${username}! Authentication successful.`);
            setTimeout(() => {
              navigate('/');
            }, 1500);
          } else {
            console.error('❌ Failed to get user data from API response');
            handlePlanB(code);
          }
        } catch (fetchError) {
          console.error('❌ Error during fetch:', fetchError);
          handlePlanB(code);
        }
      } catch (error) {
        console.error('❌ Auth callback main error:', error);
        setStatus('error');
        setMessage('An error occurred during authentication');
        setDebugInfo(`Error details: ${error instanceof Error ? error.stack : String(error)}`);
        
        // Notify opener about the error
        if (window.opener) {
          window.opener.postMessage({ 
            type: 'AUTH_ERROR', 
            error: 'Authentication process failed' 
          }, window.location.origin);
        }
      }
    };
    
    const handlePlanB = async (code: string) => {
      console.log('🔄 Executing Plan B: Prompt for username and fetch public profile');
      
      // Prompt user for their username
      const promptResult = window.prompt('Could not automatically retrieve your username. Please enter your AniList username:');
      
      if (!promptResult) {
        console.log('⚠️ User cancelled username prompt, sending just the auth code');
        sendAuthSuccessToParent(code);
        return;
      }
      
      const username = promptResult.trim();
      console.log('🔤 User provided username:', username);
      
      try {
        // Verify the username using AniList's public API
        const publicQuery = `
          query ($username: String) {
            User(name: $username) {
              id
              name
              avatar {
                large
              }
            }
          }
        `;
        
        const publicResponse = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: publicQuery,
            variables: { username }
          })
        });
        
        const publicResult = await publicResponse.json();
        console.log('📦 Public API Response:', JSON.stringify(publicResult, null, 2));
        
        if (publicResult.data?.User) {
          // We found the user!
          const verifiedUsername = publicResult.data.User.name;
          const avatarUrl = publicResult.data.User.avatar?.large;
          
          // Store the verified data
          localStorage.setItem('anilist_username', verifiedUsername);
          if (avatarUrl) {
            localStorage.setItem('anilist_avatar', avatarUrl);
          }
          
          // Send data to opener
          if (window.opener) {
            console.log('📤 Sending verified user data to opener window');
            window.opener.postMessage({
              type: 'AUTH_SUCCESS',
              code,
              username: verifiedUsername,
              avatarUrl
            }, window.location.origin);
            
            console.log('📤 Message sent with username:', verifiedUsername);
          }
          
          // Update UI
          setStatus('success');
          setMessage(`Welcome, ${verifiedUsername}! Authentication successful.`);
          setTimeout(() => {
            navigate('/');
          }, 1500);
          
        } else {
          console.error('❌ Could not verify provided username');
          setStatus('error');
          setMessage('Could not verify the provided username. Please try again.');
          
          // Just send the auth code back
          if (window.opener) {
            window.opener.postMessage({
              type: 'AUTH_SUCCESS',
              code
            }, window.location.origin);
          }
        }
      } catch (publicError) {
        console.error('❌ Error fetching public user data:', publicError);
        sendAuthSuccessToParent(code);
      }
    };
    
    handleCallback();
  }, [location, navigate]);

  const sendAuthSuccessToParent = (code: string) => {
    // Send auth success message to parent window with just the code
    if (window.opener) {
      console.log('📤 Sending auth code to opener window (fallback)');
      window.opener.postMessage({
        type: 'AUTH_SUCCESS',
        code
      }, window.location.origin);
      console.log('📤 Message sent with code only');
    } else {
      console.warn('⚠️ No opener window found to send auth code to');
    }
    
    // Mark success and redirect
    setStatus('success');
    setMessage('Authentication code received. Redirecting...');
    
    // Redirect back to the main application
    console.log('⏱️ Setting timeout to redirect back to main app');
    setTimeout(() => {
      console.log('🔄 Redirecting to main app');
      navigate('/');
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          AniList Authentication
        </h1>
        
        <div className="flex flex-col items-center justify-center space-y-4">
          {status === 'processing' && (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
              <p className="text-gray-600 dark:text-gray-300">{message}</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{message}</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{message}</p>
              <button 
                onClick={() => navigate('/')}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Return to App
              </button>
            </div>
          )}
        </div>
        
        {debugInfo && (
          <div className="mt-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
            <p className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {debugInfo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 