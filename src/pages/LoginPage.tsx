import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signIn, signUp } from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError(null);
    setLoading(true);
    
    try {
      if (isSignUp) {
        // Validate password match
        if (password !== confirmPassword) {
          setError("Passwords don't match");
          setLoading(false);
          return;
        }
        
        // Sign up
        const { error } = await signUp(email, password);
        
        if (error) {
          throw error;
        }
        
        // Show success message for sign up
        setShowSuccess(true);
        setTimeout(() => {
          setIsSignUp(false);
          setShowSuccess(false);
        }, 3000);
      } else {
        // Sign in
        const { error } = await signIn(email, password);
        
        if (error) {
          throw error;
        }
        
        // Redirect to home page
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          style={{ background: 'linear-gradient(to bottom, rgba(124, 28, 28, 0.1), transparent)' }}
          className="absolute inset-0"
        ></motion.div>
      </div>
      
      <div className="max-w-md w-full space-y-8 relative">
        <div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto h-16 w-16 relative"
          >
            <div className="absolute inset-0 bg-zantaku-pink/20 rounded-full blur-xl"></div>
            <div className="relative flex items-center justify-center h-full text-3xl">
              🏮
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-6 text-center text-3xl font-extrabold text-white"
          >
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-2 text-center text-sm text-gray-400"
          >
            {isSignUp 
              ? 'Join Zantaku and customize your anime shrine!' 
              : 'Welcome back to Zantaku'}
          </motion.p>
        </div>
        
        {showSuccess ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-900/30 border border-green-500/30 rounded-lg p-6 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-500/20 p-3">
                <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Account created successfully!</h3>
            <p className="text-green-300/80 mb-4">Check your email to confirm your account.</p>
            <p className="text-gray-400 text-sm">Switching to login...</p>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 space-y-6" 
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="bg-red-900/30 border border-red-500/30 text-white p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md space-y-4">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-800/50 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-zantaku-pink focus:border-zantaku-pink focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-800/50 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-zantaku-pink focus:border-zantaku-pink focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              
              {isSignUp && (
                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-800/50 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-zantaku-pink focus:border-zantaku-pink focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-medium text-zantaku-pink hover:text-zantaku-pink/80 transition-colors"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                  loading 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-zantaku-red to-zantaku-pink hover:brightness-110'
                } focus:outline-none transition-all duration-150 ease-in-out`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : isSignUp ? (
                  'Create Account'
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <Link
                  to="/"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg bg-gray-800/30 hover:bg-gray-800/70 text-white transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default LoginPage; 