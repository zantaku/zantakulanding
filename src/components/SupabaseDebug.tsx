import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { createLaunchTimer } from '../utils/createLaunchTimer';
import { LaunchTimer } from '../types';
import { ApiTester } from './ApiTester';

export function SupabaseDebug() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Initializing...');
  const [timerData, setTimerData] = useState<LaunchTimer | null>(null);
  
  async function testConnection() {
    try {
      setStatus('loading');
      setMessage('Testing Supabase connection...');
      
      // 1. First check if we can connect to Supabase at all
      const { error: healthError } = await supabase.from('launch_timer').select('count()', { count: 'exact' });
      
      if (healthError) {
        setStatus('error');
        setMessage(`Connection error: ${healthError.message}`);
        console.error('Supabase connection error:', healthError);
        return;
      }
      
      setMessage('Connection successful, checking timer data...');
      
      // 2. Try to get the timer data
      const { data: timerData, error: timerError } = await supabase
        .from('launch_timer')
        .select('*')
        .eq('label', 'site-launch');
      
      if (timerError) {
        setStatus('error');
        setMessage(`Error fetching timer: ${timerError.message}`);
        console.error('Error fetching timer:', timerError);
        return;
      }
      
      if (!timerData || timerData.length === 0) {
        setMessage('No timer found, will create one...');
        
        // 3. Create a timer if none exists
        try {
          const newTimer = await createLaunchTimer('site-launch', 10);
          setTimerData(newTimer);
          setStatus('success');
          setMessage('Timer created successfully!');
        } catch (error) {
          setStatus('error');
          setMessage(`Error creating timer: ${error instanceof Error ? error.message : String(error)}`);
          console.error('Error creating timer:', error);
        }
      } else {
        setTimerData(timerData[0]);
        setStatus('success');
        setMessage('Timer found in database!');
      }
    } catch (error) {
      setStatus('error');
      setMessage(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
      console.error('Unexpected error:', error);
    }
  }
  
  useEffect(() => {
    testConnection();
  }, []);
  
  const statusColors = {
    loading: 'text-yellow-400',
    success: 'text-green-400',
    error: 'text-red-400'
  };
  
  return (
    <div className="space-y-6">
      <div className="p-4 border border-gray-700 rounded-lg bg-black/50 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Supabase Debug Panel</h2>
        
        <div className={`mb-4 font-mono ${statusColors[status]}`}>
          Status: {status.toUpperCase()} - {message}
        </div>
        
        {timerData && (
          <div className="border border-gray-700 rounded p-3 bg-black/30 mb-4">
            <h3 className="font-bold mb-2">Timer Data:</h3>
            <pre className="text-xs overflow-auto">{JSON.stringify(timerData, null, 2)}</pre>
            <p className="mt-2">
              Expires: {new Date(timerData.expires_at).toLocaleString()}
            </p>
          </div>
        )}
        
        <div className="flex gap-2">
          <button 
            onClick={testConnection}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry Connection
          </button>
          
          <button 
            onClick={async () => {
              try {
                const newTimer = await createLaunchTimer('site-launch', 10);
                setTimerData(newTimer);
                setStatus('success');
                setMessage('Timer manually created/updated!');
              } catch (error) {
                setStatus('error');
                setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
              }
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Create/Reset Timer
          </button>
        </div>
      </div>
      
      <div className="max-w-xl mx-auto">
        <ApiTester />
      </div>

      <div className="p-4 border border-gray-700 rounded-lg bg-black/50 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Environment Variables</h2>
        <div className="text-sm font-mono">
          <p>VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL || 'Not set'}</p>
          <p>VITE_SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✓ Present (hidden)' : 'Not set'}</p>
        </div>
      </div>
    </div>
  );
} 