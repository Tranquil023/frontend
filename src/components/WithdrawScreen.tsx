import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api } from '../services/payment';

interface WithdrawScreenProps {
  onBack: () => void;
  onAddBank: () => void; // callback to navigate to BankDetailsScreen
}

const WithdrawScreen: React.FC<WithdrawScreenProps> = ({ onBack, onAddBank }) => {
  const [amount, setAmount] = useState('');
  const [bankAccount, setBankAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        setLoading(true);
        const res = await api.get('/users/bank-details'); // API to get bank account
        if (res.data.exists) {
          setBankAccount(res.data.account);
        } else {
          setBankAccount(null);
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch bank details');
      } finally {
        setLoading(false);
      }
    };
    fetchBankDetails();
  }, []);

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Enter a valid amount');
      return;
    }

    try {
      const res = await api.post('/users/withdraw', { amount });
      toast.success('Withdrawal requested successfully!');
      setAmount('');
    } catch (err) {
      console.error(err);
      toast.error('Failed to request withdrawal');
    }
  };

  if (loading) return <div className="p-4 text-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white">Withdraw</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-4 space-y-6">
        {bankAccount ? (
          <>
            {/* Bank Details */}
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 text-center">
              <div className="flex justify-between mb-2">
                <span className="text-white text-lg">Bank Account</span>
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold">
                {bankAccount.account_name} - {bankAccount.account_number} ({bankAccount.bank_name})
              </div>
            </div>

            {/* Withdraw Form */}
            <div className="bg-white rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-purple-600 font-semibold">Enter Amount</h3>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
              <button
                onClick={handleWithdraw}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-2xl transition-colors duration-200"
              >
                Withdraw
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-3xl p-6 shadow-xl space-y-4">
            <p className="text-red-500 font-medium">You need to add bank details first</p>
            <button
              onClick={onAddBank} // navigate to BankDetailsScreen
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl transition-colors duration-200"
            >
              Add Bank Details
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-bold text-gray-800 mb-3">Instructions</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>1. The daily withdrawal time is from 07:00:00 to 18:00:00</p>
              <p>2. Single withdrawal amount between ₹170 and ₹100,000</p>
              <p>3. Withdrawal tax rate: 10%</p>
              <p>4. Bank details need to be added only once</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawScreen;
