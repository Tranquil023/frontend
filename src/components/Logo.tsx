import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Background Circle */}
        <circle cx="60" cy="60" r="50" fill="#0ea5e9" fillOpacity="0.1" />
        
        {/* Dollar Symbol */}
        <path
          d="M65 35v5h-10v-5h10zM60 85c-8.284 0-15-6.716-15-15 0-4.142 1.679-7.89 4.394-10.606C51.11 57.679 54.858 56 59 56h2c2.761 0 5-2.239 5-5s-2.239-5-5-5h-2c-2.761 0-5 2.239-5 5h-10c0-8.284 6.716-15 15-15h2c8.284 0 15 6.716 15 15 0 4.142-1.679 7.89-4.394 10.606C69.89 63.321 66.142 65 62 65h-2c-2.761 0-5 2.239-5 5s2.239 5 5 5h2c2.761 0 5-2.239 5-5h10c0 8.284-6.716 15-15 15z"
          fill="#0ea5e9"
        />
        
        {/* Growth Arrow */}
        <path
          d="M85 45l-15-15v10H55v10h15v10z"
          fill="#10b981"
        />
        
        {/* Investment Dots */}
        <circle cx="30" cy="60" r="4" fill="#6366f1" />
        <circle cx="90" cy="60" r="4" fill="#6366f1" />
        <circle cx="60" cy="30" r="4" fill="#6366f1" />
        <circle cx="60" cy="90" r="4" fill="#6366f1" />
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-slate-800 font-bold text-xs">MoneyInvest</span>
      </div>
    </div>
  );
};

export default Logo;