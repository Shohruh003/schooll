import React, { useEffect } from 'react';
import { useState, createContext } from "react";

export const DecodeContext = createContext();

export const DecodeProvider = ({children}) => {
  const localData = JSON.parse(localStorage.getItem('decode'));
  const [decode, setDecode] = useState(localData);

  useEffect(() => {
    if(decode) {
      localStorage.setItem('decode', JSON.stringify(decode));
    } else {
      localStorage.removeItem('decode');
    }
  }, [decode]);

  return (
    <DecodeContext.Provider value={{decode, setDecode}}>
      {children}
    </DecodeContext.Provider>
  );
};