import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-blue-500 transition-opacity duration-300">
            {/* Spinner (Adjust h/w and colors as needed) */}
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mb-4"></div>
            <p className="text-white text-lg font-medium">Loading Dashboard...</p>
        </div>
    );
};

export default LoadingScreen;