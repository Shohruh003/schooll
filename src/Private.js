
import { Route, Routes } from "react-router-dom"
import Admin from "./Pages/Admin/Admin"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Dash from "./components/Dash/Dash"
import Psycholog from "./Pages/Psycholog/Psycholog"
import Teacher from "./Pages/Teacher/Teacher"
import Dashboard2 from "./components/Dashboard2/Dashboard2"



export const Private = () => {
  return (
    <div>
      <div className="private">
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/upload/*" element={<Dash />} />
          <Route path="/psychologist/*" element={<Psycholog />} />
          <Route path="/teacher/*" element={<Teacher/>}/>
          <Route path="/dashboard2/*" element={<Dashboard2/>}/>
        </Routes>
      </div>
    </div>
  )
}