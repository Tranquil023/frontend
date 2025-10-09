import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowDownToLine, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/payment';

const WithdrawalRecordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface WithdrawalRecord {
    id: number;
    amount: string;
    date: string;
    time: string;
    status: string;
    transaction_id: string;
    account_number: string;
    created_at: string;
  }

  const [withdrawalRecords, setWithdrawalRecords] = useState<WithdrawalRecord[]>([]);

  useEffect(() => {
    const fetchWithdrawalRecords = async () => {
      try {
        setLoading(true);
        const response = await api.get('/users/withdraw-Records');

        console.log(response);        
        // Transform the data to match our interface
        const formattedRecords = response.data.map((record: any) => {
          const date = new Date(record.created_at);
          return {
            id: record.id,
            amount: `₹${record.amount}`,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: record.status,
            transaction_id: record.transaction_id || 'Pending',
            account_number: `****${record.account_number.slice(-4)}`,
            created_at: record.created_at
          };
        });

        console.log(formattedRecords);
        setWithdrawalRecords(formattedRecords);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch withdrawal records:', err);
        setError('Failed to load withdrawal records');
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawalRecords();
  }, []);

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
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white">Withdrawal Record</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-4 space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
            {error}
          </div>
        ) : (
          <>
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
                        <p className="text-sm text-gray-500">To: {record.account_number}</p>
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
                      Transaction ID: {record.transaction_id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* </div> */}
            {/* </div> */}
          </>
        )}

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
        
      </div>
    </div>
  );
};

export default WithdrawalRecordScreen;