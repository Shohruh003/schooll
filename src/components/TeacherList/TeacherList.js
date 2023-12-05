import axios from "axios";
import { useContext, useEffect } from "react";
import './teacherList.css'
import { Link } from "react-router-dom";
import EditAdminModal from "../../Modal/User_modal/EditAdminmodal";
import { AuthContext } from "../../context/PupilContext";
import usersLogo from '../../Image/photo_people.jpg'
import { LoginHooks } from "../../Hooks/LoginHooks";


function TeacherList() {
  const {genders,position, setOriginalUsers,pupilClass,pupilEmotion,teacher, setTeacher,theme,editAdminModal, setEditAdminModal, setEditUser} = useContext(AuthContext)
  const {token} = LoginHooks()
  const style = document.createElement('style');
style.innerHTML = `
  .teacher_list::-webkit-scrollbar-thumb {
    background-color: ${theme};
  }
`;
document.head.appendChild(style);

  useEffect(() => {

    const fetchPupils = async () => {
      try {
        const params = {};
        if (genders.length > 0) {
          params.gender = genders.join(',');
        }

        if (pupilEmotion) {
          params.filter_by_emotion = pupilEmotion
        }

        if (pupilClass) {
          params.search = pupilClass;
        }

        const response = await axios.get('https://smartsafeschoolback.tadi.uz/api/users/users/?status=teacher', { params,headers: {
          Authorization: `Bearer ${token}`,
        } });
      setTeacher(response.data.results);
      setOriginalUsers(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };  

    fetchPupils();
  }, [pupilClass, genders, pupilEmotion]);

  const clickItem = (evt) => {
    setEditUser(evt)
    if (position === 'admin') {
      setEditAdminModal(true)
    }
  }
  return (
    <ul className="teacher_list" style={{ '--scrollbar-thumb': theme }}>
                        {teacher?.map((item) => {
  const emotions = item?.todays_emotions ? item?.todays_emotions : {
    emotions: [
      {
        "emotions": "Отсутствует",
        "confidence": 0,
        "create_date": "0"
      }]
  }
  const emotionsCome = emotions && emotions[0] ? emotions[0] : {
    "emotions": "Отсутствует",
    "confidence": 0,
    "create_date": "0"
  }
  const emotionsWent =emotions && emotions.length > 1 ? emotions[emotions.length -1] : {
    "emotions": "Отсутствует",
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

const firstMaxConfidenceIndex = emotions?.findIndex(
  (emotion) => emotion.confidence === maxConfidence
);

const firstEmotionWithMaxConfidence = emotions[firstMaxConfidenceIndex];

    return (
      <li key={item.id} style={{borderColor: theme}} onClick={() => clickItem(item)}>
      <Link className='teacher_link'>
        <img className='teacher_image' src={item?.main_image ? item?.main_image : usersLogo} alt="teacher of the img" width='100' height='100' />
        <p className="name_item" style={{borderColor: theme}}>
          <div>
          <span className='teacher_heading'>Фамилия и имя</span>
          <span className='teacher_name'>{item.full_name ? item.full_name : "Отсутствует"}</span>
          </div>
        </p>
        <p className="timeTeacher" style={{borderColor: theme}}>
          <div>
          <span className='teacher_heading'>Пришел: {comeClock === "00:00" ? "--:--" : comeClock}</span>
          <span className='teacher_heading'>Ушел: {wentClock === "00:00" ? "--:--" : wentClock}</span>
          </div>
        </p>
        <p style={{borderColor: theme}} className={`emotions ${firstEmotionWithMaxConfidence && firstEmotionWithMaxConfidence.emotions ? firstEmotionWithMaxConfidence.emotions === "neutral" ? "Нейтраль" : firstEmotionWithMaxConfidence.emotions === "happy" ? "Веселье" : firstEmotionWithMaxConfidence.emotions === "angry" ? "Злость" : firstEmotionWithMaxConfidence.emotions === "sad" ? "Грусть" : firstEmotionWithMaxConfidence.emotions === "fear" ? "Страх" : firstEmotionWithMaxConfidence.emotions === "surprise" ? "Удивление" : "Отсутствует" : "Отсутствует"}`}>
        <div>
        <span className='people_heading'> {firstEmotionWithMaxConfidence && firstEmotionWithMaxConfidence.emotions ? firstEmotionWithMaxConfidence.emotions === "neutral" ? "Нейтраль" : firstEmotionWithMaxConfidence.emotions === "happy" ? "Веселье" : firstEmotionWithMaxConfidence.emotions === "angry" ? "Злость" : firstEmotionWithMaxConfidence.emotions === "sad" ? "Грусть" : firstEmotionWithMaxConfidence.emotions === "fear" ? "Страх" : firstEmotionWithMaxConfidence.emotions === "surprise" ? "Удивление" : "Отсутствует" : "Отсутствует"} </span>
          <span className='people_name'>{firstEmotionWithMaxConfidence && firstEmotionWithMaxConfidence.emotions ? firstEmotionWithMaxConfidence.confidence : "0"} %</span>
        </div>
        </p>
      </Link>
    </li>
    )
})}
        <EditAdminModal editAdminModal={editAdminModal} setEditAdminModal={setEditAdminModal}/>
    </ul>
  )
}

export default TeacherList;