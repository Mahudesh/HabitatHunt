// src/Contexts/PropertyContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context
const PropertyContext = createContext();

// Create a provider component
export const PropertyProvider = ({ children }) => {         
  const [properties, setProperties] = useState([]);
 
  // You can set properties here or use an effect to fetch data if needed
  return (
    <PropertyContext.Provider value={{ properties, setProperties }}>
      {children}
    </PropertyContext.Provider>
  );
};

// Custom hook to use the PropertyContext
export const useProperties = () => useContext(PropertyContext);
