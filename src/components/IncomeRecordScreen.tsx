import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, Calendar, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/payment';

const IncomeRecordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface IncomeRecord {
    id: number;
    type: string;
    amount: string;
    date: string;
    time: string;
    status: string;
    plan: string;
    created_at: string;
  }

  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>([]);

  useEffect(() => {
    const fetchIncomeRecords = async () => {
      try {
        setLoading(true);
        const response = await api.get('/users/income-Records');
        
        // Transform the data to match our interface
        const formattedRecords = response.data.map((record: any) => {
          const date = new Date(record.created_at);
          return {
            id: record.id,
            type: record.type || 'Income',
            amount: `₹${record.amount}`,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: record.status || 'Completed',
            plan: record.plan || 'Investment Plan',
            created_at: record.created_at
          };
        });

        setIncomeRecords(formattedRecords);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch income records:', err);
        setError('Failed to load income records');
      } finally {
        setLoading(false);
      }
    };

    fetchIncomeRecords();
  }, []);

  const totalIncome = incomeRecords
    .filter((record: IncomeRecord) => record.status === 'Completed')
    .reduce((sum: number, record: IncomeRecord) => 
      sum + parseInt(record.amount.replace('₹', '')), 0
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-600">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white">Income Record</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-4 space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
            {error}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default IncomeRecordScreen;