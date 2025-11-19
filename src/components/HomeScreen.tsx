import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Bell, Settings, MessageCircle, CreditCard, ArrowDownToLine, TrendingUp } from 'lucide-react';
import Logo from './Logo'; // Assuming Logo component is defined elsewhere
import NotificationModal from './NotificationModal'; // Assuming NotificationModal component is defined elsewhere

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    
    // --- AUTHENTICATION TOKEN CHECK UPDATED HERE ---
    
    useEffect(() => {
        const checkAuthToken = () => {
            // Check for the presence of an 'authToken' in localStorage
            const token = localStorage.getItem('token');

            if (!token) {
                // If the token is NOT available (null or undefined), redirect to the login page
                // Assuming your login route is '/login'
                navigate('/login');
            }
        };

        checkAuthToken();

        // Existing Notification logic
        if (!sessionStorage.getItem('notificationShown')) {
            setShowNotification(true);
            // sessionStorage.setItem('notificationShown', 'true');
        }
    }, [navigate]); // navigate is a dependency of useEffect
    // ------------------------------------

    const actionButtons = [
        { icon: Settings, label: 'CheckIn', color: 'bg-black', onClick: () => navigate('/') },
        { icon: MessageCircle, label: 'contact', color: 'bg-black', onClick: () => navigate('/contact') },
        { icon: CreditCard, label: 'Recharge', color: 'bg-black', onClick: () => navigate('/recharge') },
        { icon: ArrowDownToLine, label: 'withdraw', color: 'bg-black', onClick: () => navigate('/withdraw') },
    ];

    const specialPlan = { name: 'Limited Offer', price: '₹775', dailyProfit: '₹2999', totalIncome: '₹14995', duration: '2 Days' };

    return (
        <>
            <div className="max-h-screen bg-green-600 pb-20"> 
                {/* Header */}
                <div className="flex items-center justify-between p-4 pt-8">
                    <Logo className="w-8 h-8 text-white bg-blue-700 rounded-full p-1" /> 
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                            <Globe className="w-5 h-5 text-gray-700" />
                        </div>
                        <button onClick={() => setShowNotification(true)} className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center shadow-md">
                            <Bell className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="px-6 space-y-6 mt-6">

                    {/* Action Buttons Container */}
                    <div className="grid grid-cols-4 gap-4">
                        {actionButtons.map((button, index) => {
                            const Icon = button.icon;
                            return (
                                <div key={index} className="text-center">
                                    <button 
                                        onClick={button.onClick}
                                        className={`w-14 h-14 ${button.color} rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer`}
                                    >
                                        <Icon className="w-7 h-7 text-white" />
                                    </button>
                                    <span className="text-gray-800 text-sm font-medium">{button.label}</span> 
                                </div>
                            );
                        })}
                    </div>

                    {/* Special Plan Card */}
                    <div className="bg-yellow-500 rounded-xl p-4 shadow-2xl mt-8"> 
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                {/* <TrendingUp className="w-5 h-5 text-white" /> */}
                                <h2 className="text-md font-bold text-gray-800">Special Plan</h2>
                            </div>
                            <div className="bg-gray-700 text-white px-3 py-0.5 rounded-full text-xs font-medium"> Days:2 </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg">
                                <div className="text-red-700 text-3xl font-bold">₹</div> 
                            </div>

                            <div className="flex-1 grid grid-cols-3 gap-2 items-center">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-gray-800">{specialPlan.dailyProfit}</div>
                                    <div className="text-gray-500 text-xs">Daily Profit</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-gray-800">{specialPlan.totalIncome}</div>
                                    <div className="text-gray-500 text-xs">Total Income</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-gray-800">{specialPlan.totalIncome}</div>
                                    <div className="text-gray-500 text-xs">Total Income</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                            <div className="text-lg font-bold text-gray-800">Price: {specialPlan.price}</div>
                            <button 
                                onClick={() => navigate('/invest', { state: { plan: specialPlan } })}
                                className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200 shadow-md text-sm"
                            >
                                Invest
                            </button>
                        </div>
                    </div> 

                    {/* Notification/Withdrawal Success Section */}
                    <div className="bg-yellow-500 rounded-xl p-3 flex items-center space-x-3 shadow-md">
                        <Logo className="w-8 h-8 text-white bg-blue-700 rounded-full p-1 flex-shrink-0" />
                        <div className="flex-1">
                            <span className="font-semibold text-black text-sm">User 9586 ****50</span>
                            <span className="text-xs text-black"> just received</span>
                            <p className="text-blacks text-sm">Withdraw 7423 successfully</p>
                        </div>
                    </div> 
                    <div className="bg-yellow-500 rounded-xl p-3 flex items-center space-x-3 shadow-md">
                        <Logo className="w-8 h-8 text-white bg-blue-700 rounded-full p-1 flex-shrink-0" />
                        <div className="flex-1">
                            <span className="font-semibold text-black text-sm">User 6976 ****50</span>
                            <span className="text-xs text-black"> just received</span>
                            <p className="text-blacks text-sm">Withdraw 803 successfully</p>
                        </div>
                    </div> 
                    <div className="bg-yellow-500 rounded-xl p-3 flex items-center space-x-3 shadow-md">
                        <Logo className="w-8 h-8 text-white bg-blue-700 rounded-full p-1 flex-shrink-0" />
                        <div className="flex-1">
                            <span className="font-semibold text-black text-sm">User 8658 ****50</span>
                            <span className="text-xs text-black"> just received</span>
                            <p className="text-blacks text-sm">Withdraw 5693 successfully</p>
                        </div>
                    </div> 
                    

                </div>
            </div>
            
            <NotificationModal isOpen={showNotification} onClose={() => setShowNotification(false)} />
        </>
    );
};

export default HomeScreen;