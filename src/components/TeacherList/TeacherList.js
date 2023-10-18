import axios from "axios";
import { useContext, useEffect } from "react";
import './teacherList.css'
import { Link } from "react-router-dom";
import EditAdminModal from "../../Modal/User_modal/EditAdminmodal";
import { AuthContext } from "../../context/PupilContext";


function TeacherList() {
  const {genders, setOriginalUsers,pupilClass,pupilEmotion, teacher, setTeacher,theme,editAdminModal, setEditAdminModal, setEditUser} = useContext(AuthContext)

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
        if (pupilClass) {
          params.pupil_class = pupilClass;
        }
        if (genders.length > 0) {
          params.gender = genders.join(',');
        }

        if (pupilEmotion) {
          params.emotions = pupilEmotion
        }

        const response = await axios.get('https://www.api.yomon-emas.uz/api/users/users/?status=teacher', { params });
      setTeacher(response.data.results);
      setOriginalUsers(response.data.results);

      } catch (error) {
        console.error(error);
      }
    };

    fetchPupils();
  }, [pupilClass, genders, pupilEmotion]);

  const clickItem = (evt) => {
    setEditAdminModal(true)
    setEditUser(evt)
  }
  return (
    <ul className="teacher_list">
                        {teacher?.map((item) => {
  const emotions = item.emotions ? item.emotions : {
    emotions: [
      {
        "emotions": "happy",
        "confidence": 54,
        "create_date": "2023-09-26T20:12:16.675505Z"
      }]
  }
  const emotionsCome = emotions && emotions[0] ? emotions[0] : {
    "emotions": "happy",
    "confidence": 54,
    "create_date": "2023-09-26T20:12:16.675505Z"
  }
  const emotionsWent =emotions && emotions.length > 1 ? emotions[emotions.length -1] : {
    "emotions": "happy",
    "confidence": 54,
    "create_date": "2023-09-26T20:12:16.675505Z"
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

const firstMaxConfidenceIndex = emotions.findIndex(
  (emotion) => emotion.confidence === maxConfidence
);

const firstEmotionWithMaxConfidence = emotions[firstMaxConfidenceIndex];

    return (
      <li key={item.id} style={{borderColor: theme}} onClick={() => clickItem(item)}>
      <Link className='teacher_link'>
        <img className='teacher_image' src={teacher.thumbnail} alt="teacher of the img" width='100' height='100' />
        <p style={{borderColor: theme}}>
          <span className='teacher_heading'>Фамилия и имя</span>
          <span className='teacher_name'>{item.full_name ? item.full_name : "Пустой"}</span>
        </p>
        <p style={{borderColor: theme}}>
          <span className='teacher_heading'>Пришел: {comeClock ? comeClock : "0"}</span>
          <span className='teacher_heading'>Ушел: {wentClock ? wentClock : "0"}</span>
        </p>
        <p style={{borderColor: theme}} className={`emotions ${firstEmotionWithMaxConfidence && firstEmotionWithMaxConfidence.emotions ? firstEmotionWithMaxConfidence.emotions === "neutral" ? "Нейтраль" : firstEmotionWithMaxConfidence.emotions === "happy" ? "Веселье" : firstEmotionWithMaxConfidence.emotions === "angry" ? "Грусть" : firstEmotionWithMaxConfidence.emotions === "sad" ? "Злость" : "Пустой" : "Пустой"}`}>
        <span className='people_heading'> {firstEmotionWithMaxConfidence && firstEmotionWithMaxConfidence.emotions ? firstEmotionWithMaxConfidence.emotions === "neutral" ? "Нейтраль" : firstEmotionWithMaxConfidence.emotions === "happy" ? "Веселье" : firstEmotionWithMaxConfidence.emotions === "angry" ? "Грусть" : firstEmotionWithMaxConfidence.emotions === "sad" ? "Злость" : "Пустой" : "Пустой"} </span>
          <span className='people_name'>{firstEmotionWithMaxConfidence && firstEmotionWithMaxConfidence.emotions ? firstEmotionWithMaxConfidence.confidence : "0"} %</span>
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