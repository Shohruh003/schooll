import './dashboard2.css'
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../Image/logotad.svg'
import gif from '../../Gif/happy-gif-unscreen.gif'
import gifSad from '../../Gif/sad-gif.gif'
import gifNormal from '../../Gif/normal-gif.gif'
import teacherImg from '../../Gif/teacher-normal-gif.gif'
import boyTwo from '../../Gif/aggressive-unscreen.gif'
import { DecodeHooks } from '../../Hooks/DecodeHook';
import { AuthContext } from '../../context/PupilContext';
import { LoginHooks } from '../../Hooks/LoginHooks';

function Dashboard2() {
    const {position, setPosition} = useContext(AuthContext)
    const [dashpupil, setDashPupil] = useState()
    const [dashteacher, setDashteacher] = useState()
    const [school, setSchool] = useState()
    const [schoolNum, setSchoolNum] = useState()
    const {token} = LoginHooks()
    const [dashPupilEmo, setDashPupilEmo] = useState()

    const [config, setConfig] = useState()
    useEffect(() => {
      const configs =  {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      setConfig(configs)
    }, [token]);
  
    useEffect(() => {
        const fetchPupils = async () => {
          try {
            const response = await axios.get('https://smartsafeschoolback.tadi.uz/api/users/all_pupils_emotion/for_pupils/',config);
            setDashPupil(response.data)
            setDashteacher(response.data.Teacher)
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchPupils();
      }, [config]);
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
				const response = await axios.get(`https://smartsafeschoolback.tadi.uz/api/users/users/${decode}/`,config);
				setPosition(response.data.status)
                setSchool(response.data.school);
			} catch (error) {
				console.error(error);
			}
		};
		fetchClasses();
	}, [decode, config, setPosition]);

    useEffect(() => {

		const fetchClasses = async () => {
			try {
				const response = await axios.get(`https://smartsafeschoolback.tadi.uz/api/TheSchool/schoolconfigs/${school}/`,config);
				setSchoolNum(response.data.number)
			} catch (error) {
				console.error(error);
			}
		};

		fetchClasses();
	}, [school, config]);

    
	useEffect(() => {
		const fetchPupils = async () => {
			try {
				const response = await axios.get('https://smartsafeschoolback.tadi.uz/api/users/all_pupils_emotion/pie_chart/',config);
				setDashPupilEmo(response.data.all_pupils)
			} catch (error) {
				console.error(error);
			}
		};

		fetchPupils();
	}, [config]);

    return (
        <div className='dashboard2'>
            <div className='dashboard2_heading'>
                <h1>СИСТЕМА АНАЛИЗА ПСИХОЭМОЦИОНАЛЬНОГО <br />СОСТОЯНИЯ  УЧАЩИХСЯ </h1>
                <h2>ШКОЛА {schoolNum} <br />г. Ташкента</h2>
                <button className='logout_dashboard' style={{borderRadius: "50px"}} onClick={logOut}>Выйти</button>
                <Link className='dashboard2_headerButton' to={position === 'teacher' ? `${position}/pupil` : 'parents'}>Доска {position === 'teacher' ? 'преподавателей' : 'родителя'}</Link>
            </div>
            <div className='dashboard-body'>
                <div className='dashboard-left'>
                    <h2>ШКОЛА {schoolNum} <br />г. Ташкента</h2>
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

                    <li className='card-test'>
                        <div>
                            <img className='testImg' src={gif} alt='GIF' />
                            <button className='Веселье'>Веселье {isNaN(Math.floor(dashPupilEmo?.happy.percentage)) ? 0 : Math.floor(dashPupilEmo?.happy.percentage)}%</button>
                        </div>

                        <div>
                            <img className='testImg' src={gifNormal} alt='GIF' />
                            <button className='Нейтраль'>Нейтраль {isNaN(Math.floor(dashPupilEmo?.neutral.percentage)) ? 0 : Math.floor(dashPupilEmo?.neutral.percentage)}%</button>
                        </div>

                        <div>
                            <img className='testImg' src={gifNormal} alt='GIF' />
                            <button className='Удивление'>Удивление {isNaN(Math.floor(dashPupilEmo?.surprise.percentage)) ? 0 : Math.floor(dashPupilEmo?.surprise.percentage)}%</button>
                        </div>

                        <div>
                            <img className='testImg' src={gifSad} alt='GIF' />
                            <button className='Грусть'>Грусть {isNaN(Math.floor(dashPupilEmo?.sad.percentage)) ? 0 : Math.floor(dashPupilEmo?.sad.percentage)}%</button>
                        </div>

                        <div>
                            <img className='testImg' src={gifSad} alt='GIF' />
                            <button className='Злость'>Злость {isNaN(Math.floor(dashPupilEmo?.angry.percentage)) ? 0 : Math.floor(dashPupilEmo?.angry.percentage)}%</button>
                        </div>

                        <div>
                            <img className='testImg' src={boyTwo} alt='GIF' />
                            <button className='Страх'>Страх {isNaN(Math.floor(dashPupilEmo?.fear.percentage)) ? 0 : Math.floor(dashPupilEmo?.fear.percentage)}%</button>
                        </div>
                    </li>
{/*                     <li className='card-there'>
                        <p>Общий эмоциональный <br />фон школы</p>
                        <div className='card-there-body'>
                            <button>Всё хорошо</button>
                            <img className='allGiff' src={gif} alt='allIcon' />
                        </div>
                    </li>
                    <li className='card-last'>
                    <img className='boyTwo' src={parcet > 15 ? boyTwo : gif} alt='GIF' />
                        <div>
                            <h2>Уровень отрицательных эмоции сегодня</h2>
                            <button className={parcet > 15 ? "redBack" : ""}><span>{parcet}%</span> {parcet > 15 ? "Депрессия" : "Всё хорошо!"}</button>
                        </div>
                    </li> */}
                </ul>
                
            </div>
            <Link className='dashboard2_button' to={position === 'teacher' ? `${position}/pupil` : 'parents'}>Доска {position === 'teacher' ? 'преподавателей' : 'родителя'}</Link>
        </div>
    )
}
export default Dashboard2;