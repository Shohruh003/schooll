import React from 'react';
import { useState, createContext } from "react";

export const TeacherCountContext = createContext();

export const TeacherCountProvider = ({children}) => {
  const [teacherCount, setTeacherCount] = useState();

  return (
    <TeacherCountContext.Provider value={{teacherCount, setTeacherCount}}>
      {children}
    </TeacherCountContext.Provider>
  );
};