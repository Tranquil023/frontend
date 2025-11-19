import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/payment';

const RechargeRecordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface RechargeRecord {
    id: number;
    amount: string;
    status: string;
    description: string;
    created_at: string;
    date: string;
    time: string;
  }

  const [rechargeRecords, setRechargeRecords] = useState<RechargeRecord[]>([]);

  useEffect(() => {
    const fetchRechargeRecords = async () => {
      try {
        setLoading(true);
        const response = await api.get('/users/recharge-records');

        console.log('API Response:', response.data);

        const records = response.data?.data || [];

        if (!Array.isArray(records)) {
          console.error('Records is not an array:', records);
          throw new Error('Invalid data format received from server');
        }

        const formattedRecords = records.map((record: any) => {
          const date = new Date(record.created_at);
          return {
            id: record.id,
            amount: `₹${record.amount}`,
            status: record.status || 'Pending',
            description: record.description || 'Wallet Recharge',
            created_at: record.created_at,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        });

        setRechargeRecords(formattedRecords);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch recharge records:', err);
        setError('Failed to load recharge records');
      } finally {
        setLoading(false);
      }
    };

    fetchRechargeRecords();
  }, []);

  return (
    <div className="min-h-screen bg-green-600">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-2xl font-bold text-white">Recharge Records</h1>
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
          <div className="space-y-4">
            {rechargeRecords.map((record) => (
              <div key={record.id} className="bg-white rounded-3xl p-6 shadow-xl">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <Coins className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{record.description}</h3>
                      <p className="text-sm text-gray-500">{record.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">{record.amount}</div>
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
        )}
      </div>
    </div>
  );
};

export default RechargeRecordScreen;
