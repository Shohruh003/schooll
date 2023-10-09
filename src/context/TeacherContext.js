import React from 'react';
import { useState, createContext } from "react";

export const TeacherContext = createContext();

export const TeacherProvider = ({children}) => {
  const [teacher, setTeacher] = useState();


  return (
    <TeacherContext.Provider value={{teacher, setTeacher}}>
      {children}
    </TeacherContext.Provider>
  );
};