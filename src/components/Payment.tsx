import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, AlertTriangle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { initiatePayment, verifyPayment } from '../services/payment';

interface PaymentProps {
  amount: string;
  onBack: () => void;
  onPaymentComplete: () => void;
}

const Payment: React.FC<PaymentProps> = ({ amount, onBack, onPaymentComplete }) => {
  const [timer, setTimer] = useState(480); // 8 minutes in seconds
  const [activeTab, setActiveTab] = useState<'direct' | 'qr'>('direct');
  const [paymentMethod, setPaymentMethod] = useState<'paytm' | 'phonepe' | null>(null);
  const [utrNumber, setUtrNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const UPI_ID = 'prashantkashyap2707-1@okaxis';
  const qrValue = `upi://pay?pa=${UPI_ID}&pn=Merchant&am=${amount}&cu=INR`;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handlePaymentMethodSelect = async (method: 'paytm' | 'phonepe') => {
    try {
      setPaymentMethod(method);
      // Initiate payment with backend
      await initiatePayment(amount, method);
      
      // Open the appropriate payment app
      if (method === 'paytm') {
        window.location.href = `paytmmp://pay?pa=${UPI_ID}&pn=Merchant&am=${amount}&cu=INR`;
      } else if (method === 'phonepe') {
        window.location.href = `phonepe://pay?pa=${UPI_ID}&pn=Merchant&am=${amount}&cu=INR`;
      }
    } catch (err) {
      setError('Failed to initiate payment. Please try again.');
      setPaymentMethod(null);
    }
  };

  const handleSubmitUTR = async () => {
    if (!utrNumber.trim() || !paymentMethod) {
      setError('Please select a payment method and enter UTR number');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Verify payment with backend
      await verifyPayment(amount, utrNumber, paymentMethod);
      onPaymentComplete();
    } catch (err) {
      setError('Failed to verify payment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-purple-600">
        <button onClick={onBack} className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-medium text-white">Pay</h1>
        <div className="w-6"></div>
      </div>

      {/* Payment Amount */}
      <div className="bg-purple-600 p-6 text-center text-white">
        <div className="text-lg mb-2">Payment Amount</div>
        <div className="text-4xl font-semibold mb-4">₹{amount}</div>
        <div className="text-xl font-medium">{formatTime(timer)}</div>
      </div>

      {/* Payment Method Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-4 text-center ${
            activeTab === 'direct'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('direct')}
        >
          Direct Transfer
        </button>
        <button
          className={`flex-1 py-4 text-center ${
            activeTab === 'qr'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('qr')}
        >
          Scan QRCode
        </button>
      </div>

      {activeTab === 'direct' && (
        <div className="p-4">
          {/* Payment Method Selection */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <div className="text-lg font-medium mb-4">Select Payment Method</div>
            <div className="grid grid-cols-2 gap-4">
              <button
                className={`p-4 rounded-lg border-2 ${
                  paymentMethod === 'paytm'
                    ? 'border-purple-600'
                    : 'border-gray-200'
                }`}
                onClick={() => handlePaymentMethodSelect('paytm')}
              >
                <div className="h-8 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" alt="Paytm" className="h-6" />
                </div>
                <div className="text-sm mt-2">Paytm</div>
              </button>
              <button
                className={`p-4 rounded-lg border-2 ${
                  paymentMethod === 'phonepe'
                    ? 'border-purple-600'
                    : 'border-gray-200'
                }`}
                onClick={() => handlePaymentMethodSelect('phonepe')}
              >
                <div className="h-8 flex items-center justify-center">
                  <img src="https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png" alt="PhonePe" className="h-16" />
                </div>
                <div className="text-sm mt-2">Phonepe</div>
              </button>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-purple-50 p-4 rounded-lg mb-6 flex items-center">
            <AlertTriangle className="text-purple-600 w-6 h-6 mr-2" />
            <div className="text-sm">
              Payment can only be made once. Multiple payments are not valid!!!
            </div>
          </div>

          {/* Transfer Instructions */}
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-lg font-medium mb-4">
              1. Transfer {amount} RS to the following upi
            </div>
            <div className="bg-white p-4 rounded-lg mb-3 flex justify-between items-center">
              <div>{UPI_ID}</div>
              <button 
                onClick={() => copyToClipboard(UPI_ID)}
                className="hover:bg-purple-50 p-2 rounded-full transition-colors"
              >
                <Copy className="w-5 h-5 text-purple-600" />
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg mb-6 flex justify-between items-center">
              <div>{amount} RS</div>
              <button 
                onClick={() => copyToClipboard(amount)}
                className="hover:bg-purple-50 p-2 rounded-full transition-colors"
              >
                <Copy className="w-5 h-5 text-purple-600" />
              </button>
            </div>

            <div className="text-lg font-medium mb-4">
              2. Submit Ref No/Reference No/UTR
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                placeholder="UTR(UPI Ref.ID)"
                className="w-full border rounded-lg p-3"
              />
              {error && (
                <div className="text-red-500 text-sm flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {error}
                </div>
              )}
              <button
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 transition-opacity"
                disabled={!utrNumber.trim() || !paymentMethod || submitting}
                onClick={handleSubmitUTR}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'qr' && (
        <div className="p-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="w-64 h-64 mx-auto rounded-lg mb-4 flex items-center justify-center">
              <QRCodeSVG
                value={qrValue}
                size={240}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="text-sm text-gray-600">
              Scan the QR code to make payment via any UPI app
            </div>
          </div>
        </div>
      )}

      {/* Bottom Logos */}
      <div className="flex justify-center space-x-4 mt-8 mb-4">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1280px-UPI-Logo-vector.svg.png" 
          alt="UPI" 
          className="h-8 opacity-60" 
        />
      </div>
    </div>
  );
};

export default Payment;