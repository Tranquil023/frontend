import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Info, CreditCard, TrendingUp, TrendingDown, Download, LogOut } from 'lucide-react';
import Logo from './Logo';
import { getUserData, UserData } from '../services/payment';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const menuItems = [
    { icon: Info, label: 'My Plans', arrow: true, onClick: () => navigate('/my-plans') },
    { icon: CreditCard, label: 'Recharge Records', arrow: true, onClick: () => navigate('/recharge-record') },
    { icon: TrendingUp, label: 'Income Record', arrow: true, onClick: () => navigate('/income-record') },
    { icon: TrendingDown, label: 'Withdraw Record', arrow: true, onClick: () => navigate('/withdrawal-record') },
    { icon: Download, label: 'App Download', arrow: true },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const user = await getUserData();
        const data = user.data;
        setUserData(data);
        setError(null);
        console.log("user: ",user)
      } catch (err) {
        setError('Failed to load user data');
        // console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      // Clear user session or token (example: localStorage)
      localStorage.removeItem('token');
      // Redirect to login or home page
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  return (
    <div className="min-h-screen bg-green-600  pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8 mb-6">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <div className="p-2 bg-white/20 rounded-full">
          <Lock className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* User Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-white rounded-full p-2">
            <Logo className="w-full h-full" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{userData?.full_name}</h2>
            <p className="text-white/80 text-lg">{userData?.phone}</p>
          </div>
        </div>

        {/* Account Balance */}
        <div className="bg-yellow-500 rounded-3xl p-6 shadow-xl mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-lg">Account Balance</span>
            <button
              onClick={() => navigate('/recharge')}
              className="bg-gradient-to-r from-green-500 to-blue-600  text-white font-bold py-4 rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              Recharge
            </button>
          </div>
          <div className="text-4xl font-bold text-gray-800">₹{userData?.balance}</div>
        </div>

        {/* Stats */}
        <div className="bg-yellow-600 rounded-3xl p-6 shadow-xl mb-6">
          <div className="grid grid-cols-3 gap-4 text-black text-center">
            <div>
              <div className="text-2xl font-bold">₹{userData?.totalInvested}</div>
              <div className="text-sm opacity-90">Recharge balance</div>
            </div>
            <div>
              <div className="text-2xl font-bold">₹{userData?.totalWithdrawal}</div>
              <div className="text-sm opacity-90">Withdraw Balance</div>
            </div>
            <div>
              <div className="text-2xl font-bold">₹{userData?.totalEarnings}</div>
              <div className="text-sm opacity-90">Total income</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between text-white hover:bg-white/20 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.arrow && <ArrowRight className="w-5 h-5 text-white/70" />}
              </button>
            );
          })}
        </div>

        {/* Exit App Button */}
        <button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-4 rounded-3xl transition-colors duration-200 shadow-lg mt-8 flex items-center justify-center space-x-2" onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
          <span className="text-lg">Exit App</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;