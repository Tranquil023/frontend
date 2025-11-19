import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Phone, Lock, Send, User, AlertCircle } from 'lucide-react';
import axios from 'axios';
import authApi from '../services/auth';
import { useAuth } from '../contexts/AuthContext';

const RegisterScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthData } = useAuth();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [withdrawalPassword, setWithdrawalPassword] = useState('');
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    // Get code from URL path
    const pathParts = location.pathname.split('/');
    const code = pathParts[pathParts.length - 1];

    if (code && code !== 'register') {
      setReferralCode(code);
    }
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authApi.register(
        {
          full_name: name,
          phone: phoneNumber,
          password: password,
          withdrawal_password: withdrawalPassword,
        },
        referralCode // pass referralCode separately
      );


      setShowRegistrationSuccess(true);
      setTimeout(() => {
        setAuthData(response.token, response.user);
        navigate('/home');
      }, 1000);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Registration failed');
      } else {
        setError('An error occurred during registration');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-blue-500 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo Section */}
          <div className="text-center space-y-6">
            <Logo className="w-32 h-32 mx-auto" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                MoneyInvest
              </h1>
            </div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <div className="flex items-center bg-white rounded-2xl border-2 border-gray-200 focus-within:border-blue-500 transition-colors">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="relative">
              <div className="flex items-center bg-white rounded-2xl border-2 border-gray-200 focus-within:border-blue-500 transition-colors">
                <div className="flex items-center px-4 py-4 space-x-2">
                  <div className="w-6 h-4 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm border border-gray-300"></div>
                  <span className="text-gray-700 font-medium">+91</span>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
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

            {/* Referral Code Input (Optional) */}
            <div className="relative">
              <div className="flex items-center bg-white rounded-2xl border-2 border-gray-200 focus-within:border-blue-500 transition-colors">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Referral Code (Optional)"
                  className="w-full pl-12 pr-4 py-4 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Withdrawal Password Input */}
            <div className="relative">
              <div className="flex items-center bg-white rounded-2xl border-2 border-gray-200 focus-within:border-blue-500 transition-colors">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={withdrawalPassword}
                  onChange={(e) => setWithdrawalPassword(e.target.value)}
                  placeholder="Withdrawal Password"
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

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-700 to-orange-500 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-lg">
                {isLoading ? 'REGISTERING...' : 'REGISTER'}
              </span>
              <Send size={20} />
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span className="font-medium">Already have an account?</span>
              <span className="text-blue-600 hover:underline"> Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Registration Success Notification */}
      {showRegistrationSuccess && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in">
          Registration successful
        </div>
      )}
    </div>
  );
};

export default RegisterScreen;
