import './dashboard2.css'
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import logo from '../../Image/logotad.svg'
import gif from '../../Gif/Happy.gif'
import gifSad from '../../Gif/Sad.gif'
import gifNormal from '../../Gif/Normal.gif'
import teacherImg from '../../Gif/teacher-normal-gif.gif'
import boyTwo from '../../Gif/Agressive.gif'
import fearGif from '../../Gif/Wonder.gif'
import scaredGif from '../../Gif/Scared.gif'
import { DecodeHooks } from '../../Hooks/DecodeHook';
import { AuthContext } from '../../context/PupilContext';
import api from '../Api/api';

function Dashboard2() {
    const {position, setPosition, schoolNum, setSchoolNum} = useContext(AuthContext)
    const [dashpupil, setDashPupil] = useState()
    const [dashteacher, setDashteacher] = useState()
    const [dashPupilEmo, setDashPupilEmo] = useState()
    useEffect(() => {
        const fetchPupils = async () => {
          try {
            const response = await api.get('/users/all_pupils_emotion/for_pupils/');
            setDashPupil(response.data)
            setDashteacher(response.data.Teacher)
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchPupils();
      }, []);

    const logOut = () => {
		localStorage.clear()
		window.location.reload()
	}

    const {decode} = DecodeHooks()

    useEffect(() => {

		const fetchClasses = async () => {
			try {
				const response = await api.get(`/users/users/${decode}/`);
				setPosition(response.data.status)
                try {
                    const response1 = await api.get(`/TheSchool/schoolconfigs/${response?.data?.school}/`);
                    setSchoolNum(response1.data.number)
                } catch (error) {
                    console.error(error);
                }
			} catch (error) {
				console.error(error);
			}
		};
		fetchClasses();
	}, [decode, setPosition]);

    
	useEffect(() => {
		const fetchPupils = async () => {
			try {
				const response = await api.get('/users/all_pupils_emotion/pie_chart/');
				setDashPupilEmo(response.data.all_pupils)
                console.log(response.data.all_pupils);
			} catch (error) {
				console.error(error);
			}
		};

		fetchPupils();
	}, []);

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
                    <img className='gifImg' src={gif} alt='GIF' width="290" height="350"/>
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

                    <li className='card-test1'>
                        <p>Эмоциональная карта</p>
                        <div className='card-test'>
                            <div>
                                <img className='testImg' src={gif} alt='GIF' width="170" height="200" />
                                <button className='Веселье'>Веселье {isNaN(Math.floor(dashPupilEmo?.happy.percentage)) ? 0 : Math.floor(dashPupilEmo?.happy.percentage)}% <span>Событий: {dashPupilEmo?.happy?.count ? dashPupilEmo?.happy?.count : 0}</span></button>
                            </div>

                            <div>
                                <img className='testImg' src={gifNormal} alt='GIF' width="170" height="200" />
                                <button className='Нейтраль'>Нейтраль {isNaN(Math.floor(dashPupilEmo?.neutral.percentage)) ? 0 : Math.floor(dashPupilEmo?.neutral.percentage)}% <span>Событий: {dashPupilEmo?.neutral?.count ? dashPupilEmo?.neutral?.count : 0}</span></button>
                            </div>

                            <div>
                                <img className='testImg' src={fearGif} alt='GIF' width="170" height="200" />
                                <button className='Удивление'>Удивление {isNaN(Math.floor(dashPupilEmo?.surprise.percentage)) ? 0 : Math.floor(dashPupilEmo?.surprise.percentage)}% <span>Событий: {dashPupilEmo?.surprise?.count ? dashPupilEmo?.surprise?.count : 0}</span></button>
                            </div>

                            <div>
                                <img className='testImg' src={gifSad} alt='GIF' width="170" height="200" />
                                <button className='Грусть'>Грусть {isNaN(Math.floor(dashPupilEmo?.sad.percentage)) ? 0 : Math.floor(dashPupilEmo?.sad.percentage)}% <span>Событий: {dashPupilEmo?.sad?.count ? dashPupilEmo?.sad?.count : 0}</span></button>
                            </div>

                            <div>
                                <img className='testImg' src={boyTwo} alt='GIF' width="170" height="200" />
                                <button className='Злость'>Злость {isNaN(Math.floor(dashPupilEmo?.angry.percentage)) ? 0 : Math.floor(dashPupilEmo?.angry.percentage)}% <span>Событий: {dashPupilEmo?.angry?.count ? dashPupilEmo?.angry?.count : 0}</span></button>
                            </div>

                            <div>
                                <img className='testImg' src={scaredGif} alt='GIF' width="170" height="200" />
                                <button className='Страх'>Страх {isNaN(Math.floor(dashPupilEmo?.fear.percentage)) ? 0 : Math.floor(dashPupilEmo?.fear.percentage)}% <span>Событий: {dashPupilEmo?.fear?.count ? dashPupilEmo?.fear?.count : 0}</span></button>
                            </div>
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