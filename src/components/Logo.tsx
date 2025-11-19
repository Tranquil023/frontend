import React from "react";

const Logo: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => {
  return (
    <div className={`${className} flex flex-col items-center justify-center space-y-2 select-none`}>
      <svg viewBox="0 0 120 120" className="w-16 h-16">
        
        {/* Light ring for visibility on colored backgrounds */}
        <circle 
          cx="60" 
          cy="60" 
          r="50" 
          stroke="rgba(255, 255, 255, 0.2)" 
          strokeWidth="4" 
          fill="#FF7A00" 
        />

        {/* Modern Geometric "S" */}
        <path
          d="
            M40 40 
            H80 
            C88 40 88 50 80 50 
            H50 
            C42 50 42 60 50 60 
            H80 
            C88 60 88 70 80 70 
            H40
          "
          stroke="#000000"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Accent Dot - Bold Orange */}
        {/* <circle cx="88" cy="28" r="7" fill="" /> */}
      </svg>

      {/* Brand Name */}
      {/* <span className="font-semibold text-xl tracking-wide text-black dark:text-white font-extrabold">
        STACK
      </span> */}
    </div>
  );
};

export default Logo;
