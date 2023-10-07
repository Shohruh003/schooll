import React from 'react';
import { useState, createContext } from "react";

export const OriginalUsersContext = createContext();

export const OriginalUsersProvider = ({children}) => {
  const [originalUsers, setOriginalUsers] = useState([]);

  return (
    <OriginalUsersContext.Provider value={{originalUsers, setOriginalUsers}}>
      {children}
    </OriginalUsersContext.Provider>
  );
};