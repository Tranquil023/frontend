import React from 'react';
import { X, Send } from 'lucide-react';
import Logo from './Logo';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <Logo className="w-12 h-12" />
          <div>
            <h3 className="font-bold text-gray-800">Latest notification</h3>
            <p className="text-gray-500 text-sm">Understand platform release information</p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-700 mb-6">
          <p>
            <span className="font-semibold">1.Platform launch time:</span>{' '}
            <span className="text-green-600 font-semibold">October 23 - 2025</span>
          </p>
          
          <p>
            <span className="font-semibold">2.Daily Gift Code:</span>{' '}
            <span className="text-green-600 font-semibold">₹8 to 30₹ ( Need Plan )</span>
          </p>
          <p>
            <span className="font-semibold">3.Level 3 agent commission cashback:</span>
          </p>
          <p>
            <span className="font-semibold">1st Level:</span>{' '}
            <span className="text-green-600 font-semibold">15% Happy Earning</span>
          </p>
          <p>
            <span className="font-semibold">4. Income:</span> Daily Income Daily Withdrawal
          </p>
          <p>
            <span className="font-semibold">5. Minimum Withdrawal is:</span>{' '}
            <span className="text-green-600 font-semibold">₹170 - ₹10000</span> .
          </p>
          <p>
            <span className="font-semibold">6.Get your referral to invest in welfare and get direct 15% of his investment.</span>
          </p>
          <p>
            <span className="font-semibold">7.Number of withdrawals:</span>{' '}
            <span className="text-green-600 font-semibold">Unlimited</span> .
          </p>
        </div>

        <button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-2xl transition-colors duration-200 flex items-center justify-center space-x-2" onClick={() => {
          window.open('https://t.me/invest_officially', '_blank');
        }}>
          <Send className="w-5 h-5" />
          <span>Telegram Channel</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;