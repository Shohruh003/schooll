import './dashboard2.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../Image/logotad.svg'
import gif from '../../Gif/happy-gif-unscreen.gif'
import teacher from '../../Image/teacher.svg'
import all from '../../Image/all.svg'
import boyTwo from '../../Gif/happy-gif-right-bg.gif'
import { DecodeHooks } from '../../Hooks/DecodeHook';

function Dashboard2() {
    const [dashpupil, setDashPupil] = useState()
    const [dashteacher, setDashteacher] = useState()
  
    useEffect(() => {

        const fetchPupils = async () => {
          try {
            const response = await axios.get('https://www.api.yomon-emas.uz/api/users/all_pupils_emotion/for_pupils/');
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
	}, [decode]);

    return (
        <div className='dashboard2'>
            <div className='dashboard2_heading'>
            <h1>СИСТЕМА АНАЛИЗА ПСИХОЭМОЦИОНАЛЬНОГО <br />СОСТОЯНИЯ  УЧАЩИХСЯ </h1>
            <button className='logout' style={{borderRadius: "50px"}} onClick={logOut}>Log Out</button>
            <Link className='dashboard2_headerButton' to={position === 'teacher' ? `${position}/pupil` : 'parents'}>Доска {position === 'teacher' ? 'преподавателей' : 'родителя'}</Link>
            </div>
            <div className='dashboard-body'>
                <div className='dashboard-left'>
                    <h2>СРЕДНЯЯ <br />ШКОЛА №64 <br />г. Ташкента</h2>
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
                            <img src={teacher} alt='teacher' />
                            <div className='card-item'>
                                <p>Всего<br /> преподавателей</p>
                                <h2>{dashteacher?.count}</h2>
                            </div>
                        </div>
                        <p>Общий эмоциональный фон<br /> преподавателей</p>
                        <button>Всё хорошо</button>
                    </li>
                    <li className='card-there'>
                        <p>Общий эмоциональный <br />фон школы</p>
                        <div className='card-there-body'>
                            <button>Всё хорошо</button>
                            <img src={all} alt='allIcon' />
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
        </div>
    )
}
export default Dashboard2;