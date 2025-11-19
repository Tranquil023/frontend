import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Phone, Lock, Send, AlertCircle } from 'lucide-react';
import axios from 'axios';
import authApi from '../services/auth';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthData } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordSaved, setShowPasswordSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setIsLoading(true);

  try {
    // Call the backend login API with phone and password
    const response = await authApi.login({
      phone: phoneNumber,
      password: password,
    });

    // Optional: display temporary success UI before setting auth state
    setShowPasswordSaved(true);

    // Store auth data and navigate after a brief delay
    setTimeout(() => {
      setAuthData(response.token, response.user);
      navigate('/home');
    }, 1000);

  } catch (err) {
    // Handle Axios-specific errors
    if (axios.isAxiosError(err) && err.response) {
      setError(err.response.data.message || 'Invalid login credentials');
    } else {
      // Handle other possible errors
      setError('An error occurred during login');
    }

  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-green-500 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo Section */}
          <div className="text-center space-y-6">
            <Logo className="w-32 h-32 mx-auto" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-1">
                Stack
              </h1>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number Input */}
            <div className="relative">
              <div className="flex items-center bg-yellow-300 rounded-2xl border-2 border-gray-200 focus-within:border-blue-500 transition-colors">
                <div className="flex items-center px-4 py-4 space-x-2">
                  <div className="w-6 h-4 bg-green-700 rounded-sm border border-gray-300"></div>
                  <span className="text-black font-medium">+91</span>
                </div>
                <div className="w-px h-8 bg-black"></div>
                <div className="flex-1 relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="flex items-center bg-white rounded-2xl border-2 border-gray-200 focus-within:border-blue-500 transition-colors">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-3 rounded-lg">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-700 to-orange-500 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-lg">
                {isLoading ? 'LOGGING IN...' : 'LOG IN'}
              </span>
              {/* <Send size={20} /> */}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center">
            <button 
              onClick={() => navigate('/register')}
              className="text-gray-800 hover:text-gray-800 transition-colors"
            >
              <span className="font-medium">Don't have an account?</span>
              <span className="text-black hover:underline"> Register</span>
            </button>
          </div>
        </div>
      </div>

      {/* Password Saved Notification */}
      {showPasswordSaved && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in">
          Password saved
        </div>
      )}
    </div>
  );
};

export default LoginScreen;