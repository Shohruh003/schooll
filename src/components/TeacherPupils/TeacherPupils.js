
import { useContext } from "react";
import './teacherPupils.css'
import { Link } from "react-router-dom";
import EditAdminModal from "../../Modal/User_modal/EditAdminmodal";
import { AuthContext } from "../../context/PupilContext";
import usersLogo from '../../Image/photo_people.jpg'

function TeacherPupil() {
const {position,teacherPupils,theme,editAdminModal, setEditAdminModal} = useContext(AuthContext)
const style = document.createElement('style');
style.innerHTML = `
  .teacher_list::-webkit-scrollbar-thumb {
    background-color: ${theme};
  }
`;
document.head.appendChild(style);


  const clickItem = () => {
    if (position === 'admin') {
      setEditAdminModal(true)
    }
  }
  return (
    <ul className="teacher_list" style={{'--scrollbar-thumb': theme}}>
                        {teacherPupils?.map((item) => {
                   const date = item?.birth_date;
                   const birthDate = new Date(date);
                   const today = new Date();
                   const age = today.getFullYear() - birthDate.getFullYear();

  const emotions = item?.emotions ? item?.emotions : {
    emotions: [
      {
        "emotions": "",
        "confidence": 0,
        "create_date": "0"
      }]
  }

  const emotionsWent = emotions && emotions[0] ? emotions[0] : {
    "emotions": "",
    "confidence": 0,
    "create_date": "0"
  }
  const emotionsCome =emotions && emotions.length > 0 ? emotions[emotions.length - 1] : {
    "emotions": "",
    "confidence": 0,
    "create_date": "0"
  };
  const dateCome = emotionsCome.create_date;
const comeDateTime = new Date(dateCome);
const comeHours = comeDateTime.getHours().toString().padStart(2, "0");
const comeMinutes = comeDateTime.getMinutes().toString().padStart(2, "0");
const comeClock = `${comeHours}:${comeMinutes}`;

const dateWent = emotionsWent.create_date;
const wentDateTime = new Date(dateWent);
const wentHours = wentDateTime.getHours().toString().padStart(2, "0");
const wentMinutes = wentDateTime.getMinutes().toString().padStart(2, "0");
const wentClock = `${wentHours}:${wentMinutes}`;

    return (
      <li key={item?.id} style={{borderColor: theme}} onClick={clickItem}>
      <Link className='teacher_link'>
        <img className='teacher_image' style={{objectFit: "cover"}} src={item?.main_image ? item?.main_image : usersLogo} alt="teacher of the img" width='100' height='100' />
        <p className="full_nameTeach" style={{borderColor: theme}}>
          <span className='teacher_heading'>Фамилия и имя</span>
          <span className='teacher_name'>{item?.full_name ? item?.full_name : "Отсутствует"}</span>
        </p>
        <p className="teachPupil_time" style={{borderColor: theme}}>
          <span className='teacher_heading'>Пришел: {comeClock === "00:00" ? "09:00" : comeClock}</span>
          <span className='teacher_heading'>Ушел: {wentClock === "00:00" ? "18:00" : wentClock}</span>
        </p>
        <p style={{borderColor: theme}}>
          <span className='teacher_heading'>Класс</span>
          <span className='teacher_name'>{item?.pupil_class ? item?.pupil_class : "1-A"}</span>
        </p>
        <p style={{borderColor: theme}}>
          <span className='teacher_heading'>Возраст</span>
          <span className='teacher_name'>{age ? age : "0"}</span>
        </p>
        <p style={{borderColor: theme}} className={`emotions ${emotions[0] && emotions[0]?.emotions ? emotions[0]?.emotions === "neutral" ? "Нейтраль" : emotions[0]?.emotions === "happy" ? "Веселье" : emotions[0]?.emotions === "angry" ? "Злость" : emotions[0]?.emotions === "sad" ? "Грусть" : emotions[0]?.emotions === "fear" ? "Страх" : emotions[0]?.emotions === "surprise" ? "Удивление" : "Нейтраль" : "Нейтраль"}`}> 
        <span className='teacher_heading'> {emotions[0] && emotions[0]?.emotions ? emotions[0]?.emotions === "neutral" ? "Нейтраль" : emotions[0]?.emotions === "happy" ? "Веселье" : emotions[0]?.emotions === "angry" ? "Злость" : emotions[0]?.emotions === "sad" ? "Грусть" : emotions[0]?.emotions === "fear" ? "Страх" : emotions[0]?.emotions === "surprise" ? "Удивление" : "Нейтраль" : "Нейтраль"} </span>
          <span className='teacher_name'>{emotions[0] && emotions[0]?.emotions ? emotions[0]?.confidence : "100"} %</span>
        </p>
      </Link>
    </li>
    )
})}
        <EditAdminModal editAdminModal={editAdminModal} setEditAdminModal={setEditAdminModal}/>
    </ul>
  )
}

export default TeacherPupil;