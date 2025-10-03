import React, { useEffect, useState } from 'react';
import { Copy, Eye, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getUserData, UserData } from '../services/payment';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PromotionScreen: React.FC = () => {
  const { user } = useAuth();
  const [copied, setCopied] = React.useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [levels, setLevels] = React.useState([
    { id: 1, title: 'First Level', icon: '🥇', rebate: '₹0.00', rebatePercent: '(15%)', quantity: 0, color: 'from-yellow-600 to-orange-600' },
    { id: 2, title: 'Second Level', icon: '🥈', rebate: '0%', rebatePercent: '', quantity: 0, color: 'from-yellow-700 to-orange-700' },
    { id: 3, title: 'Third Level', icon: '🥉', rebate: '0%', rebatePercent: '', quantity: 0, color: 'from-yellow-800 to-orange-800' },
  ]);
  const [totalPeople, setTotalPeople] = React.useState(0);
  const [teamRecharge, setTeamRecharge] = React.useState(0);
  const [invitationLink, setInvitationLink] = React.useState('');


  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const {data} = await getUserData();
          console.log("user: ",data)
          setUserData(data);
          if (data?.referral_code) {
            const baseUrl = 'https://invest-more-money.vercel.app/';
            setInvitationLink(`${baseUrl}/register/refcode=${data.referral_code}`);
          }
        } catch (err) {
          console.error('Error:', err);
        }
      };
  
      fetchUserData();
    }, []);

  React.useEffect(() => {
    const fetchReferralData = async () => {
      if (!user?.id) {
        setLevels(prev => prev.map(level => ({ ...level, quantity: 0, rebate: '₹0.00' })));
        setTotalPeople(0);
        setTeamRecharge(0);
        return;
      }

      try {
        // Fetch referrals up to level 3
        const { data: referrals } = await supabase
          .from('referrals')
          .select('level, referred_id')
          .eq('referrer_id', user.id);

        const levelCounts = [0, 0, 0];
        referrals?.forEach(r => {
          if (r.level >= 1 && r.level <= 3) levelCounts[r.level - 1]++;
        });

        setLevels(prev => prev.map((lvl, idx) => ({
          ...lvl,
          quantity: levelCounts[idx],
          rebate: `₹${levelCounts[idx] * (idx === 0 ? 10 : idx === 1 ? 5 : 2)}`,
        })));

        setTotalPeople(referrals?.length || 0);

        // Optional: team recharge from transactions table
        const referredIds = referrals?.map(r => r.referred_id) || [];
        const { data: rechargeData } = await supabase
          .from('transactions')
          .select('amount')
          .in('user_id', referredIds)
          .eq('type', 'recharge');

        const teamTotal = rechargeData?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;
        setTeamRecharge(teamTotal);
      } catch (err) {
        console.error('Failed to fetch referral data:', err);
      }
    };

    fetchReferralData();
  }, [user]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = invitationLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-600 pb-24">
      <div className="text-center p-4 pt-8 mb-6">
        <h1 className="text-2xl font-bold text-white">Promotion</h1>
      </div>

      <div className="px-4 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{totalPeople}</div>
              <div className="text-gray-600">Total People</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">₹{teamRecharge}</div>
              <div className="text-gray-600">Team Recharge</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-3xl p-4 shadow-xl">
          <div className="flex items-start space-x-3 mb-4">
            <div className="text-2xl mt-1">🎁</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-800 mb-2">Invitation Link</h3>
              <div className="bg-white rounded-2xl p-3 mb-3">
                <p className="text-gray-700 text-sm break-all leading-relaxed">{invitationLink}</p>
              </div>
              <p className="text-gray-500 text-xs">ID: {userData?.referral_code || 'N/A'}</p>
            </div>
          </div>
          <button
            onClick={handleCopyLink}
            className={`w-full ${copied ? 'bg-green-500' : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'} text-white font-bold py-3 rounded-2xl text-sm transition-all duration-200 flex items-center justify-center space-x-2`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-4">
          {levels.map(level => (
            <div key={level.id} className="space-y-2">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{level.icon}</span>
                  <span className="font-semibold">{level.title}</span>
                </div>
                <button className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors duration-200">
                  <span className="text-sm">View more</span>
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <div className={`bg-gradient-to-r ${level.color} rounded-3xl p-6 shadow-xl`}>
                <div className="grid grid-cols-2 gap-6 text-white text-center">
                  <div>
                    <div className="text-2xl font-bold mb-1">
                      {level.rebate}{level.rebatePercent && <span className="text-sm ml-1">{level.rebatePercent}</span>}
                    </div>
                    <div className="text-sm opacity-90">Rebate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">{level.quantity}</div>
                    <div className="text-sm opacity-90">Quantity</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 text-white">
          <p className="text-sm leading-relaxed text-center">
            Copy your invitation link or code and share it with your friends and family, let them register and invest through your link.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionScreen;
