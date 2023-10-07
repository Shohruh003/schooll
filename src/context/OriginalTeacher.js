import React from 'react';
import { useState, createContext } from "react";

export const OriginalTeacherContext = createContext();

export const OriginalTeacherProvider = ({children}) => {
  const [originalTeacher, setOriginalTeacher] = useState([]);

  return (
    <OriginalTeacherProvider.Provider value={{originalTeacher, setOriginalTeacher}}>
      {children}
    </OriginalTeacherProvider.Provider>
  );
};