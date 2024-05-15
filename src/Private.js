import { Route, Routes } from "react-router-dom"
import Admin from "./Pages/Admin/Admin"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Psycholog from "./Pages/Psycholog/Psycholog"
import Teacher from "./Pages/Teacher/Teacher"
import Dashboard2 from "./components/Dashboard2/Dashboard2"
import { DecodeHooks } from "./Hooks/DecodeHook"
import { useContext, useEffect } from "react"
import Parents from './Pages/Parents/Parents';
import { AuthContext } from "./context/PupilContext"
import api from "./components/Api/api"

export const Private = () => {
  const {decode} = DecodeHooks()
  const {position, setPosition} = useContext(AuthContext)
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get(`/users/users/${decode}/`);       
        setPosition(response?.data?.status);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchClasses();
  }, [decode, setPosition]);
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