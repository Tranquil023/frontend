import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import PromotionScreen from './components/PromotionScreen';
import ProductsScreen from './components/ProductsScreen';
import RechargeScreen from './components/RechargeScreen';
import WithdrawScreen from './components/WithdrawScreen';
import ContactScreen from './components/ContactScreen';
import CheckInScreen from './components/CheckInScreen';
import BankDetailsScreen from './components/BankDetailsScreen';
import InvestScreen from './components/InvestScreen';
import IncomeRecordScreen from './components/IncomeRecordScreen';
import WithdrawalRecordScreen from './components/WithdrawalRecordScreen';
import BottomNavigation from './components/BottomNavigation';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const { isAuthenticated, setAuthData } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('main');
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    dailyProfit: string;
    totalIncome: string;
    duration: string;
  } | undefined>(undefined);

  const handleAuthSuccess = (token: string, user: { id: string; full_name?: string; phone: string }) => {
    setAuthData(token, user);
  };

  const navigateToRecharge = () => setCurrentScreen('recharge');
  const navigateToWithdraw = () => setCurrentScreen('withdraw');
  const navigateToContact = () => setCurrentScreen('contact');
  const navigateToCheckIn = () => setCurrentScreen('checkin');
  const navigateToBankDetails = () => setCurrentScreen('bankdetails');
  const navigateToInvest = (plan: { name: string; price: string; dailyProfit: string; totalIncome: string; duration: string; } | undefined = undefined) => {
    setSelectedPlan(plan);
    setCurrentScreen('invest');
  };
  const navigateToIncomeRecord = () => setCurrentScreen('incomerecord');
  const navigateToWithdrawalRecord = () => setCurrentScreen('withdrawalrecord');
  const navigateBack = () => setCurrentScreen('main');

  if (!isAuthenticated) {
    if (isRegistering) {
      return (
        <RegisterScreen 
          onRegister={handleAuthSuccess}
          onSwitchToLogin={() => setIsRegistering(false)} 
        />
      );
    }
    return (
      <LoginScreen 
        onLogin={handleAuthSuccess}
        onRegister={() => setIsRegistering(true)}
      />
    );
  }

  // Handle special screens
  if (currentScreen === 'recharge') {
    return <RechargeScreen onBack={navigateBack} />;
  }
  
  if (currentScreen === 'withdraw') {
    return <WithdrawScreen onBack={navigateBack} onAddBank={navigateToBankDetails}/>;
  }
  
  if (currentScreen === 'contact') {
    return <ContactScreen onBack={navigateBack} />;
  }
  
  if (currentScreen === 'checkin') {
    return <CheckInScreen onBack={navigateBack} />;
  }
  
  if (currentScreen === 'bankdetails') {
    return <BankDetailsScreen onBack={navigateBack} />;
  }
  
  if (currentScreen === 'invest') {
    return <InvestScreen onBack={navigateBack} plan={selectedPlan} />;
  }
  
  if (currentScreen === 'incomerecord') {
    return <IncomeRecordScreen onBack={navigateBack} />;
  }
  
  if (currentScreen === 'withdrawalrecord') {
    return <WithdrawalRecordScreen onBack={navigateBack} />;
  }
  
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen 
          onNavigateToRecharge={navigateToRecharge}
          onNavigateToWithdraw={navigateToWithdraw}
          onNavigateToContact={navigateToContact}
          onNavigateToCheckIn={navigateToCheckIn}
          onNavigateToInvest={navigateToInvest}
        />;
      case 'products':
        return <ProductsScreen onNavigateToInvest={navigateToInvest} />;
      case 'promotion':
        return <PromotionScreen />;
      case 'mine':
        return <ProfileScreen 
          onNavigateToRecharge={navigateToRecharge} 
          onNavigateToBankDetails={navigateToBankDetails}
          onNavigateToIncomeRecord={navigateToIncomeRecord}
          onNavigateToWithdrawalRecord={navigateToWithdrawalRecord}
        />;
      default:
        return <HomeScreen 
          onNavigateToRecharge={navigateToRecharge}
          onNavigateToWithdraw={navigateToWithdraw}
          onNavigateToContact={navigateToContact}
          onNavigateToCheckIn={navigateToCheckIn}
          onNavigateToInvest={navigateToInvest}
        />;
    }
  };

  return (
    <div className="relative">
      <Toaster position="top-right" />
      {renderScreen()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;