import React from 'react';
import { useState, createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('#FC6C85');
  const [editAdminModal, setEditAdminModal] = useState()

  return (
    <ThemeContext.Provider value={{theme, setTheme, editAdminModal, setEditAdminModal}}>
      {children}
    </ThemeContext.Provider>
  );
};