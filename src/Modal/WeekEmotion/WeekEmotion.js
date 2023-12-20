import { useContext, useEffect, useState } from 'react';
import "./weekEmotion.css"
import { Modal } from 'react-bootstrap';
import { AuthContext } from '../../context/PupilContext';
import { BarChart } from '@mui/x-charts';
import styled from '@emotion/styled';
import api from '../../components/Api/api';


function WeekEmotion () {
  const {theme, deleteId,weekEmotion, setWeekEmotion, weekFullName} = useContext(AuthContext)
  const [bar, setBar] = useState()



  const elList = document.querySelector('.weekThemes');
  if (elList) {
    if (theme === '#ffbe98') {
      elList.style.backgroundColor = 'rgba(255, 190, 152,0.2)';
    } else if (theme === '#81B37A') {
      elList.style.backgroundColor = 'rgba(129, 179, 122,0.2)';
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
        const response = await api.get(`/users/emotions/${deleteId}/weekly_diagram_v2/`);
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
let happy0 = filteredData0?.happy
let happy1 = filteredData1?.happy
let happy2 = filteredData2?.happy
let happy3 = filteredData3?.happy
let happy4 = filteredData4?.happy
let happy5 = filteredData5?.happy

let neutral0 = filteredData0?.neutral
let neutral1 = filteredData1?.neutral
let neutral2 = filteredData2?.neutral
let neutral3 = filteredData3?.neutral
let neutral4 = filteredData4?.neutral
let neutral5 = filteredData5?.neutral

let sad0 = filteredData0?.sad
let sad1 = filteredData1?.sad
let sad2 = filteredData2?.sad
let sad3 = filteredData3?.sad
let sad4 = filteredData4?.sad
let sad5 = filteredData5?.sad

let angry0 = filteredData0?.angry
let angry1 = filteredData1?.angry
let angry2 = filteredData2?.angry
let angry3 = filteredData3?.angry
let angry4 = filteredData4?.angry
let angry5 = filteredData5?.angry

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
                <div className='week_content weekThemes'>

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
        { data: [isNaN(neutral5) ? 0 : neutral5,isNaN(neutral4) ? 0 : neutral4,isNaN(neutral3) ? 0 : neutral3,isNaN(neutral2) ? 0 : neutral2,isNaN(neutral1) ? 0 : neutral1,isNaN(neutral0) ? 0 : neutral0], color: '#81B37A', label: "Нейтраль"  },
        { data: [isNaN(sad5) ? 0 : sad5,isNaN(sad4) ? 0 : sad4,isNaN(sad3) ? 0 : sad3,isNaN(sad2) ? 0 : sad2,isNaN(sad1) ? 0 : sad1,isNaN(sad0) ? 0 : sad0], color: '#c0c0c0', label: "Грусть"  },
        { data: [isNaN(angry5) ? 0 : angry5,isNaN(angry4) ? 0 : angry4,isNaN(angry3) ? 0 : angry3,isNaN(angry2) ? 0 : angry2,isNaN(angry1) ? 0 : angry1,isNaN(angry0) ? 0 : angry0], color: '#ffbe98', label: "Злость"}

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