import React from 'react';
import { useState, createContext } from "react";

export const PositionContext = createContext();

export const PositionProvider = ({children}) => {
  const [position, setPosition] = useState();

  return (
    <PositionContext.Provider value={{position, setPosition}}>
      {children}
    </PositionContext.Provider>
  );
};