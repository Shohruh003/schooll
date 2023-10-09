import './dashboard.css'
import TadLogo from '../../Image/tad-head-big.png'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../Image/logotad.svg'
import boy from '../../Image/happy-removebg-preview 1.svg'
import teacher from '../../Image/teacher.svg'
import all from '../../Image/all.svg'
import boyTwo from '../../Image/happy-removebg-preview 2.svg'

function Dashboard2() {
    const [dashpupil, setDashPupil] = useState()
    const [dashteacher, setDashteacher] = useState()
    const [user, setUser] = useState()

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


    return (
        <div className='dashboard2'>
            <h1>СИСТЕМА АНАЛИЗА ПСИХОЭМОЦИОНАЛЬНОГО <br />СОСТОЯНИЯ  УЧАЩИХСЯ </h1>
            <div className='dashboard-body'>
                <div className='dashboard-left'>
                    <h2>СРЕДНЯЯ <br />ШКОЛА №64 <br />г. Ташкента</h2>
                    <img src={logo} />
                </div>
                <ul>
                    <li className='card-one'>
                        <img src={boy} />
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