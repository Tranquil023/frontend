import React, { createContext, useContext, useState, ReactNode } from 'react';
import LoadingScreen from '../components/LoadingScreen'; // Adjust path as needed

// 1. Define the Context structure
interface LoadingContextType {
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// 2. Define the Provider component
interface LoadingProviderProps {
    children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {/* Conditionally render the visual loading screen globally */}
            {isLoading && <LoadingScreen />}
            {children}
        </LoadingContext.Provider>
    );
};

// 3. Define the custom Hook for easy consumption
export const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};