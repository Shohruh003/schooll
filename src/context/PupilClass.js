import React from 'react';
import { useState, createContext } from "react";

export const PupilClassContext = createContext();

export const PupilClassProvider = ({children}) => {
  const [pupilClass, setPupilClass] = useState('');

  return (
    <PupilClassContext.Provider value={{pupilClass, setPupilClass}}>
      {children}
    </PupilClassContext.Provider>
  );
};