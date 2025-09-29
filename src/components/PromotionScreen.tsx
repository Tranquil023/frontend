import React from 'react';
import { Copy, Eye, Award, Check } from 'lucide-react';

const PromotionScreen: React.FC = () => {
  const [copied, setCopied] = React.useState(false);
  
  const invitationLink = "https://wiprox-invest11.icu/pages/register/register?id=820503";
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = invitationLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const levels = [
    { 
      id: 1, 
      title: 'First Level', 
      icon: '🥇', 
      rebate: '₹0.00', 
      rebatePercent: '(15%)', 
      quantity: 0,
      color: 'from-yellow-600 to-orange-600'
    },
    { 
      id: 2, 
      title: 'Second Level', 
      icon: '🥈', 
      rebate: '0%', 
      rebatePercent: '', 
      quantity: 0,
      color: 'from-yellow-700 to-orange-700'
    },
    { 
      id: 3, 
      title: 'Third Level', 
      icon: '🥉', 
      rebate: '0%', 
      rebatePercent: '', 
      quantity: 0,
      color: 'from-yellow-800 to-orange-800'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-600 pb-20">
      {/* Header */}
      <div className="text-center p-4 pt-8 mb-6">
        <h1 className="text-2xl font-bold text-white">Promotion</h1>
      </div>

      <div className="px-4 space-y-6">
        {/* Stats */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">0</div>
              <div className="text-gray-600">Total People</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">₹0</div>
              <div className="text-gray-600">Team Recharge</div>
            </div>
          </div>
        </div>

        {/* Invitation Link */}
        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-3xl p-4 shadow-xl">
          <div className="flex items-start space-x-3 mb-4">
            <div className="text-2xl mt-1">🎁</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-800 mb-2">Invitation Link</h3>
              <div className="bg-white rounded-2xl p-3 mb-3">
                <p className="text-gray-700 text-sm break-all leading-relaxed">
                  {invitationLink}
                </p>
              </div>
              <p className="text-gray-500 text-xs">ID: 820503</p>
            </div>
          </div>
          <button 
            onClick={handleCopyLink}
            className={`w-full ${copied ? 'bg-green-500' : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'} text-white font-bold py-3 rounded-2xl text-sm transition-all duration-200 flex items-center justify-center space-x-2`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

        {/* Referral Levels */}
        <div className="space-y-4">
          {levels.map((level, index) => (
            <div key={level.id} className="space-y-2">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{level.icon}</span>
                  <span className="font-semibold">{level.title}</span>
                </div>
                <button className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors duration-200">
                  <span className="text-sm">View more</span>
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              
              <div className={`bg-gradient-to-r ${level.color} rounded-3xl p-6 shadow-xl`}>
                <div className="grid grid-cols-2 gap-6 text-white text-center">
                  <div>
                    <div className="text-2xl font-bold mb-1">
                      {level.rebate}
                      {level.rebatePercent && (
                        <span className="text-sm ml-1">{level.rebatePercent}</span>
                      )}
                    </div>
                    <div className="text-sm opacity-90">Rebate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">{level.quantity}</div>
                    <div className="text-sm opacity-90">Quantity</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 text-white">
          <p className="text-sm leading-relaxed text-center">
            Copy your invitation link or code and share it with your friends and family, let them register and invest through your link.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionScreen;