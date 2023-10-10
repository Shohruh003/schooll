import './dashboard2.css'
import TadLogo from '../../Image/tad-head-big.png'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../Image/logotad.svg'
import gif from '../../Gif/happy-gif-unscreen.gif'
import boy from '../../Image/happy-removebg-preview 1.svg'
import teacher from '../../Image/teacher.svg'
import all from '../../Image/all.svg'
import boyTwo from '../../Image/happy-removebg-preview 2.svg'
import { DecodeHooks } from '../../Hooks/DecodeHook';

function Dashboard2() {
    const [dashpupil, setDashPupil] = useState()
    const [dashteacher, setDashteacher] = useState()
    const [user, setUser] = useState()

    const logOut = () => {
		localStorage.clear()
		window.location.reload()
	}

    //   useEffect(() => {

    //     const fetchPupils = async () => {
    //       try {
    //         const response = await axios.get('https://www.api.yomon-emas.uz/api/users/AllPupilsEmotion/for_pupils/');
    //         setDashPupil(response.data.Pupils)
    //         setDashteacher(response.data.Teacher)
    //         setUser(response.data.Users)
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };

    //     fetchPupils();
    //   }, []);
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


    return (
        <div className='dashboard2'>
            <div className='dashboard2_heading'>
            <h1>СИСТЕМА АНАЛИЗА ПСИХОЭМОЦИОНАЛЬНОГО <br />СОСТОЯНИЯ  УЧАЩИХСЯ </h1>
            <button className='logout' style={{borderRadius: "50px"}} onClick={logOut}>Log Out</button>
            <Link className='dashboard2_headerButton' to={position === 'teacher' ? `${position}/pupil` : 'родители'}>Доска {position === 'teacher' ? 'преподавателей' : 'родители'}</Link>
            </div>
            <div className='dashboard-body'>
                <div className='dashboard-left'>
                    <h2>СРЕДНЯЯ <br />ШКОЛА №64 <br />г. Ташкента</h2>
                    <img src={logo} />
                </div>
                <ul>
                    <li className='card-one'>
                        <img className='gifImg' src={gif} alt='GIF' />
                        <div className='card_text'>
                            <div className='card-item'>
                                <p>Всего учеников</p>
                                <h2>441</h2>
                            </div>
                            <div className='card-item'>
                                <p>Общий <br />эмоциональный фон <br />учеников</p>
                                <button>Всё хорошо</button>
                            </div>
                        </div>
                    </li>
                    <li className='card-two'>
                        <div className='card-two-header'>
                            <img src={teacher} />
                            <div className='card-item'>
                                <p>Всего<br /> преподавателей</p>
                                <h2>36</h2>
                            </div>
                        </div>
                        <p>Общий эмоциональный фон<br /> преподавателей</p>
                        <button>Всё хорошо</button>
                    </li>
                    <li className='card-there'>
                        <p>Общий эмоциональный <br />фон школы</p>
                        <div className='card-there-body'>
                            <button>Всё хорошо</button>
                            <img src={all} />
                        </div>
                    </li>
                    <li className='card-last'>
                        <img src={boyTwo} />
                        <div>
                            <h2>Уровень депрессии</h2>
                            <button><span>0%</span> Всё хорошо!</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Dashboard2;