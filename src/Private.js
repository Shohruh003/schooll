
import { Route, Routes } from "react-router-dom"
import Admin from "./Pages/Admin/Admin"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Psycholog from "./Pages/Psycholog/Psycholog"
import Teacher from "./Pages/Teacher/Teacher"
import Dashboard2 from "./components/Dashboard2/Dashboard2"
import { DecodeHooks } from "./Hooks/DecodeHook"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Parents from './Pages/Parents/Parents';
import { AuthContext } from "./context/PupilContext"
import { LoginHooks } from "./Hooks/LoginHooks"



export const Private = () => {
  const {decode} = DecodeHooks()
  const {token, setToken} = LoginHooks()
  const {position, setPosition,allToken} = useContext(AuthContext)
  console.log(allToken);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`https://smartsafeschoolback.tadi.uz/api/users/users/${decode}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const intervalId = setInterval(async () => {
          try {
            const response1 = await axios.post('https://smartsafeschoolback.tadi.uz/api/users/token/refresh/', {
              'refresh': allToken?.refresh
            });
  
              setToken(response1.data.access);
          } catch (error) {
            console.error(error);
            clearInterval(intervalId);
          }
        }, 10 * 60 * 1000);
        
        setTimeout(() => {
          clearInterval(intervalId);
          localStorage.clear()
          window.location.reload()
        }, 23 * 60 * 60 * 1000);
        
        setPosition(response.data.status);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchClasses();
  }, [decode]);
    if (position === 'admin' || position === 'psychologist') {
      return (
          <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/psychologist/*" element={<Psycholog />} />
        </Routes>
      )
    }

      if (position === 'teacher') {
        return (
            <Routes>
            <Route path="/*" element={<Dashboard2 />} />
            <Route path="/teacher/*" element={<Teacher/>}/>
          </Routes>
        )}

        if (position === 'parents') {
          return (
              <Routes>
              <Route path="/*" element={<Dashboard2 />} />
            <Route path="/parents/*" element={<Parents/>}/>
            </Routes>
          )}
}