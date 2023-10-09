import axios from "axios";
import { useEffect } from "react";
import { PupilHooks } from "../../Hooks/PupilHooks";
import './pupil.css'
import { Link } from "react-router-dom";
import { OriginalUserHooks } from "../../Hooks/OriginalUsersHook";
import { AgeRangeHooks } from "../../Hooks/AgeRangeHook";
import { GendersHooks } from "../../Hooks/GendersHooks";
import { PupilEmotionHooks } from "../../Hooks/PupilEmotionHook";
import { ClassesHooks } from "../../Hooks/ClassesHook";
import { PupilCountHooks } from "../../Hooks/PupilCountHook";
import { TeacherHooks } from "../../Hooks/TeacherHook";
import { PupilClassHooks } from "../../Hooks/PupilClassHook";
import { ThemeHooks } from "../../Hooks/ThemeHook";


function Pupil() {

  const {user, setUsers} = PupilHooks()
  const {originalUsers, setOriginalUsers} = OriginalUserHooks();
  const {ageRange,setAgeRange} = AgeRangeHooks()
  const {genders, setGenders} = GendersHooks()
  const {pupilEmotion, setPupilEmotion} = PupilEmotionHooks()
  const {classes, setClasses} = ClassesHooks()
  const {pupilCount, setPupilCount} = PupilCountHooks()
  const {teacher, setTeacher} = TeacherHooks()
  const {pupilClass, setPupilClass} = PupilClassHooks()
  const {theme} = ThemeHooks()
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
        const params = {};
        if (ageRange) {
          params.age_range = ageRange;
        }
        if (pupilClass) {
          params.pupil_class = pupilClass;
        }
        if (genders.length > 0) {
          params.gender = genders.join(',');
        }

        if (pupilEmotion) {
          params.emotions = pupilEmotion
        }

        const response = await axios.get('https://www.api.yomon-emas.uz/api/users/pupils/', { params });
        setPupilCount(response.data.count)
      setUsers(response.data.results);
      setOriginalUsers(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPupils();
  }, [ageRange, pupilClass, genders, pupilEmotion]);
  return (
    <ul className="people_list" style={{'--scrollbar-thumb': theme}}>
                        {user.map((item) => {
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

const firstMaxConfidenceIndex = emotions.findIndex(
  (emotion) => emotion.confidence === maxConfidence
);

const firstEmotionWithMaxConfidence = emotions[firstMaxConfidenceIndex];
console.log(firstEmotionWithMaxConfidence);
    return (
      <li key={item.id} style={{borderColor: theme}}>
      <Link className='people_link'>
        <img className='people_image' src={pupils.thumbnail} alt="People of the img" width='100' height='100' />
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
    </ul>
  )
}

export default Pupil;