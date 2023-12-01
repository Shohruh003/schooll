
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
  const {token} = LoginHooks()
  const {position, setPosition} = useContext(AuthContext)
  useEffect(() => {

		const fetchClasses = async () => {
			try {

				const response = await axios.get(`https://www.api.yomon-emas.uz/api/users/users/${decode}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
				setPosition(response.data.status)
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