import React from 'react';
import { ArrowLeft, ArrowDownToLine, Calendar, Clock } from 'lucide-react';

interface WithdrawalRecordScreenProps {
  onBack: () => void;
}

const WithdrawalRecordScreen: React.FC<WithdrawalRecordScreenProps> = ({ onBack }) => {
  interface WithdrawalRecord {
    id: number;
    amount: string;
    date: string;
    time: string;
    status: string;
    transactionId: string;
    bankAccount: string;
  }

  const withdrawalRecords: WithdrawalRecord[] = [
    // {
    //   id: 1,
    //   amount: '₹5000',
    //   date: '2025-01-14',
    //   time: '02:30 PM',
    //   status: 'Completed',
    //   transactionId: 'WD001234567',
    //   bankAccount: '****1234'
    // },
    // {
    //   id: 2,
    //   amount: '₹3000',
    //   date: '2025-01-12',
    //   time: '11:15 AM',
    //   status: 'Completed',
    //   transactionId: 'WD001234566',
    //   bankAccount: '****1234'
    // },
    // {
    //   id: 3,
    //   amount: '₹2500',
    //   date: '2025-01-10',
    //   time: '04:45 PM',
    //   status: 'Processing',
    //   transactionId: 'WD001234565',
    //   bankAccount: '****1234'
    // },
    // {
    //   id: 4,
    //   amount: '₹1800',
    //   date: '2025-01-08',
    //   time: '10:20 AM',
    //   status: 'Completed',
    //   transactionId: 'WD001234564',
    //   bankAccount: '****1234'
    // }
  ];

  const totalWithdrawn = withdrawalRecords
    .filter(record => record.status === 'Completed')
    .reduce((sum, record) => sum + parseInt(record.amount.replace('₹', '')), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-50';
      case 'Processing':
        return 'text-yellow-600 bg-yellow-50';
      case 'Failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white">Withdrawal Record</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-4 space-y-6">
        {/* Total Withdrawn */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <ArrowDownToLine className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">₹{totalWithdrawn}</div>
              <div className="text-gray-500">Total Withdrawn</div>
            </div>
          </div>
        </div>

        {/* Withdrawal Records */}
        <div className="space-y-4">
          {withdrawalRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <ArrowDownToLine className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Withdrawal</h3>
                    <p className="text-sm text-gray-500">To: {record.bankAccount}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">{record.amount}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(record.status)}`}>
                    {record.status}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{record.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{record.time}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  Transaction ID: {record.transactionId}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-white">
          <h3 className="font-bold mb-4">Withdrawal Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">₹{totalWithdrawn}</div>
              <div className="text-sm opacity-90">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{withdrawalRecords.length}</div>
              <div className="text-sm opacity-90">Total Requests</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-gray-800 mb-3">Withdrawal Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Withdrawals are processed within 24 hours</p>
              <p>• Minimum withdrawal amount: ₹170</p>
              <p>• Maximum withdrawal amount: ₹100,000</p>
              <p>• Withdrawal tax rate: 10%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalRecordScreen;