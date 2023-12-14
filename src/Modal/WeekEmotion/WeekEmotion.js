import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import "./weekEmotion.css"
import { Modal } from 'react-bootstrap';
import { AuthContext } from '../../context/PupilContext';
import { LoginHooks } from '../../Hooks/LoginHooks';
import { BarChart } from '@mui/x-charts';
import styled from '@emotion/styled';


function WeekEmotion () {
  const {theme, deleteId,weekEmotion, setWeekEmotion, weekFullName} = useContext(AuthContext)
  const {token} = LoginHooks()
  const [bar, setBar] = useState()

  const config =  {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }


  const currentDate = new Date();
  const formattedDates = [];
  const remainingDays = 6;
  const weekDays = ["Вс","Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const targetDates = [];
  
  for (let i = 0; i < remainingDays; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    const formattedDate = date.toLocaleDateString("en-GB");
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    const filteredDate = `${year}-${month}-${day}`;
    targetDates.push(filteredDate);
    const weekDay = weekDays[date.getDay()];
    formattedDates.push(`${formattedDate}-${weekDay}`);
  }

  const reversedDates = formattedDates.reverse();

  useEffect(() => {
    const fetchPupils = async () => {
        try {
        const response = await axios.get(`https://smartsafeschoolback.tadi.uz/api/users/emotions/${deleteId}/weekly_diagram_v2/`,config);
            setBar(response.data)
        } catch (error) {
            console.error(error);
        }
    };
    fetchPupils();
}, [deleteId]);

const filteredData0 = bar?.filter((item) => targetDates[0].includes(Object.keys(item)[0]))
  .map((item) => item[Object.keys(item)[0]])[0]

const filteredData1 = bar?.filter((item) => targetDates[1].includes(Object.keys(item)[0]))
  .map((item) => item[Object.keys(item)[0]])[0]

const filteredData2 = bar?.filter((item) => targetDates[2].includes(Object.keys(item)[0]))
  .map((item) => item[Object.keys(item)[0]])[0]

const filteredData3 = bar?.filter((item) => targetDates[3].includes(Object.keys(item)[0]))
  .map((item) => item[Object.keys(item)[0]])[0]

const filteredData4 = bar?.filter((item) => targetDates[4].includes(Object.keys(item)[0]))
  .map((item) => item[Object.keys(item)[0]])[0]

const filteredData5 = bar?.filter((item) => targetDates[5].includes(Object.keys(item)[0]))
  .map((item) => item[Object.keys(item)[0]])[0]
let happy0 = Math.floor(filteredData0?.happy)
let happy1 = Math.floor(filteredData1?.happy)
let happy2 = Math.floor(filteredData2?.happy)
let happy3 = Math.floor(filteredData3?.happy)
let happy4 = Math.floor(filteredData4?.happy)
let happy5 = Math.floor(filteredData5?.happy)

let neutral0 = Math.floor(filteredData0?.neutral)
let neutral1 = Math.floor(filteredData1?.neutral)
let neutral2 = Math.floor(filteredData2?.neutral)
let neutral3 = Math.floor(filteredData3?.neutral)
let neutral4 = Math.floor(filteredData4?.neutral)
let neutral5 = Math.floor(filteredData5?.neutral)

let sad0 = Math.floor(filteredData0?.sad)
let sad1 = Math.floor(filteredData1?.sad)
let sad2 = Math.floor(filteredData2?.sad)
let sad3 = Math.floor(filteredData3?.sad)
let sad4 = Math.floor(filteredData4?.sad)
let sad5 = Math.floor(filteredData5?.sad)

    return (
        <div>
            <Modal
         className='modal'
        show={weekEmotion}
        onHide={() => setWeekEmotion(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
            <div className='week'>
                <h2 style={{color: theme}} className='week_heading'>История эмоций за неделю</h2>
                <p style={{color: theme}} className='week_name'>{weekFullName}</p>
                <div className='week_content'>

                    <BarChart
    xAxis={[
        {
        scaleType: 'band',
        data: reversedDates.flatMap((date) => [
            date
          ]),
        },              
    ]}
    series={[
        { data: [isNaN(happy5) ? 0 : happy5,isNaN(happy4) ? 0 : happy4,isNaN(happy3) ? 0 : happy3,isNaN(happy2) ? 0 : happy2,isNaN(happy1) ? 0 : happy1,isNaN(happy0) ? 0 : happy0], color: '#ffa500', label: '   Веселье' },
        { data: [isNaN(neutral5) ? 0 : neutral5,isNaN(neutral4) ? 0 : neutral4,isNaN(neutral3) ? 0 : neutral3,isNaN(neutral2) ? 0 : neutral2,isNaN(neutral1) ? 0 : neutral1,isNaN(neutral0) ? 0 : neutral0], color: '#008000', label: "Нейтраль"  },
        { data: [isNaN(sad5) ? 0 : sad5,isNaN(sad4) ? 0 : sad4,isNaN(sad3) ? 0 : sad3,isNaN(sad2) ? 0 : sad2,isNaN(sad1) ? 0 : sad1,isNaN(sad0) ? 0 : sad0], color: '#808080', label: "Грусть"  }

    ]}
    width={800}
    height={400}
    />
                </div>
            </div>
        
        </Modal.Body>
      </Modal>

        </div>
    )
}

export default WeekEmotion;