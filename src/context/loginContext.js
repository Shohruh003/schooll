import { useState, createContext, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({children}) => {
  const localData = JSON.parse(localStorage.getItem('token'));
  const [token, setToken] = useState(localData);

  useEffect (() => {
    if(token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <LoginContext.Provider value={{token, setToken}}>
      {children}
    </LoginContext.Provider>
  );
};