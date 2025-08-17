"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';

// Create context
const SandpackContext = createContext(null);

// Provider component
export const SandpackProvider = ({ children }) => {
  const sandpack = useSandpack();
  
  useEffect(() => {
    // Make sandpack instance available globally for the download button in Header
    if (typeof window !== 'undefined' && sandpack) {
      window.__SANDPACK_INSTANCE__ = sandpack;
    }
    
    return () => {
      // Clean up on unmount
      if (typeof window !== 'undefined') {
        delete window.__SANDPACK_INSTANCE__;
      }
    };
  }, [sandpack]);
  
  return (
    <SandpackContext.Provider value={sandpack}>
      {children}
    </SandpackContext.Provider>
  );
};

// Custom hook to use the sandpack context
export const useSandpackContext = () => {
  const context = useContext(SandpackContext);
  if (context === null) {
    throw new Error('useSandpackContext must be used within a SandpackProvider');
  }
  return context;
};