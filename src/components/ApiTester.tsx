import { useState } from 'react';

export function ApiTester() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const apiUrl = import.meta.env.VITE_SUPABASE_URL;
  const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  async function testDirectApi() {
    if (!apiUrl || !apiKey) {
      setError('API URL or key is missing from environment variables');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Test direct API call to Supabase REST API
      const response = await fetch(
        `${apiUrl}/rest/v1/launch_timer?select=*&label=eq.site-launch`, 
        {
          method: 'GET',
          headers: {
            'apikey': apiKey,
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="p-4 border border-gray-700 rounded-lg bg-black/50">
      <h3 className="text-lg font-bold mb-2">Direct API Test</h3>
      
      <div className="mb-4">
        <p className="mb-2 text-sm">Test direct fetch to Supabase REST API</p>
        <div className="flex gap-2">
          <button
            onClick={testDirectApi}
            disabled={loading}
            className="px-3 py-1 bg-green-700 text-white rounded-md hover:bg-green-800 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Test Direct API'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="p-3 bg-red-900/30 border border-red-700 rounded-md mb-4 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {result && (
        <div className="mt-4">
          <h4 className="font-bold mb-1">Result:</h4>
          <pre className="text-xs p-3 bg-gray-900 rounded-md overflow-auto max-h-60">
            {result}
          </pre>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-400">
        <p>API URL: {apiUrl ? apiUrl : 'Missing!'}</p>
        <p>API Key: {apiKey ? '✓ Present' : 'Missing!'}</p>
      </div>
    </div>
  );
} 