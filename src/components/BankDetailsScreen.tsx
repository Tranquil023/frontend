import React, { useState } from 'react';
import { ArrowLeft, CreditCard, User, Building, Hash, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { addBankAccount } from '../services/payment';
import { useNavigate } from 'react-router-dom';

const BankDetailsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountHolderName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: ''
  });
  const [saved, setSaved] = useState(false);
  const [loading,setLoading]=useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.accountNumber !== formData.confirmAccountNumber) {
    alert('Account numbers do not match');
    return;
  }

  try {
    setLoading(true);
    const result = await addBankAccount(
      formData.accountHolderName,
      formData.accountNumber,
      formData.bankName,
      formData.ifscCode
    );
    console.log('Bank account added:', result);
    toast.success('Bank account added successfully!');
    setSaved(true);

    setTimeout(() => {
      navigate(-1); // navigate back after 2 seconds
    }, 2000);
  } catch (error) {
    console.error('Failed to add bank account:', error);
    toast.error('Failed to add bank account. Please try again.');
  } finally {
    setLoading(false);
  }
};


  if (saved) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-500 to-green-600 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 mx-4 text-center shadow-xl">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bank Details Saved!</h2>
          <p className="text-gray-600">Your bank details have been successfully added</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white">Add Bank Details</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-4 space-y-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Holder Name */}
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <User className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-800">Account Holder Name</h3>
            </div>
            <input
              type="text"
              value={formData.accountHolderName}
              onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
              placeholder="Enter full name as per bank account"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Account Number */}
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Hash className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-800">Account Number</h3>
            </div>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              placeholder="Enter account number"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none mb-3"
              required
            />
            <input
              type="text"
              value={formData.confirmAccountNumber}
              onChange={(e) => handleInputChange('confirmAccountNumber', e.target.value)}
              placeholder="Confirm account number"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* IFSC Code */}
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-800">IFSC Code</h3>
            </div>
            <input
              type="text"
              value={formData.ifscCode}
              onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())}
              placeholder="Enter IFSC code"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Building className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-800">Bank Information</h3>
            </div>
            <input
              type="text"
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              placeholder="Bank name"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none mb-3"
              required
            />
            <input
              type="text"
              value={formData.branchName}
              onChange={(e) => handleInputChange('branchName', e.target.value)}
              placeholder="Branch name"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-3xl transition-colors duration-200 shadow-lg"
          >
            Save Bank Details
          </button>
        </form>

        {/* Security Note */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-white">
          <div className="border-l-4 border-yellow-400 pl-4">
            <h3 className="font-bold mb-3">Security Information</h3>
            <div className="space-y-2 text-sm text-white/90">
              <p>• Your bank details are encrypted and secure</p>
              <p>• Details are required for withdrawal processing</p>
              <p>• You can update details anytime</p>
              <p>• Only you can access this information</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetailsScreen;