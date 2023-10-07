import React from 'react';
import { useState, createContext } from "react";

export const ClassListContext = createContext();

export const ClassListProvider = ({children}) => {
  const [classList, setClassList] = useState([]);

  return (
    <ClassListContext.Provider value={{classList, setClassList}}>
      {children}
    </ClassListContext.Provider>
  );
};