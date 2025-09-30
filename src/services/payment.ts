import axios from 'axios';

// Replace with your actual backend API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with base URL
export const api = axios.create({
  baseURL: API_URL
});

// Add request interceptor to automatically add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface UserData {
  id: string;
  full_name: string;
  phone: string;
  balance: number;
  totalWithdrawal: number;
  totalInvested: number;
  totalEarnings: number;
  referral_code: string;
  createdAt: string;
  updatedAt: string;
}

export interface Balance {
  currentBalance: number;
  lastUpdate: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed';
  utrNumber?: string;
  paymentMethod?: string;
  timestamp: string;
}

export const getUserData = async (): Promise<UserData> => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export const getIncomeRecords = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching income records:', error);
    throw error;
  }
};

export const initiatePayment = async (amount: string, paymentMethod: string) => {
  try {
    const response = await api.post('/payments/initiate', {
      amount,
      paymentMethod,
    });
    return response.data;
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;
  }
};

export const verifyPayment = async (amount: string, utrNumber: string, paymentMethod: string) => {
  try {
    const response = await api.post('/payments/verify', {
      amount,
      utrNumber,
      paymentMethod,
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

export const investMoney= async (product:string,amount:string,dailyIncome:string,totalIncome:string,days:string)=>{
  try {
    const response =await api.post('/users/invest-money',{
      amount,
      product,
      dailyIncome,
      totalIncome,
      days
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const addBankAccount = async (
  account_name: string,
  account_no: string,
  bank_name: string,
  ifsc_code: string
) => {
  try {
    const response = await api.post('/users/add-bank', {
      account_name,
      account_no,
      bank_name,
      ifsc_code
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};