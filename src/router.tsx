import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
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
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import Payment from './components/Payment';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorElement from './components/ErrorElement';
import NotFound from './components/NotFound';
import RechargeRecordScreen from './components/RechargeRecord';
import MyPlan from './components/MyPlans';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />,
      },
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: '/mine',
        element: (
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        ),
      },

      {
        path: '/promotion',
        element: (
          <ProtectedRoute>
            <PromotionScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/products',
        element: (
          <ProtectedRoute>
            <ProductsScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/recharge',
        element: (
          <ProtectedRoute>
            <RechargeScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/withdraw',
        element: (
          <ProtectedRoute>
            <WithdrawScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/contact',
        element: (
          <ProtectedRoute>
            <ContactScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/checkin',
        element: (
          <ProtectedRoute>
            <CheckInScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/bank-details',
        element: (
          <ProtectedRoute>
            <BankDetailsScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/invest',
        element: (
          <ProtectedRoute>
            <InvestScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/income-record',
        element: (
          <ProtectedRoute>
            <IncomeRecordScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/withdrawal-record',
        element: (
          <ProtectedRoute>
            <WithdrawalRecordScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/recharge-record',
        element: (
          <ProtectedRoute>
            <RechargeRecordScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/my-plans',
        element: (
          <ProtectedRoute>
            <MyPlan />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <LoginScreen />,
      },
      {
        path: '/register',
        element: <RegisterScreen />,
      },
      {
        path: '/register/:code',
        element: <RegisterScreen />,
      },
      {
        path: '/payment',
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);