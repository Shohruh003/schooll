import React from 'react';
import { useState, createContext } from "react";

export const PupilCountContext = createContext();

export const PupilCountProvider = ({children}) => {
  const [pupilCount, setPupilCount] = useState();

  return (
    <PupilCountContext.Provider value={{pupilCount, setPupilCount}}>
      {children}
    </PupilCountContext.Provider>
  );
};