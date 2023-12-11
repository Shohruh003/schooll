import axios from "axios";
import { useContext, useEffect, useState } from "react";
import './classes.css'
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/PupilContext";
import { LoginHooks } from "../../Hooks/LoginHooks";


function ClassesList() {
  const {classList, setClassList,genders, setOriginalUsers,pupilClass,theme, pupilEmotion} = useContext(AuthContext)
  const {token} = LoginHooks()
  const style = document.createElement('style');
  style.innerHTML = `
    .class_list::-webkit-scrollbar-thumb {
      background-color: ${theme};
    }
  `;
  document.head.appendChild(style);
  const [emo, setEmo] = useState()


  useEffect(() => {

    const fetchClasses = async () => {
      try {
        const params = {};
        if (pupilClass) {
          params.pupil_class = pupilClass;
        }

        if (pupilEmotion) {
          params.emotions = pupilEmotion
        }

        const response = await axios.get('https://smartsafeschoolback.tadi.uz/api/users/pupils/classes/', { params,headers: {
          Authorization: `Bearer ${token}`,
        } });
      setClassList(response.data.classes);
      console.log(response.data);
      setOriginalUsers(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, [pupilClass, genders, pupilEmotion]);

  const arr = Object.keys(classList).map(key => ({ key, value: classList[key] }));
  return (
    <ul className="class_list">
                        {arr?.map((item) => {
                          const emotionClassConfidance = Math.floor(100 - item?.value?.sad_avg)
                          const emotionClass = emotionClassConfidance && emotionClassConfidance ? emotionClassConfidance > 80 ?  "Веселье" : emotionClassConfidance > 64 ? "Нейтраль" : emotionClassConfidance > 48 ? "Удивление" : emotionClassConfidance > 32 ? "Злость" : emotionClassConfidance > 16 ? "Страх" : emotionClassConfidance < 16 ? "Грусть" : "Отсутствует" : 'Отсутствует'

    return (
      <li key={item.key} style={{borderColor: theme}}>
      <Link className='class_link'>
        <div className="class_heading1">
          <div>
          <span className='class_heading class_heading0'>Класс</span>
          <span className='class_name'>{item.key ? item.key : "Отсутствует"}</span>
          </div>
        </div>
        <p style={{borderColor: theme}}>
          <div>
          <span className='class_heading'>Всего учеников</span>
          <span className='class_name'>{item.value.all_pupils_count ? item.value.all_pupils_count : "Отсутствует"}</span>
          </div>
        </p>

        <p style={{borderColor: theme}}>
        <div>
        <span className='class_heading'>Учеников в классе</span>
          <span className='class_name'>{item.value.present_pupils.count}</span>
        </div>
        </p>

        <p className={`emotions emotionClass ${emotionClass}`} style={{borderColor: theme}}>
        <div>
        <span className='class_heading'>{emotionClass}</span>
          <span className='class_name'>{emotionClassConfidance} %</span>
        </div>
        </p>
      </Link>
    </li>
    )
})}
    </ul>
  )
}

export default ClassesList;