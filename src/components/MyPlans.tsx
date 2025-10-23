import React, { useState, useEffect } from 'react';
import { Package, DollarSign, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { api } from '../services/payment';

interface Plan {
  id: number;
  product: string;
  amount: number;
  daily_income: number;
  total_income: number;
  start_date: string;
  end_date: string;
}

export default function MyPlan() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyPlans();
  }, []);

  const fetchMyPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const {data} = await api.get('/users/myPlans');
      console.log('Fetched Plans:', data);
      
      // Handle different response formats
      if (Array.isArray(data?.data)) {
        setPlans(data.data);
      } else if (data && Array.isArray(data.plans)) {
        setPlans(data.plans);
      } else if (data && Array.isArray(data.data)) {
        setPlans(data.data);
      } else {
        setPlans([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Plans</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchMyPlans}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Plans</h1>
          <p className="text-gray-600">View your purchased products</p>
        </div>

        {plans.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No plans found</h3>
            <p className="text-gray-500">You haven't purchased any plans yet</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2"></div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <Package className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-800">{plan.product}</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-600">Amount</span>
                      </div>
                      <span className="text-lg font-bold text-gray-800">
                        ₹{plan.amount.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-600">Daily Income</span>
                      </div>
                      <span className="text-lg font-bold text-gray-800">
                        ₹{plan.daily_income.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-gray-600">Total Income</span>
                      </div>
                      <span className="text-lg font-bold text-gray-800">
                        ₹{plan.total_income.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                        <span className="text-sm font-medium text-gray-600">Start Date</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">
                        {new Date(plan.start_date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-red-600" />
                        <span className="text-sm font-medium text-gray-600">End Date</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">
                        {new Date(plan.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}