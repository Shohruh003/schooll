import React from 'react';
import { useState, createContext } from "react";

export const GendersContext = createContext();

export const GendersProvider = ({children}) => {
  const [genders, setGenders] = useState([]);

  return (
    <GendersContext.Provider value={{genders, setGenders}}>
      {children}
    </GendersContext.Provider>
  );
};