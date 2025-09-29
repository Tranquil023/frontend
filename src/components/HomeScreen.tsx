import React, { useState } from 'react';
import { Globe, Bell, Settings, MessageCircle, CreditCard, ArrowDownToLine, TrendingUp } from 'lucide-react';
import Logo from './Logo';
import NotificationModal from './NotificationModal';

interface HomeScreenProps {
  onNavigateToRecharge: () => void;
  onNavigateToWithdraw: () => void;
  onNavigateToContact: () => void;
  onNavigateToCheckIn: () => void;
  onNavigateToInvest: (plan?: any) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ 
  onNavigateToRecharge, 
  onNavigateToWithdraw, 
  onNavigateToContact, 
  onNavigateToCheckIn,
  onNavigateToInvest 
}) => {
  const [showNotification, setShowNotification] = useState(false);

  const actionButtons = [
    { icon: Settings, label: 'CheckIn', color: 'from-blue-500 to-blue-600', onClick: onNavigateToCheckIn },
    { icon: MessageCircle, label: 'contact', color: 'from-purple-500 to-purple-600', onClick: onNavigateToContact },
    { icon: CreditCard, label: 'Recharge', color: 'from-green-500 to-green-600', onClick: onNavigateToRecharge },
    { icon: ArrowDownToLine, label: 'withdraw', color: 'from-orange-500 to-orange-600', onClick: onNavigateToWithdraw },
  ];

  const specialPlan = {
    name: 'Limited Offer',
    price: '₹5000',
    dailyProfit: '₹4000',
    totalIncome: '₹8000',
    duration: '2 Days'
  };


  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-600 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <Logo className="w-12 h-12" />
        <div className="flex items-center space-x-4">
          <Globe className="w-6 h-6 text-white" />
          <button onClick={() => setShowNotification(true)}>
            <Bell className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 space-y-6">
        {/* Hero Image */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Company Building"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-4">
          {actionButtons.map((button, index) => {
            const Icon = button.icon;
            return (
              <div key={index} className="text-center">
                <button 
                  onClick={button.onClick}
                  className={`w-16 h-16 bg-gradient-to-br ${button.color} rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </button>
                <span className="text-white text-sm font-medium">{button.label}</span>
              </div>
            );
          })}
        </div>

        {/* Special Plan */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
              <h2 className="text-xl font-bold text-gray-800">Special Plan</h2>
            </div>
            <div className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
              Days:2
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Limited Offer</h3>
              <div className="flex justify-between items-center mb-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">₹ 2999</div>
                  <div className="text-gray-500 text-sm">Daily Profit</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">₹ 14995</div>
                  <div className="text-gray-500 text-sm">Total Income</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-800">Price: ₹775</div>
            <button 
              onClick={() => onNavigateToInvest(specialPlan)}
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200 shadow-lg"
            >
              Invest
            </button>
          </div>
        </div>

        {/* Notification */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 flex items-center space-x-3">
          <Logo className="w-10 h-10" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-gray-800">User 2137 ****50</span>
              <span className="text-xs text-gray-500">just received</span>
            </div>
            <p className="text-gray-600 text-sm">Withdraw 74423 successfully</p>
          </div>
        </div>
      </div>
    </div>
    
    <NotificationModal 
      isOpen={showNotification} 
      onClose={() => setShowNotification(false)} 
    />
    </>
  );
};

export default HomeScreen;