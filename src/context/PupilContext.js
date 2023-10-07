import React from 'react';
import { useState, createContext } from "react";

export const PupilContext = createContext();

export const PupilProvider = ({children}) => {
  const [user, setUsers] = useState([])

  return (
    <PupilContext.Provider value={{user, setUsers}}>
      {children}
    </PupilContext.Provider>
  );
};