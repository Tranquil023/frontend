import React from 'react';
import { ArrowLeft, Send, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactScreen: React.FC = () => {
  const navigate = useNavigate();
  const communities = [
    {
      id: 1,
      name: 'Telegram Support',
      description: 'Get instant support from our team and community members for any questions or issues you might have.',
      icon: Send,
      color: 'from-blue-500 to-blue-600',
      buttonText: 'Contact Now'
    },
    {
      id: 2,
      name: 'Telegram Channel',
      description: 'Stay updated with our latest news, announcements, and exclusive content through our Telegram channel.',
      icon: Send,
      color: 'from-blue-500 to-blue-600',
      buttonText: 'Join Now'
    },
    {
      id: 3,
      name: 'WhatsApp Group',
      description: 'Connect with other members in real-time, share ideas, and get community support on WhatsApp.',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
      buttonText: 'Join Group'
    }
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
        <h1 className="text-2xl font-bold text-white">Join Our Communities</h1>
        <div className="w-10"></div>
      </div>

      <div className="px-4 space-y-6">
        {communities.map((community) => {
          const Icon = community.icon;
          return (
            <div key={community.id} className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="text-center space-y-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${community.color} rounded-full flex items-center justify-center mx-auto`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800">{community.name}</h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {community.description}
                </p>
                
                <button className={`w-full bg-gradient-to-r ${community.color} hover:opacity-90 text-white font-bold py-3 rounded-2xl transition-all duration-200 transform hover:scale-[1.02]`}>
                  {community.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactScreen;