import {Routes, Route} from 'react-router-dom';
import Login from './Pages/Login/Login';
import Dash from './components/Dash/Dash';
import Psycholog from './Pages/Psycholog/Psycholog';
import Teacher from './Pages/Teacher/Teacher';
import Admin from './Pages/Admin/Admin';

export const Public = () => {
  return (
    <Login/>
  )
}