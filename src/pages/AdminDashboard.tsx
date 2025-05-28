import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface AffiliateProfile {
  id?: number;
  username: string;
  pfp_url: string;
  about: string;
  why_zantaku: string;
  top_anime: string[];
  top_manga: string[];
  created_at: string;
}

interface SocialLink {
  id?: number;
  profile_id: number;
  platform_name: string;
  url: string;
  position: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [affiliates, setAffiliates] = useState<AffiliateProfile[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAffiliate, setSelectedAffiliate] = useState<AffiliateProfile | null>(null);
  const [affiliateSocialLinks, setAffiliateSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/adminp/login');
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      // Fetch affiliate profiles
      const { data: profileData, error: profileError } = await supabase
        .from('affiliate_profiles')
        .select('*');

      if (profileError) throw profileError;

      // Fetch social links
      const { data: linksData, error: linksError } = await supabase
        .from('affiliate_social_links')
        .select('*')
        .order('position');

      if (linksError) throw linksError;

      setAffiliates(profileData || []);
      setSocialLinks(linksData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/adminp/login');
  };

  const handleViewAffiliate = (affiliate: AffiliateProfile) => {
    setSelectedAffiliate(affiliate);
    
    // Filter social links for this affiliate
    const filteredLinks = socialLinks.filter(link => link.profile_id === affiliate.id);
    setAffiliateSocialLinks(filteredLinks);
  };

  const handleCloseDetails = () => {
    setSelectedAffiliate(null);
  };

  const handleVisitLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getAffiliateUrl = (username: string) => {
    // Use localhost instead of domain
    return `http://localhost:8080/${username}`;
  };

  const handleEditAffiliate = (id: number) => {
    // For future implementation: edit functionality
    console.log('Edit affiliate:', id);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Zantaku Affiliate Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : selectedAffiliate ? (
          // Affiliate Detail View
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Affiliate Details</h2>
              <button 
                onClick={handleCloseDetails}
                className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
              >
                Back to List
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Information */}
              <div className="bg-gray-700 p-6 rounded-lg col-span-1">
                <div className="flex flex-col items-center mb-6">
                  <img 
                    src={selectedAffiliate.pfp_url} 
                    alt={selectedAffiliate.username}
                    className="w-24 h-24 rounded-full mb-3"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/96';
                    }}
                  />
                  <h3 className="text-xl font-semibold">{selectedAffiliate.username}</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 uppercase">About</h4>
                    <p className="mt-1">{selectedAffiliate.about}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 uppercase">Why Zantaku?</h4>
                    <p className="mt-1">{selectedAffiliate.why_zantaku}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 uppercase">Joined</h4>
                    <p className="mt-1">{new Date(selectedAffiliate.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              {/* Favorite Content */}
              <div className="bg-gray-700 p-6 rounded-lg col-span-1">
                <h3 className="font-semibold mb-4">Favorite Content</h3>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-400 uppercase mb-2">Top Anime</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedAffiliate.top_anime && selectedAffiliate.top_anime.map((anime, index) => (
                      <li key={index} className="text-sm">{anime}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-400 uppercase mb-2">Top Manga</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedAffiliate.top_manga && selectedAffiliate.top_manga.map((manga, index) => (
                      <li key={index} className="text-sm">{manga}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="bg-gray-700 p-6 rounded-lg col-span-1">
                <h3 className="font-semibold mb-4">Social Links</h3>
                
                {affiliateSocialLinks.length ? (
                  <ul className="space-y-3">
                    {affiliateSocialLinks.map((link) => (
                      <li key={link.url} className="flex justify-between items-center bg-gray-800 p-3 rounded-md">
                        <div>
                          <span className="font-medium">{link.platform_name}</span>
                          <p className="text-xs text-gray-400 truncate max-w-[200px]">{link.url}</p>
                        </div>
                        <button
                          onClick={() => handleVisitLink(link.url)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                        >
                          Visit
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No social links found.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Affiliate List View
          <div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Affiliate Links</h2>
                <p className="text-sm text-gray-400">Total: {affiliates.length}</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Username
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Joined
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Social Links
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {affiliates.map((affiliate) => (
                      <tr 
                        key={affiliate.username} 
                        className="hover:bg-gray-750 cursor-pointer transition-colors"
                        onClick={() => handleViewAffiliate(affiliate)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img 
                                className="h-10 w-10 rounded-full" 
                                src={affiliate.pfp_url} 
                                alt="" 
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
                                }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium">{affiliate.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{new Date(affiliate.created_at).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {socialLinks.filter(link => link.profile_id === affiliate.id).length}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleVisitLink(getAffiliateUrl(affiliate.username))}
                              className="text-indigo-400 hover:text-indigo-300 bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 transition-colors"
                            >
                              Visit Link
                            </button>
                            <button
                              onClick={() => handleEditAffiliate(affiliate.id || 0)}
                              className="text-yellow-400 hover:text-yellow-300 bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard; 