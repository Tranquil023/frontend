import React, { useState } from 'react';
import { ArrowLeft, Gift, Calendar, Coins, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckInScreen: React.FC = () => {
  const navigate = useNavigate();
  const [checkedIn, setCheckedIn] = useState(false);
  const [reward, setReward] = useState(0);

  const handleCheckIn = () => {
    const randomReward = Math.floor(Math.random() * 293) + 8; // Random between 8-300
    setReward(randomReward);
    setCheckedIn(true);
  };

  const checkInDays = [
    { day: 1, reward: '₹8-50', completed: true },
    { day: 2, reward: '₹15-75', completed: true },
    { day: 3, reward: '₹25-100', completed: false, today: true },
    { day: 4, reward: '₹35-150', completed: false },
    { day: 5, reward: '₹50-200', completed: false },
    { day: 6, reward: '₹75-250', completed: false },
    { day: 7, reward: '₹100-300', completed: false },
  ];

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
        <h1 className="text-2xl font-bold text-white">Daily Check-In</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-4 space-y-6">
        {/* Check-In Status */}
        <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            {checkedIn ? (
              <CheckCircle className="w-10 h-10 text-white" />
            ) : (
              <Gift className="w-10 h-10 text-white" />
            )}
          </div>
          
          {checkedIn ? (
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Check-In Successful!</h2>
              <p className="text-gray-600 mb-4">You received ₹{reward} today</p>
              <div className="bg-green-50 rounded-2xl p-4">
                <p className="text-green-700 font-semibold">Reward Added to Your Balance</p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Daily Reward</h2>
              <p className="text-gray-600 mb-4">Check in daily to earn rewards</p>
              <button
                onClick={handleCheckIn}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200"
              >
                Check In Now
              </button>
            </div>
          )}
        </div>

        {/* Weekly Progress */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800">Weekly Progress</h3>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {checkInDays.map((day) => (
              <div
                key={day.day}
                className={`text-center p-3 rounded-2xl ${
                  day.completed
                    ? 'bg-green-100 border-2 border-green-500'
                    : day.today
                    ? 'bg-yellow-100 border-2 border-yellow-500'
                    : 'bg-gray-100 border-2 border-gray-300'
                }`}
              >
                <div className={`text-lg font-bold ${
                  day.completed ? 'text-green-600' : day.today ? 'text-yellow-600' : 'text-gray-500'
                }`}>
                  {day.day}
                </div>
                <div className={`text-xs ${
                  day.completed ? 'text-green-500' : day.today ? 'text-yellow-500' : 'text-gray-400'
                }`}>
                  {day.reward}
                </div>
                {day.completed && (
                  <CheckCircle className="w-4 h-4 text-green-500 mx-auto mt-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bonus Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-3">
            <Coins className="w-5 h-5 text-yellow-400" />
            <h3 className="font-bold">Bonus Information</h3>
          </div>
          <ul className="text-sm space-y-2 text-white/90">
            <li>• Daily check-in rewards: ₹8 to ₹300</li>
            <li>• Complete 7 days for bonus rewards</li>
            <li>• No investment plan required</li>
            <li>• Rewards added instantly to balance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckInScreen;