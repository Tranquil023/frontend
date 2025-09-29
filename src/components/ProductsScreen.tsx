import React, { useState, useEffect } from 'react';
import { getUserData } from '../services/payment';
import type { UserData } from '../services/payment';
import { toast } from 'react-hot-toast';
import { Target, TrendingUp } from 'lucide-react';
import Logo from './Logo';

interface ProductsScreenProps {
  onNavigateToInvest: (plan: {
    name: string;
    price: number;
    dailyIncome: number;
    totalIncome: number;
    duration: string;
  }) => void;
}

interface Product {
  id: number;
  name: string;
  price: number;
  dailyIncome: number;
  totalIncome: number;
  duration: string; // e.g., "5 Days"
  image: string;
}

const ProductsScreen: React.FC<ProductsScreenProps> = ({ onNavigateToInvest }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'daily' | 'special'>('daily');

  // Fetch user data once
  useEffect(() => {
    const fetchUserData = async () => {
      const cached = localStorage.getItem('userData');
      if (cached) {
        setUserData(JSON.parse(cached));
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getUserData();
        setUserData(data);
        localStorage.setItem('userData', JSON.stringify(data));
        setError(null);
      } catch {
        setError('Failed to load balance');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Products
  const products: Product[] = [
    // Daily Plans (duration > 15 days)
    { id: 1, name: 'Wiprox Daily A', price: 500, dailyIncome: 150, totalIncome: 2400, duration: '16 Days', image: '/invest.png' },
    { id: 2, name: 'Wiprox Daily B', price: 1000, dailyIncome: 250, totalIncome: 5000, duration: '20 Days', image: '/wiprox-daily-b.png' },
    { id: 3, name: 'Wiprox Daily C', price: 2000, dailyIncome: 800, totalIncome: 20000, duration: '25 Days', image: '/wiprox-daily-c.png' },
    { id: 4, name: 'Wiprox Daily D', price: 3000, dailyIncome: 1200, totalIncome: 36000, duration: '30 Days', image: '/wiprox-daily-d.png' },

    // Special Plans (duration <= 15 days)
    { id: 5, name: 'Wiprox Special A', price: 950, dailyIncome: 750, totalIncome: 1500, duration: '2 Days', image: '/wiprox-special-a.png' },
    { id: 6, name: 'Wiprox Special B', price: 2500, dailyIncome: 2000, totalIncome: 6000, duration: '3 Days', image: '/wiprox-special-b.png' },
  ];

  // Filter products based on tab
  const filteredProducts = products.filter((product) => {
    const days = parseInt(product.duration.split(' ')[0], 10);
    return activeTab === 'daily' ? days > 15 : days <= 15;
  });

  const handleInvest = (product: Product) => {
    

    // Pass product details to parent
    onNavigateToInvest({
      name: product.name,
      price: product.price,
      dailyIncome: product.dailyIncome,
      totalIncome: product.totalIncome,
      duration: product.duration,
    });
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-[#956630] rounded-b-[40px] p-6 pb-12">
        <h1 className="text-3xl font-bold text-white text-center mb-4">Products List</h1>
      </div>

      <div className="px-4 -mt-8 space-y-6">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 flex gap-2">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex-1 py-2 px-4 ${
              activeTab === 'daily' ? 'bg-[#956630] text-white' : 'text-gray-500'
            } rounded-xl font-semibold`}
          >
            Daily Plan
          </button>
          <button
            onClick={() => setActiveTab('special')}
            className={`flex-1 py-2 px-4 ${
              activeTab === 'special' ? 'bg-[#956630] text-white' : 'text-gray-500'
            } font-semibold`}
          >
            Special Plan
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {/* Loading */}
        {isLoading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : (
          <div className="space-y-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl p-6 shadow-lg">
                {/* Header */}
                <div className="mb-6 flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#956630] mb-2">{product.name}</h3>
                    <div className="text-gray-600">
                      <div className="mb-1">Product Price:</div>
                      <div className="text-2xl font-bold text-[#956630]">Rs {product.price}</div>
                    </div>
                  </div>
                  {/* <img src={product.image} alt={product.name} className="w-24 h-24 object-contain" /> */}
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  <div>
                    <div className="text-gray-600 mb-1">Daily Income</div>
                    <div className="text-lg font-bold">Rs {product.dailyIncome}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Total Income</div>
                    <div className="text-lg font-bold">Rs {product.totalIncome}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Total Days</div>
                    <div className="text-lg font-bold">{product.duration}</div>
                  </div>
                </div>

                {/* Invest */}
                <button
                  onClick={() => handleInvest(product)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg flex items-center justify-center space-x-2 transition-colors duration-200"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Invest Now</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Investment Tips */}
        {/* <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-5 h-5 text-yellow-400" />
            <h3 className="font-bold">Investment Tips</h3>
          </div>
          <ul className="text-sm space-y-2 text-white/90">
            <li>• Start with smaller amounts to understand the platform</li>
            <li>• Diversify your investments across different plans</li>
            <li>• Reinvest your profits for compound growth</li>
            <li>• Monitor your portfolio regularly</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default ProductsScreen;
