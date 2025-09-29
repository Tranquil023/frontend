import React from 'react';
import { ArrowLeft, TrendingUp, Calendar, Coins } from 'lucide-react';

interface IncomeRecordScreenProps {
  onBack: () => void;
}

const IncomeRecordScreen: React.FC<IncomeRecordScreenProps> = ({ onBack }) => {
  const incomeRecords = [
    // {
    //   id: 1,
    //   type: 'Investment Return',
    //   amount: '₹2999',
    //   date: '2025-01-15',
    //   time: '09:30 AM',
    //   status: 'Completed',
    //   plan: 'Limited Offer Plan'
    // },
    // {
    //   id: 2,
    //   type: 'Daily Check-in',
    //   amount: '₹150',
    //   date: '2025-01-15',
    //   time: '08:15 AM',
    //   status: 'Completed',
    //   plan: 'Daily Reward'
    // },
    // {
    //   id: 3,
    //   type: 'Referral Bonus',
    //   amount: '₹116',
    //   date: '2025-01-14',
    //   time: '06:45 PM',
    //   status: 'Completed',
    //   plan: '15% Commission'
    // },
    // {
    //   id: 4,
    //   type: 'Investment Return',
    //   amount: '₹2999',
    //   date: '2025-01-14',
    //   time: '09:30 AM',
    //   status: 'Completed',
    //   plan: 'Limited Offer Plan'
    // }
  ];

  const totalIncome=0
  // const totalIncome = incomeRecords?.reduce((sum, record) => 
  //   sum + parseInt(record.amount.replace('₹', '')), 0
  // );

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-600">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white">Income Record</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-4 space-y-6">
        {/* Total Income */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <Coins className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">₹{totalIncome}</div>
              <div className="text-gray-500">Total Income</div>
            </div>
          </div>
        </div>

        {/* Income Records */}
        <div className="space-y-4">
          {incomeRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{record.type}</h3>
                    <p className="text-sm text-gray-500">{record.plan}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">{record.amount}</div>
                  <div className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full">
                    {record.status}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{record.date}</span>
                </div>
                <span>{record.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-white">
          <h3 className="font-bold mb-4">This Month Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">₹{totalIncome}</div>
              <div className="text-sm opacity-90">Total Earned</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{incomeRecords.length}</div>
              <div className="text-sm opacity-90">Transactions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeRecordScreen;