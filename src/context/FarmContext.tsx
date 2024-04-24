import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authorizedAPI } from '../utils/api'; // Assume authorizedAPI is a pre-configured axios instance

// Define the shape of the context
interface FarmContextType {
    selectedField: any;
    setSelectedField: (field: any) => void;
    RetrieveFarmsData: () => void;
}

// Create a context with default values
const FarmContext = createContext<FarmContextType | undefined>(undefined);

// Create a context provider component
const FarmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedField, setSelectedField] = useState<any>(null);

    useEffect(() => {
        const retrieveSelectedField = async () => {
            try {
                const savedFieldJSON = await AsyncStorage.getItem('selectedField');
                if (savedFieldJSON) {
                    console.log(savedFieldJSON)
                    const savedField = JSON.parse(savedFieldJSON);
                    setSelectedField(savedField);
                }
            } catch (error) {
                console.error('Error retrieving field data from local storage:', error);
            }
        };
        retrieveSelectedField();
    }, []);

    const RetrieveFarmsData = async () => {
        try {
            const response = await authorizedAPI.get('/fields');
            return response;
        } catch (error) {
            console.error('Error updating selected field:', error);
        }
    };

    return (
        <FarmContext.Provider value={{ selectedField, setSelectedField, RetrieveFarmsData }}>
            {children}
        </FarmContext.Provider>
    );
};

// Custom hook to use the context
const useFarmContext = () => {
    const context = useContext(FarmContext);
    if (!context) {
        throw new Error('useFarmContext must be used within a FarmProvider');
    }
    return context;
};

export { FarmProvider, useFarmContext };