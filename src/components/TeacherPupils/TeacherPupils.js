import axios from "axios";
import { useContext, useEffect, useState } from "react";
import './teacherPupils.css'
import { Link } from "react-router-dom";
import EditAdminModal from "../../Modal/User_modal/EditAdminmodal";
import { AuthContext } from "../../context/PupilContext";
import { DecodeHooks } from "../../Hooks/DecodeHook";
import usersLogo from '../../Image/photo_people.jpg'


function TeacherPupil() {
const {user, setUsers,genders, setOriginalUsers,pupilEmotion,theme,editAdminModal, setEditAdminModal} = useContext(AuthContext)
const {decode} = DecodeHooks()
const [ids, setIds] = useState()

  const style = document.createElement('style');
style.innerHTML = `
  .people_list::-webkit-scrollbar-thumb {
    background-color: ${theme};
  }
`;
document.head.appendChild(style);

  useEffect(() => {

    const fetchPupils = async () => {
      try {
        const response = await axios.get(`https://www.api.yomon-emas.uz/api/users/users/${decode}/`);
      setIds(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPupils();
  }, []);

useEffect(() => {
    const fetchData = async () => {
      try {

        const params = {};

        if (genders.length > 0) {
          params.gender = genders.join(',');
        }

        if (pupilEmotion) {
          params.emotions = pupilEmotion
        }

  const pupilIds = ids?.pupils['2-a']?.map((pupil) => pupil.id);
        const promises = pupilIds.map(async (id) => {
          const response = await axios.get(`https://www.api.yomon-emas.uz/api/users/pupils/${id}`, { params });
          return response.data;
        });
        const absentPupilsData = await Promise.all(promises);
        setUsers(absentPupilsData);
        setOriginalUsers(absentPupilsData)
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [ids?.pupils, genders, pupilEmotion]);

  const clickItem = () => {
    setEditAdminModal(true)
  }

  return (
    <ul className="people_list" style={{'--scrollbar-thumb': theme}}>
                        {user?.map((item) => {
                   const date = item.birth_date;
                   const birthDate = new Date(date);
                   const today = new Date();
                   const age = today.getFullYear() - birthDate.getFullYear();
  const pupils = item.thumbnail && item.thumbnail.length ? item.thumbnail[0] : {
    "thumbnail": item.main_image,
    "create_date": "2023-09-26T16:36:37.036650Z"
}
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

const firstMaxConfidenceIndex = emotions?.findIndex(
  (emotion) => emotion?.confidence === maxConfidence
);

const firstEmotionWithMaxConfidence = emotions[firstMaxConfidenceIndex];
    return (
      <li key={item.id} style={{borderColor: theme}} onClick={clickItem}>
      <Link className='people_link'>
        <img className='people_image' src={(pupils?.thumbnail.split('').reverse().slice(0,3).reverse().join('') == 'jpg') ? pupils.thumbnail : usersLogo} alt="People of the img" width='100' height='100' />
        <p style={{borderColor: theme}}>
          <span className='people_heading'>Фамилия и имя</span>
          <span className='people_name'>{item.full_name ? item.full_name : "Пустой"}</span>
        </p>
        <p style={{borderColor: theme}}>
          <span className='people_heading'>Пришел: {comeClock ? comeClock : "0"}</span>
          <span className='people_heading'>Ушел: {wentClock ? wentClock : "0"}</span>
        </p>
        <p style={{borderColor: theme}}>
          <span className='people_heading'>Класс</span>
          <span className='people_name'>{item.pupil_class ? item.pupil_class : "Пустой"}</span>
        </p>
        <p style={{borderColor: theme}}>
          <span className='people_heading'>Возраст</span>
          <span className='people_name'>{age ? age : "0"}</span>
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

export default TeacherPupil;