import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { isProfileOwner, getUserProfileData } from '../services/authService';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Section types for editing
type EditSection = 'profile' | 'social' | 'media' | 'theme' | '';

interface ProfileEditorProps {
  username: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileEditor({ username, isOpen, onClose }: ProfileEditorProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [activeSection, setActiveSection] = useState<EditSection>('');
  const [profileData, setProfileData] = useState<any>(null);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [about, setAbout] = useState('');
  const [pfpUrl, setPfpUrl] = useState('');
  const [themeId, setThemeId] = useState<number | null>(null);
  const [topAnime, setTopAnime] = useState<string[]>([]);
  const [topManga, setTopManga] = useState<string[]>([]);

  // Available themes
  const [availableThemes, setAvailableThemes] = useState<any[]>([]);

  // Check if the current user owns this profile
  useEffect(() => {
    if (isOpen) {
      checkOwnership();
    }
  }, [isOpen, username]);

  const checkOwnership = async () => {
    try {
      setLoading(true);
      
      // Verify ownership
      const ownerStatus = await isProfileOwner(username);
      setIsOwner(ownerStatus);
      
      if (!ownerStatus) {
        setError("You don't have permission to edit this profile");
        setLoading(false);
        return;
      }
      
      // Fetch profile data
      await fetchProfileData();
      
      // Fetch available themes
      await fetchThemes();
      
      setLoading(false);
    } catch (err) {
      console.error('Error checking profile ownership:', err);
      setError('Could not verify profile ownership');
      setLoading(false);
    }
  };

  const fetchProfileData = async () => {
    try {
      // Get profile data
      const { data: profile, error: profileError } = await supabase
        .from('affiliate_profiles')
        .select('*')
        .eq('username', username)
        .single();
        
      if (profileError) throw profileError;
      
      // Get social links
      const { data: links, error: linksError } = await supabase
        .from('affiliate_social_links')
        .select('*')
        .eq('profile_id', profile.id)
        .order('position');
        
      if (linksError) throw linksError;
      
      // Set form states
      setProfileData(profile);
      setSocialLinks(links || []);
      setAbout(profile.about || '');
      setPfpUrl(profile.pfp_url || '');
      setThemeId(profile.theme_id);
      setTopAnime(profile.top_anime || []);
      setTopManga(profile.top_manga || []);
      
    } catch (err) {
      console.error('Error fetching profile data:', err);
      setError('Could not load profile data');
    }
  };

  const fetchThemes = async () => {
    try {
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      setAvailableThemes(data || []);
    } catch (err) {
      console.error('Error fetching themes:', err);
    }
  };

  const saveProfileChanges = async () => {
    if (!profileData?.id) return;
    
    try {
      setIsSaving(true);
      setSaveSuccess(false);
      
      // Update profile data
      const { error } = await supabase
        .from('affiliate_profiles')
        .update({
          about,
          pfp_url: pfpUrl,
          theme_id: themeId,
          top_anime: topAnime,
          top_manga: topManga
        })
        .eq('id', profileData.id);
        
      if (error) throw error;
      
      // Success!
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving profile changes:', err);
      setError('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSocialLink = async (platform: string, url: string) => {
    if (!profileData?.id) return;
    
    try {
      setIsSaving(true);
      
      const position = socialLinks.length;
      
      const { data, error } = await supabase
        .from('affiliate_social_links')
        .insert([{
          profile_id: profileData.id,
          platform_name: platform,
          url,
          position
        }])
        .select();
        
      if (error) throw error;
      
      // Add to local state
      setSocialLinks([...socialLinks, data[0]]);
      
    } catch (err) {
      console.error('Error adding social link:', err);
      setError('Failed to add social link');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveSocialLink = async (linkId: number) => {
    try {
      setIsSaving(true);
      
      const { error } = await supabase
        .from('affiliate_social_links')
        .delete()
        .eq('id', linkId);
        
      if (error) throw error;
      
      // Update local state
      setSocialLinks(socialLinks.filter(link => link.id !== linkId));
      
    } catch (err) {
      console.error('Error removing social link:', err);
      setError('Failed to remove social link');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Edit Your Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-60px)]">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="p-6 text-center">
              <div className="text-red-400 mb-2">Error</div>
              <p className="text-white">{error}</p>
              {!isOwner && (
                <p className="mt-4 text-gray-400">
                  Only the owner of this profile can edit it.
                </p>
              )}
            </div>
          ) : (
            <div className="p-6">
              {/* Navigation */}
              <div className="flex mb-6 border-b border-gray-800">
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`py-2 px-4 ${activeSection === 'profile' ? 'text-white border-b-2 border-zantaku-pink' : 'text-gray-400 hover:text-white'}`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveSection('social')}
                  className={`py-2 px-4 ${activeSection === 'social' ? 'text-white border-b-2 border-zantaku-pink' : 'text-gray-400 hover:text-white'}`}
                >
                  Social Links
                </button>
                <button
                  onClick={() => setActiveSection('media')}
                  className={`py-2 px-4 ${activeSection === 'media' ? 'text-white border-b-2 border-zantaku-pink' : 'text-gray-400 hover:text-white'}`}
                >
                  Anime & Manga
                </button>
                <button
                  onClick={() => setActiveSection('theme')}
                  className={`py-2 px-4 ${activeSection === 'theme' ? 'text-white border-b-2 border-zantaku-pink' : 'text-gray-400 hover:text-white'}`}
                >
                  Theme
                </button>
              </div>
              
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Profile Picture URL
                    </label>
                    <input
                      type="text"
                      value={pfpUrl}
                      onChange={(e) => setPfpUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    />
                    {pfpUrl && (
                      <div className="mt-2 flex items-center">
                        <img 
                          src={pfpUrl} 
                          alt="Profile Preview" 
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => e.currentTarget.src = "https://i.pinimg.com/originals/93/d3/e3/93d3e31639a4d07613de9dccdc8bd5e8.png"}
                        />
                        <span className="ml-2 text-gray-400 text-sm">Preview</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      About Me
                    </label>
                    <textarea
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      rows={5}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    />
                  </div>
                </div>
              )}
              
              {/* Social Links Section */}
              {activeSection === 'social' && (
                <div className="space-y-4">
                  <h3 className="text-white font-medium">Your Social Links</h3>
                  
                  {socialLinks.length === 0 ? (
                    <p className="text-gray-400">No social links added yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {socialLinks.map((link) => (
                        <div key={link.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div>
                            <div className="text-white font-medium">{link.platform_name}</div>
                            <div className="text-gray-400 text-sm truncate max-w-xs">{link.url}</div>
                          </div>
                          <button
                            onClick={() => handleRemoveSocialLink(link.id)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Add new social link */}
                  <div className="mt-6 p-4 border border-gray-700 rounded-lg">
                    <h4 className="text-white font-medium mb-4">Add New Social Link</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Platform
                        </label>
                        <select
                          id="platform"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        >
                          <option value="Twitter">Twitter</option>
                          <option value="Instagram">Instagram</option>
                          <option value="YouTube">YouTube</option>
                          <option value="Twitch">Twitch</option>
                          <option value="GitHub">GitHub</option>
                          <option value="Website">Personal Website</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          URL
                        </label>
                        <input
                          type="text"
                          id="socialUrl"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                          placeholder="https://"
                        />
                      </div>
                      
                      <button
                        onClick={() => {
                          const platform = (document.getElementById('platform') as HTMLSelectElement).value;
                          const url = (document.getElementById('socialUrl') as HTMLInputElement).value;
                          if (url) handleAddSocialLink(platform, url);
                        }}
                        className="px-4 py-2 bg-zantaku-pink text-white rounded-lg hover:bg-zantaku-pink/80"
                      >
                        Add Link
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Anime & Manga Section */}
              {activeSection === 'media' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-3">Top Anime</h3>
                    <div className="space-y-2">
                      {topAnime.map((anime, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            value={anime}
                            onChange={(e) => {
                              const newList = [...topAnime];
                              newList[index] = e.target.value;
                              setTopAnime(newList);
                            }}
                            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                          />
                          <button
                            onClick={() => setTopAnime(topAnime.filter((_, i) => i !== index))}
                            className="ml-2 text-gray-400 hover:text-red-400"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                      ))}
                      
                      {topAnime.length < 5 && (
                        <button
                          onClick={() => setTopAnime([...topAnime, ''])}
                          className="px-4 py-2 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 w-full"
                        >
                          + Add Anime
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-medium mb-3">Top Manga</h3>
                    <div className="space-y-2">
                      {topManga.map((manga, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            value={manga}
                            onChange={(e) => {
                              const newList = [...topManga];
                              newList[index] = e.target.value;
                              setTopManga(newList);
                            }}
                            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                          />
                          <button
                            onClick={() => setTopManga(topManga.filter((_, i) => i !== index))}
                            className="ml-2 text-gray-400 hover:text-red-400"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                      ))}
                      
                      {topManga.length < 5 && (
                        <button
                          onClick={() => setTopManga([...topManga, ''])}
                          className="px-4 py-2 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 w-full"
                        >
                          + Add Manga
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Theme Section */}
              {activeSection === 'theme' && (
                <div className="space-y-4">
                  <h3 className="text-white font-medium">Choose Your Theme</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {availableThemes.map((theme) => (
                      <div
                        key={theme.id}
                        onClick={() => setThemeId(theme.id)}
                        className={`p-4 rounded-lg cursor-pointer ${
                          themeId === theme.id 
                            ? 'ring-2 ring-zantaku-pink' 
                            : 'hover:bg-gray-800'
                        }`}
                        style={{
                          background: theme.bg_gradient || '#1f2937',
                        }}
                      >
                        <div className="h-24 flex items-center justify-center">
                          <div className="text-center">
                            <div className={`text-${theme.text_color || 'white'} font-medium`}>
                              {theme.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-800 flex items-center justify-between">
          <div>
            {saveSuccess && (
              <span className="text-green-400 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Changes saved!
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={saveProfileChanges}
              disabled={isSaving || loading || !!error}
              className={`px-4 py-2 rounded-lg ${
                isSaving || loading || !!error
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-zantaku-pink text-white hover:bg-zantaku-pink/80'
              }`}
            >
              {isSaving ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 