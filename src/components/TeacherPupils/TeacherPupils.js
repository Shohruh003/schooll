
import { useContext } from "react";
import './teacherPupils.css'
import { Link } from "react-router-dom";
import EditAdminModal from "../../Modal/User_modal/EditAdminmodal";
import { AuthContext } from "../../context/PupilContext";
import usersLogo from '../../Image/photo_people.jpg'


function TeacherPupil() {
const {teacherPupils,theme,editAdminModal, setEditAdminModal} = useContext(AuthContext)
const style = document.createElement('style');
style.innerHTML = `
  .teacher_list::-webkit-scrollbar-thumb {
    background-color: ${theme};
  }
`;
document.head.appendChild(style);


  const clickItem = () => {
    setEditAdminModal(true)
  }
  return (
    <ul className="teacher_list" style={{'--scrollbar-thumb': theme}}>
                        {teacherPupils?.map((item) => {
                   const date = item?.birth_date;
                   const birthDate = new Date(date);
                   const today = new Date();
                   const age = today.getFullYear() - birthDate.getFullYear();
  const pupils = item?.thumbnail && item?.thumbnail.length ? item?.thumbnail[0] : {
    "thumbnail": item?.main_image,
    "create_date": "0 "
}
  const emotions = item?.emotions ? item?.emotions : {
    emotions: [
      {
        "emotions": "happy",
        "confidence": 0,
        "create_date": "0"
      }]
  }
  const emotionsWent = emotions && emotions[0] ? emotions[0] : {
    "emotions": "",
    "confidence": 0,
    "create_date": "0"
  }
  const emotionsCome =emotions && emotions.length > 1 ? emotions[emotions.length - 1] : {
    "emotions": "happy",
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

let maxConfidence = -Infinity;
let maxConfidenceIndex = -1;

for (let i = 0; i < emotions.length; i++) {
  if (emotions[i].confidence > maxConfidence) {
    maxConfidence = emotions[i].confidence;
    maxConfidenceIndex = i;
  }
}
const firstMaxConfidenceIndex = emotions?.emotions?.findIndex(
  (emotion) => emotion?.confidence === maxConfidence
);
const firstEmotionWithMaxConfidence = emotions[firstMaxConfidenceIndex];
console.log(firstEmotionWithMaxConfidence);
    return (
      <li key={item?.id} style={{borderColor: theme}} onClick={clickItem}>
      <Link className='teacher_link'>
        <img className='teacher_image' src={item?.main_image ? item?.main_image : usersLogo} alt="teacher of the img" width='100' height='100' />
        <p className="full_nameTeach" style={{borderColor: theme}}>
          <span className='teacher_heading'>Фамилия и имя</span>
          <span className='teacher_name'>{item?.full_name ? item?.full_name : "Пустой"}</span>
        </p>
        <p className="teachPupil_time" style={{borderColor: theme}}>
          <span className='teacher_heading'>Пришел: {comeClock ? comeClock : "0"}</span>
          <span className='teacher_heading'>Ушел: {wentClock ? wentClock : "0"}</span>
        </p>
        <p style={{borderColor: theme}}>
          <span className='teacher_heading'>Класс</span>
          <span className='teacher_name'>{item?.pupil_class ? item?.pupil_class : "Пустой"}</span>
        </p>
        <p style={{borderColor: theme}}>
          <span className='teacher_heading'>Возраст</span>
          <span className='teacher_name'>{age ? age : "0"}</span>
        </p>
        <p style={{borderColor: theme}} className={`emotions ${firstEmotionWithMaxConfidence && firstEmotionWithMaxConfidence?.emotions ? firstEmotionWithMaxConfidence?.emotions === "neutral" ? "Нейтраль" : firstEmotionWithMaxConfidence?.emotions === "happy" ? "Веселье" : firstEmotionWithMaxConfidence?.emotions === "angry" ? "Злость" : firstEmotionWithMaxConfidence?.emotions === "sad" ? "Грусть" : firstEmotionWithMaxConfidence?.emotions === "fear" ? "Страх" : firstEmotionWithMaxConfidence?.emotions === "surprise" ? "Удивление" : "Пустой" : "Пустой"}`}> 
        <span className='teacher_heading'> {firstEmotionWithMaxConfidence && firstEmotionWithMaxConfidence?.emotions ? firstEmotionWithMaxConfidence?.emotions === "neutral" ? "Нейтраль" : firstEmotionWithMaxConfidence?.emotions === "happy" ? "Веселье" : firstEmotionWithMaxConfidence?.emotions === "angry" ? "Злость" : firstEmotionWithMaxConfidence?.emotions === "sad" ? "Грусть" : firstEmotionWithMaxConfidence?.emotions === "fear" ? "Страх" : firstEmotionWithMaxConfidence?.emotions === "surprise" ? "Удивление" : "Пустой" : "Пустой"} </span>
          <span className='teacher_name'>{firstEmotionWithMaxConfidence && firstEmotionWithMaxConfidence?.emotions ? firstEmotionWithMaxConfidence?.confidence : "0"} %</span>
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