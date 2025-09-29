import React, { useState, useEffect } from 'react';
import { ArrowLeft, Lock, Coins, Wallet, TrendingUp } from 'lucide-react';
import Payment from './Payment';
import { getUserData } from '../services/payment';
import type { UserData, Transaction } from '../services/payment';

interface RechargeScreenProps {
  onBack: () => void;
}

const RechargeScreen: React.FC<RechargeScreenProps> = ({ onBack }) => {
  const [amount, setAmount] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const quickAmounts = [285, 550, 775, 1255, 1999, 2500, 3600, 4900, 7499];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const user = await getUserData();
        const data=user.data;
        setUserData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load user data');
        // console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return showPayment ? (
    <Payment 
      amount={amount}
      onBack={() => setShowPayment(false)}
      onPaymentComplete={() => {
        setShowPayment(false);
        setAmount('');
        // You can add any success notification here
      }}
    />
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-yellow-600 via-blue-500 to-blue-600">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white">Recharge</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-4 space-y-6">
        {/* Current Balance */}
        <div className="bg-white rounded-3xl p-6 shadow-xl relative">
          {loading ? (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-3xl">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-2">{error}</div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800">₹{userData?.balance}</div>
                  <div className="text-gray-500">Current Balance</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600 text-sm">Total Invested</span>
                  </div>
                  <div className="text-xl font-semibold mt-1">₹{userData?.totalInvested}</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600 text-sm">Total Earnings</span>
                  </div>
                  <div className="text-xl font-semibold mt-1">₹{userData?.totalEarnings}</div>
                </div>
              </div>

              {userData?.recentTransactions && userData.recentTransactions.length > 0 && (
                <div className="text-xs text-gray-500 mt-2">
                  Recent: {userData.recentTransactions.slice(0, 3).map(t => 
                    `${t.type === 'credit' ? '+' : '-'}₹${t.amount}`
                  ).join(', ')}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enter Amount */}
        <div>
          <h3 className="text-white font-semibold mb-3">Enter Amount</h3>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Recharge Amount"
            className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl px-4 py-4 text-white placeholder-white/70 focus:border-white focus:outline-none"
          />
        </div>

        {/* Quick Amount */}
        <div>
          <h3 className="text-black font-semibold mb-3">Quick Amount</h3>
          <div className="grid grid-cols-3 gap-3">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-2xl transition-colors duration-200 shadow-md"
              >
                ₹{quickAmount}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <button 
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-2xl transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg"
          onClick={() => amount && setShowPayment(true)}
          disabled={!amount}
        >
          <Lock className="w-5 h-5" />
          <span>Secure Payment via PAY-A</span>
        </button>

        {/* Recharge Button */}
        <button 
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-2xl transition-colors duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => amount && setShowPayment(true)}
          disabled={!amount}
        >
          Recharge Now
        </button>
      </div>
    </div>
  );
};

export default RechargeScreen;