import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// User types
export interface UserSession {
  user_id: string;
  username: string;
  is_authenticated: boolean;
  profile_id?: number;
}

/**
 * Sign up a new user
 */
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
};

/**
 * Sign in a user
 */
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  return await supabase.auth.signOut();
};

/**
 * Get the current user session
 */
export const getCurrentSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

/**
 * Get the current authenticated user
 */
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

/**
 * Check if a user owns a specific profile
 */
export const isProfileOwner = async (username: string) => {
  try {
    // Get current authenticated user
    const user = await getCurrentUser();
    
    if (!user) return false;
    
    // Get the profile with the specified username
    const { data: profile } = await supabase
      .from('affiliate_profiles')
      .select('id, user_id')
      .eq('username', username)
      .single();
    
    // Check if the profile exists and if the current user owns it
    return profile && profile.user_id === user.id;
  } catch (error) {
    console.error('Error checking profile ownership:', error);
    return false;
  }
};

/**
 * Associate a user account with a profile
 */
export const linkUserToProfile = async (profileId: number, userId: string) => {
  try {
    const { data, error } = await supabase
      .from('affiliate_profiles')
      .update({ user_id: userId })
      .eq('id', profileId);
      
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error linking user to profile:', error);
    return { success: false, error };
  }
};

/**
 * Get user metadata with profile information
 */
export const getUserProfileData = async () => {
  try {
    const user = await getCurrentUser();
    
    if (!user) return null;
    
    // Get the profile associated with this user
    const { data: profile } = await supabase
      .from('affiliate_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    return { user, profile };
  } catch (error) {
    console.error('Error getting user profile data:', error);
    return null;
  }
};

/**
 * Set up a listener for auth state changes
 */
export const onAuthStateChange = (callback: (event: string, session: unknown) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};

/**
 * Connect an AniList account to the user's profile
 */
export const connectAniListAccount = async (anilistUserId: string, username: string) => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }
    
    // Update the user's metadata to include AniList information
    const { data, error } = await supabase.auth.updateUser({
      data: { 
        anilist_connected: true,
        anilist_user_id: anilistUserId,
        anilist_username: username
      }
    });
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error: unknown) {
    console.error('Error connecting AniList account:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}; 