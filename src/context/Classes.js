import React from 'react';
import { useState, createContext } from "react";

export const ClassesContext = createContext();

export const ClassesProvider = ({children}) => {
  const [classes, setClasses] = useState();

  return (
    <ClassesContext.Provider value={{classes, setClasses}}>
      {children}
    </ClassesContext.Provider>
  );
};