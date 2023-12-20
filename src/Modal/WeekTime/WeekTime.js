import { useContext, useEffect, useState } from 'react';
import "./weekTime.css"
import { Modal } from 'react-bootstrap';
import { AuthContext } from '../../context/PupilContext';
import api from '../../components/Api/api';


function WeekTime () {
  const {theme, deleteId,weekTime, setWeekTime, weekFullName} = useContext(AuthContext)


  const elList = document.querySelector('.weekThemes');
  if (elList) {
    if (theme === '#ffbe98') {
      elList.style.backgroundColor = 'rgba(255, 190, 152,0.2)';
    } else if (theme === '#81B37A') {
      elList.style.backgroundColor = 'rgba(129, 179, 122,0.2)';
    }
  }

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();

  function getLastWeekDates() {
    const currentDate = new Date();
    const lastWeekDates = [];
  
    for (let i = 6; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        lastWeekDates.push(formattedDate);
      }
  
    return lastWeekDates;
  }
  const result = getLastWeekDates();
  const date1 = result[0];
  const date2 = result[1];
  const date3 = result[2];
  const date4 = result[3];
  const date5 = result[4];
  const date6 = result[5];
  const date7 = result[6];

  const [profil, setProfil] = useState()
  const [pia, setPia] = useState()
  const [week, setWeek] = useState()
  const [week2, setWeek2] = useState()
  const [week3, setWeek3] = useState()
  const [week4, setWeek4] = useState()
  const [week5, setWeek5] = useState()
  const [week6, setWeek6] = useState()
  const [week7, setWeek7] = useState()
  const weekdays = ['Вс','Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const week7day = new Date(date7);
  const week6day = new Date(date6);
  const week5day = new Date(date5);
  const week4day = new Date(date4);
  const week3day = new Date(date3);
  const week2day = new Date(date2);
  const week1day = new Date(date1);
  const weekday7 = weekdays[week7day?.getDay()];
  const weekday6 = weekdays[week6day?.getDay()];
  const weekday5 = weekdays[week5day?.getDay()];
  const weekday4 = weekdays[week4day?.getDay()];
  const weekday3 = weekdays[week3day?.getDay()];
  const weekday2 = weekdays[week2day?.getDay()];

  useEffect(() => { 
    const fetchPrentPupils = async () => {
      try {
          const response = await api.get(`/users/pupils/${deleteId}/`);
          setProfil(response.data)
      } catch (error) {
          console.error(error);
      }


    try {
        const response = await api.get(`/users/emotions/${deleteId}/for_week/`);
        setWeek(response.data)
        const data2 = response.data[date2]
        const data3 = response.data[date3]
        const data4 = response.data[date4]
        const data5 = response.data[date5]
        const data6 = response.data[date6]
        const data7 = response.data[date7]

        setWeek2(data2)
        setWeek3(data3)
        setWeek4(data4)
        setWeek5(data5)
        setWeek6(data6)
        setWeek7(data7)

    } catch (error) {
        console.error(error);
    }
  };

  fetchPrentPupils();
}, [deleteId]);


  const formattedTime2 = new Date(week2?.first?.time).toLocaleTimeString('uz-UZ', {
    hour: 'numeric',
    minute: 'numeric'
  })

  const formattedTime3 = new Date(week3?.first?.time).toLocaleTimeString('uz-UZ', {
    hour: 'numeric',
    minute: 'numeric'
  })

  const formattedTime4 = new Date(week4?.first?.time).toLocaleTimeString('uz-UZ', {
    hour: 'numeric',
    minute: 'numeric'
  })

  const formattedTime5 = new Date(week5?.first?.time).toLocaleTimeString('uz-UZ', {
    hour: 'numeric',
    minute: 'numeric'
  })

  const formattedTime6 = new Date(week6?.first?.time).toLocaleTimeString('uz-UZ', {
    hour: 'numeric',
    minute: 'numeric'
  })

  const formattedTime7 = new Date(week7?.first?.time).toLocaleTimeString('uz-UZ', {
    hour: 'numeric',
    minute: 'numeric'
  })


const formattedTime2week = new Date(week2?.last?.time).toLocaleTimeString('uz-UZ', {
    hour: 'numeric',
    minute: 'numeric'
  })

  const formattedTime3week = new Date(week3?.last?.time).toLocaleTimeString('uz-UZ', {
    hour: 'numeric',
    minute: 'numeric'
  })

  const formattedTime4week = new Date(week4?.last?.time).toLocaleTimeString('uz-UZ', {
    hour: 'numeric',
    minute: 'numeric'
  })

  const formattedTime5week = new Date(week5?.last?.time).toLocaleTimeString('uz-UZ', {
    hour: 'numeric',
    minute: 'numeric'
  })

  const formattedTime6week = new Date(week6?.last?.time).toLocaleTimeString('uz-UZ', {
    hour: 'numeric',
    minute: 'numeric'
  })

  const formattedTime7week = new Date(week7?.last?.time).toLocaleTimeString('uz-UZ', {
    hour: 'numeric',
    minute: 'numeric'
  })
    return (
        <div>
            <Modal
         className='modal'
        show={weekTime}
        onHide={() => setWeekTime(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
            <div className='week'>
                <h2 style={{color: theme}} className='week_heading'>Посещаемость за неделю</h2>
                <p style={{color: theme}} className='week_name'>{weekFullName}</p>
                
                <ul className='week_list weekThemes'>
                                <li className='week_item'>
                                    <p>{weekday2}</p>
                                    <img className='weekImg_come' style={theme === '#81B37A' ? {borderColor: '#ffffff'} : {borderColor: '#ffbe98'}} src={week2?.first?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime2 === 'Invalid Date' ? '--:--' : formattedTime2}</span>
                                    <span className='days'>{date2}</span>
                                    <img className='weekImg_leave' style={theme === '#81B37A' ? {borderColor: '#85D77A'} : {borderColor: '#ffbe98'}} src={week2?.last?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime2week === formattedTime2 ? '--:--' : formattedTime2week}</span>
                                </li>

                                <li className='week_item'>
                                <p>{weekday3}</p>
                                    <img className='weekImg_come' style={theme === '#81B37A' ? {borderColor: '#ffffff'} : {borderColor: '#ffbe98'}} src={week3?.first?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime3 === 'Invalid Date' ? '--:--' : formattedTime3}</span>
                                    <span className='days'>{date3}</span>
                                    <img className='weekImg_leave' style={theme === '#81B37A' ? {borderColor: '#85D77A'} : {borderColor: '#ffbe98'}} src={week3?.last?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime3week === formattedTime3 ? '--:--' : formattedTime3week}</span>
                                </li>

                                <li className='week_item'>
                                <p>{weekday4}</p>

                                    <img className='weekImg_come' style={theme === '#81B37A' ? {borderColor: '#ffffff'} : {borderColor: '#ffbe98'}} src={week4?.first?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime4 === 'Invalid Date' ? '--:--' : formattedTime4}</span>
                                    <span className='days'>{date4}</span>
                                    <img className='weekImg_leave' style={theme === '#81B37A' ? {borderColor: '#85D77A'} : {borderColor: '#ffbe98'}} src={week4?.last?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime4week === formattedTime4 ? '--:--' : formattedTime4week}</span>
                                </li>

                                <li className='week_item'>
                                <p>{weekday5}</p>

                                    <img className='weekImg_come' style={theme === '#81B37A' ? {borderColor: '#ffffff'} : {borderColor: '#ffbe98'}} src={week5?.first?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime5 === 'Invalid Date' ? '--:--' : formattedTime5}</span>
                                    <span className='days'>{date5}</span>
                                    <img className='weekImg_leave' style={theme === '#81B37A' ? {borderColor: '#85D77A'} : {borderColor: '#ffbe98'}} src={week5?.last?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime5week === formattedTime5 ? '--:--' : formattedTime5week}</span>
                                </li>

                                <li className='week_item'>
                                <p>{weekday6}</p>

                                    <img className='weekImg_come' style={theme === '#81B37A' ? {borderColor: '#ffffff'} : {borderColor: '#ffbe98'}} src={week6?.first?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime6 === 'Invalid Date' ? '--:--' : formattedTime6}</span>
                                    <span className='days'>{date6}</span>
                                    <img className='weekImg_leave' style={theme === '#81B37A' ? {borderColor: '#85D77A'} : {borderColor: '#ffbe98'}} src={week6?.last?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime6week === formattedTime6 ? '--:--' : formattedTime6week}</span>
                                </li>

                                <li className='week_item'>
                                <p>{weekday7}</p>

                                    <img className='weekImg_come' style={theme === '#81B37A' ? {borderColor: '#ffffff'} : {borderColor: '#ffbe98'}} src={week7?.first?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime7 === 'Invalid Date' ? '--:--' : formattedTime7}</span>
                                    <span className='days'>{date7}</span>
                                    <img className='weekImg_leave' style={theme === '#81B37A' ? {borderColor: '#85D77A'} : {borderColor: '#ffbe98'}} src={week7?.last?.thumbnail}/>
                                    <span className='weekItem_time'>{formattedTime7week === formattedTime7 ? '--:--' : formattedTime7week}</span>
                                </li>
                            </ul>
            </div>
        
        </Modal.Body>
      </Modal>

        </div>
    )
}

export default WeekTime;