import React from 'react';
import { useState, createContext } from "react";

export const AgeRangeContext = createContext();

export const AgeRangeProvider = ({children}) => {
  const [ageRange, setAgeRange] = useState('');

  return (
    <AgeRangeContext.Provider value={{ageRange, setAgeRange}}>
      {children}
    </AgeRangeContext.Provider>
  );
};