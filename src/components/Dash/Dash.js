import './dash.css'
import TadLogo from '../../Image/tad-head-big.png'
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { TeacherContext } from '../../context/TeacherContext';

function Dash() {
  const [dashpupil, setDashPupil] = useState()
  const [dashteacher, setDashteacher] = useState()
  const [user, setUser] = useState()
  const {position} = useContext(TeacherContext)
  console.log(position);

  useEffect(() => {

    const fetchPupils = async () => {
      try {
        const response = await axios.get('https://www.api.yomon-emas.uz/api/users/all_pupils_emotion/for_pupils/');
        setDashPupil(response.data.Pupils)
        setDashteacher(response.data.Teacher)
        setUser(response.data.Users)
      } catch (error) {
        console.error(error);
      }
    };

    fetchPupils();
  }, []);


  return (
    <div className='dash'>
      <div className="dash_inner">
        <div className="dash_content">
          <ul className='dash_list'>
            <li className="dash_item">
              <p className="dashItem_text">Общий эмоциональный фон учеников</p>
              <div className='dashItem_result'>
                <p className='resultName'>Всего учеников <span className='resultCount'>{dashpupil?.count}</span></p>
                <p className='resultEmotion'>ХОРОШО</p>
              </div>
            </li>

            <li className="dash_item">
              <p className="dashItem_text">Общий эмоциональный фон преподавателей</p>
              <div className='dashItem_result'>
                <p className='resultName'>Всего преподавателей <span className='resultCount'>{dashteacher?.count}</span></p>
                <p className='resultEmotion'>ХОРОШО</p>
              </div>
            </li>

            <li className="dash_item item_dash">
              <p className="dashItem_text">Общий эмоциональный фон школы</p>
              <div className='dashItem_result'>
                <p className='resultName'>Всего <br /> школы <span className='resultCount'>{user?.count}</span></p>
                <p className='resultEmotion'>ХОРОШО</p>
              </div>
            </li>

            <li className="dash_item itemDash">
              <p className="itemDash_text">Уровень депрессии</p>
              
            </li>
          </ul>

        </div>
        <div className="dash_header">
          <h2 className='dash_heading'>СИСТЕМА АНАЛИЗА ПСИХОЭМОЦИОНАЛЬНОГО СОСТОЯНИЯ УЧАЩИХСЯ</h2>
          <img className='dashLogo' src={TadLogo} alt="logoTad"  width='200' height='300'/>
          <h3 className='dashLogoName'>Tad Industries</h3>

          <Link className='dashLink' to={`${position}/pupil`}>Доска {position === 'teacher' ? 'преподавателей' : position === 'admin' ? 'администратора' : position === 'psychologist' ? 'психолога' : 'родители'}</Link>
        </div>
      </div>
    </div>
  )
}
export default Dash;