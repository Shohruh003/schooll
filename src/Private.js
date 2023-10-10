
import { Route, Routes } from "react-router-dom"
import Admin from "./Pages/Admin/Admin"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Dash from "./components/Dash/Dash"
import Psycholog from "./Pages/Psycholog/Psycholog"
import Teacher from "./Pages/Teacher/Teacher"
import Dashboard2 from "./components/Dashboard2/Dashboard2"
import { DecodeHooks } from "./Hooks/DecodeHook"
import { useEffect, useState } from "react"
import axios from "axios"



export const Private = () => {
  const {decode} = DecodeHooks()
  const [position, setPosition] = useState()
  useEffect(() => {

		const fetchClasses = async () => {
			try {

				const response = await axios.get(`https://www.api.yomon-emas.uz/api/users/users/${decode}/`);
				setPosition(response.data.status)
			} catch (error) {
				console.error(error);
			}
		};

		fetchClasses();
	}, []);

    if (position === 'admin') {
      return (
          <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      )
    }
    if (position === 'psychologist') {
      return (
          <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/psychologist/*" element={<Psycholog />} />
        </Routes>
      )}

      if (position === 'teacher') {
        return (
            <Routes>
            <Route path="/*" element={<Dashboard2 />} />
            <Route path="/teacher/*" element={<Teacher/>}/>

          </Routes>
        )}
    // <div>
    //   <div className="private">
    //     <Routes>
    //       <Route path="/*" element={<Dashboard />} />
    //       <Route path="/admin/*" element={<Admin />} />
    //       <Route path="/upload/*" element={<Dash />} />
    //       <Route path="/psychologist/*" element={<Psycholog />} />
    //       <Route path="/teacher/*" element={<Teacher/>}/>
    //       <Route path="/dashboard2/*" element={<Dashboard2/>}/>
    //     </Routes>
    //   </div>
    // </div>

}