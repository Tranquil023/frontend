import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Clock, Target, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { investMoney } from '../services/payment';
import { useNavigate, useLocation } from 'react-router-dom';

interface LocationState {
  plan?: {
    name: string;
    price: number;
    dailyIncome: number;
    totalIncome: number;
    duration: string; // e.g., "5 Days"
  };
}

const InvestScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan } = location.state as LocationState || {};
  const [invested, setInvested] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultPlan = {
    name: 'Premium Investment Plan',
    price: 5000,
    dailyIncome: 2999,
    totalIncome: 10000,
    duration: '2 Days'
  };

  const currentPlan = plan || defaultPlan;

  const formatCurrency = (value?: number) => {
    if (value == null) return '0';
    return `${value.toLocaleString()}`;
  };

  const handleInvest = async () => {
    if (!currentPlan) {
      toast.error('Plan data is missing.');
      return;
    }

    setLoading(true);
    try {
      // Ensure numeric values exist
      const name = currentPlan.name || 'Unnamed Plan';
      const price = currentPlan.price ?? 0;
      const dailyProfit = currentPlan.dailyIncome ?? 0;
      const totalIncome = currentPlan.totalIncome ?? 0;
      const days = currentPlan.duration ? currentPlan.duration.split(' ')[0] : '1';

      await investMoney(
        name,
        price.toString(),
        dailyProfit.toString(),
        totalIncome.toString(),
        days
      );

      setInvested(true);
      toast.success('Investment successful!');
    } catch (err: any) {
      console.error('Investment error:', err);
      alert(err.response?.data?.message || 'investment failed')
      toast.error(err.response?.data?.message || 'Investment failed');
    } finally {
      setLoading(false);
    }
  };

  if (invested) {
    return (
      <div className="min-h-screen bg-green-400 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 mx-4 text-center shadow-xl max-w-sm w-full">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Investment Successful!</h2>
          <p className="text-black mb-4">Your investment plan is now active</p>
          <div className="bg-green-50 rounded-2xl p-4 mb-4">
            <p className="text-green-700 font-semibold">{currentPlan.name}</p>
            <p className="text-green-600">Investment: {formatCurrency(currentPlan.price)}</p>
          </div>
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-2xl transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-400 to-blue-600 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-black">Invest Now</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-4 space-y-6 pb-6">
        {/* Plan Details */}
        <div className="bg-yellow-500 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8 text-black" />
            <h2 className="text-xl font-bold text-gray-800">{currentPlan.name}</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-yellow-400 rounded-2xl">
              <div className="text-2xl font-bold text-black">{formatCurrency(currentPlan.dailyIncome)}</div>
              <div className="text-sm text-black-500">Daily Profit</div>
            </div>
            <div className="text-center p-4 bg-yellow-400 rounded-2xl">
              <div className="text-2xl font-bold text-black">{formatCurrency(currentPlan.totalIncome)}</div>
              <div className="text-sm text-black">Total Income</div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-black">Duration: {currentPlan.duration}</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{formatCurrency(currentPlan.price)}</div>
          </div>
        </div>

        {/* Investment Summary */}
        <div className="bg-yellow-500 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Investment Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-black">Investment Amount</span>
              <span className="font-semibold">{formatCurrency(currentPlan.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Expected Daily Return</span>
              <span className="font-semibold text-green-600">{formatCurrency(currentPlan.dailyIncome)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Total Expected Return</span>
              <span className="font-semibold text-blue-600">{formatCurrency(currentPlan.totalIncome)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Plan Duration</span>
              <span className="font-semibold">{currentPlan.duration}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between text-lg font-bold">
              <span>Net Profit</span>
              <span className="text-black">
                {formatCurrency(currentPlan.totalIncome - currentPlan.price)}
              </span>
            </div>
          </div>
        </div>

        

        {/* Invest Button */}
        <div className="px-4">
          <button
            onClick={handleInvest}
            disabled={loading}
            className="w-full bg-green-800 text-white font-bold py-4 rounded-3xl transition-colors duration-200 shadow-lg flex items-center justify-center space-x-2"
          >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Target className="w-5 h-5" />
              <span>Confirm Investment</span>
            </>
          )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestScreen;
