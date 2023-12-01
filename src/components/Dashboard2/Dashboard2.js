import './dashboard2.css'
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../Image/logotad.svg'
import gif from '../../Gif/happy-gif-unscreen.gif'
import teacherImg from '../../Gif/teacher-normal-gif.gif'
import boyTwo from '../../Gif/aggressive-unscreen.gif'
import { DecodeHooks } from '../../Hooks/DecodeHook';
import { AuthContext } from '../../context/PupilContext';
import { LoginHooks } from '../../Hooks/LoginHooks';

function Dashboard2() {
    const {position, setPosition} = useContext(AuthContext)
    const [dashpupil, setDashPupil] = useState()
    const [dashteacher, setDashteacher] = useState()
    const {token} = LoginHooks()

    const config =  {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  
    useEffect(() => {

        const fetchPupils = async () => {
          try {
            const response = await axios.get('https://www.api.yomon-emas.uz/api/users/all_pupils_emotion/for_pupils/',config);
            setDashPupil(response.data)
            setDashteacher(response.data.Teacher)
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchPupils();
      }, []);
      const parcents = dashpupil?.Emotion_percent?.percent
      const parcet = Number(parcents).toFixed(0)

    const logOut = () => {
		localStorage.clear()
		window.location.reload()
	}

    const {decode} = DecodeHooks()

    useEffect(() => {

		const fetchClasses = async () => {
			try {

				const response = await axios.get(`https://www.api.yomon-emas.uz/api/users/users/${decode}/`,config);
				setPosition(response.data.status)
			} catch (error) {
				console.error(error);
			}
		};

		fetchClasses();
	}, [decode]);

    return (
        <div className='dashboard2'>
            <div className='dashboard2_heading'>
                <h1>СИСТЕМА АНАЛИЗА ПСИХОЭМОЦИОНАЛЬНОГО <br />СОСТОЯНИЯ  УЧАЩИХСЯ </h1>
                <h2>СРЕДНЯЯ ШКОЛА №121 <br />г. Ташкента</h2>
                <button className='logout_dashboard' style={{borderRadius: "50px"}} onClick={logOut}>Выйти</button>
                <Link className='dashboard2_headerButton' to={position === 'teacher' ? `${position}/pupil` : 'parents'}>Доска {position === 'teacher' ? 'преподавателей' : 'родителя'}</Link>
            </div>
            <div className='dashboard-body'>
                <div className='dashboard-left'>
                    <h2>СРЕДНЯЯ <br />ШКОЛА №121 <br />г. Ташкента</h2>
                    <img src={logo} alt='logo' />
                </div>
                <ul>
                    <li className='card-one'>
                        <img className='gifImg' src={gif} alt='GIF' />
                        <div className='card_text'>
                            <div className='card-item'>
                                <p>Всего учеников</p>
                                <h2>{dashpupil?.Pupils?.count}</h2>
                            </div>
                            <div className='card-item'>
                                <p>Общий <br />эмоциональный фон <br />учеников</p>
                                <button>Всё хорошо</button>
                            </div>
                        </div>
                    </li>
                    <li className='card-two'>
                        <div className='card-two-header'>
                            <img className='teacherGif' src={teacherImg} alt='teacher' />
                            <div className='card-item'>
                                <p>Всего<br /> преподавателей</p>
                                <h2>{dashteacher?.count}</h2>
                            </div>
                        </div>
                        <div className='card-itemTwo'>
                        <p>Общий <br/> эмоциональный фон<br /> преподавателей</p>
                        <button>Всё хорошо</button>
                            </div>
                        
                    </li>
                    <li className='card-there'>
                        <p>Общий эмоциональный <br />фон школы</p>
                        <div className='card-there-body'>
                            <button>Всё хорошо</button>
                            <img className='allGiff' src={gif} alt='allIcon' />
                        </div>
                    </li>
                    <li className='card-last'>
                    <img className='boyTwo' src={boyTwo} alt='GIF' />
                        <div>
                            <h2>Уровень депрессии</h2>
                            <button><span>{parcet}%</span> Всё хорошо!</button>
                        </div>
                    </li>
                </ul>
                
            </div>
            <Link className='dashboard2_button' to={position === 'teacher' ? `${position}/pupil` : 'parents'}>Доска {position === 'teacher' ? 'преподавателей' : 'родителя'}</Link>
        </div>
    )
}
export default Dashboard2;