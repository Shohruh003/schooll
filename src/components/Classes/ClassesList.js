import axios from "axios";
import { useContext, useEffect } from "react";
import './classes.css'
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/PupilContext";


function ClassesList() {
  const {classList, setClassList,genders, setOriginalUsers,pupilClass,theme, pupilEmotion} = useContext(AuthContext)

  const style = document.createElement('style');
  style.innerHTML = `
    .class_list::-webkit-scrollbar-thumb {
      background-color: ${theme};
    }
  `;
  document.head.appendChild(style);


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

        const response = await axios.get('https://www.api.yomon-emas.uz/api/users/pupils/classes/', { params });
      setClassList(response.data.classes);
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

    return (
      <li key={item.key} style={{borderColor: theme}}>
      <Link className='class_link'>
        <div className="class_heading1">
          <span className='class_heading class_heading0'>Класс</span>
          <span className='class_name'>{item.key ? item.key : "Пустой"}</span>
        </div>
        <p style={{borderColor: theme}}>
          <span className='class_heading'>Всего учеников</span>
          <span className='class_name'>{item.value.all_pupils_count ? item.value.all_pupils_count : "Пустой"}</span>
        </p>

        <p style={{borderColor: theme}}>
        <span className='class_heading'>Учеников в классе</span>
          <span className='class_name'>{item.value.existing_pupils ? item.value.existing_pupils : "Пустой"}</span>
        </p>

        <p className={`emotions`} style={{borderColor: theme}}>
        <span className='class_heading'>Пустой</span>
          <span className='class_name'>0 %</span>
        </p>
      </Link>
    </li>
    )
})}
    </ul>
  )
}

export default ClassesList;