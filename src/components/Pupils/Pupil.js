import axios from "axios";
import { useContext, useEffect } from "react";
import './pupil.css'
import { Link } from "react-router-dom";
import EditAdminModal from "../../Modal/User_modal/EditAdminmodal";
import { AuthContext } from "../../context/PupilContext";
import usersLogo from '../../Image/photo_people.jpg'
import { useState } from "react";


function Pupil() {
  const { user, setUsers, ageRange, genders, setOriginalUsers, pupilClass, pupilEmotion, theme, editAdminModal, setEditAdminModal, setEditUser } = useContext(AuthContext)

  const [userEmotion, setUserEmotion] = useState([])
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
          params.search = pupilClass;
        }
        if (genders.length > 0) {
          params.gender = genders.join(',');
        }

        if (pupilEmotion) {
          params.filter_by_emotion = pupilEmotion
        }

        const response = await axios.get('https://www.api.yomon-emas.uz/api/users/pupils/', { params });
        setUsers(response.data.results);
        setOriginalUsers(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPupils();
  }, [ageRange, pupilClass, genders, pupilEmotion]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = user?.map(async (id) => {
          const response = await axios.get(`https://www.api.yomon-emas.uz/api/users/emotions/${id.id}/for_week/`);
          return response.data;
        });

        const presentPupilsData = await Promise.all(promises);
        setUserEmotion(presentPupilsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  const clickItem = (evt) => {
    setEditAdminModal(true)
    setEditUser(evt)
  }


  return (
    <ul className="people_list" style={{ '--scrollbar-thumb': theme }}>
      {user?.map((item, index) => {
        const date = item.birth_date;
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const emotions = item.emotions ? item.emotions : {
          emotions: [
            {
              "emotions": "happy",
              "confidence": 0,
              "create_date": "0"
            }]
        }

        const emotionsCome = emotions && emotions[0] ? emotions[0] : {
          "emotions": "happy",
          "confidence": 0,
          "create_date": "0"
        }
        const emotionsWent = emotions && emotions.length > 1 ? emotions[emotions.length - 1] : {
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
        const newDate = new Date();
        const formattedDate = newDate.toISOString().substring(0, 10);

        console.log(userEmotion[index]?.[formattedDate]);
        return (

          <li key={item.id} style={{ borderColor: theme }} onClick={() => clickItem(item)}>
            <Link className='people_link'>
              <img className='people_image' src={userEmotion[index]?.[formattedDate]?.first.thumbnail || usersLogo} alt="People-img" width='100' height='100' />
              <p className="name_item" style={{ borderColor: theme }}>
                <span className='people_heading'>Фамилия и имя</span>
                <span className='people_name'>{item.full_name ? item.full_name : "Пустой"}</span>
              </p>
              <p style={{ borderColor: theme }}>
                <span className='people_heading'>Пришел: {userEmotion[index]?.[formattedDate]?.first.time}</span>
                <span className='people_heading'>Ушел: {userEmotion[index]?.[formattedDate]?.last.time}</span>
              </p>
              <p style={{ borderColor: theme }}>
                <span className='people_heading'>Класс</span>
                <span className='people_name'>{item.pupil_class ? item.pupil_class : "Пустой"}</span>
              </p>
              <p style={{ borderColor: theme }}>
                <span className='people_heading'>Возраст</span>
                <span className='people_name'>{age ? age : "0"}</span>
              </p>
              <p style={{ borderColor: theme }}
                className={`emotions ${userEmotion[index]?.[formattedDate]?.last && userEmotion [index]?.[formattedDate]?.last?.emotion ? userEmotion[index]?.[formattedDate]?.last?.emotion === "neutral" ? "Нейтраль" : userEmotion[index]?.[formattedDate]?.last?.emotion === "happy" ? "Веселье" : userEmotion[index]?.[formattedDate]?.last?.emotion === "angry" ? "Грусть" : userEmotion[index]?.[formattedDate]?.last?.emotion === "sad" ? "Злость" : "Пустой" : "Пустой"}`}
              >
                <span className='people_heading'> {
                userEmotion[index]?.[formattedDate]?.last && 
                userEmotion[index]?.[formattedDate]?.last?.emotion ? 
                userEmotion[index]?.[formattedDate]?.last?.emotion == "neutral" ? "Нейтраль" : userEmotion[index]?.[formattedDate]?.last?.emotion == "happy" ? "Веселье" : userEmotion[index]?.[formattedDate]?.last?.emotion == "angry" ? "Грусть" : userEmotion[index]?.[formattedDate]?.last?.emotion == "sad" ? "Злость" : "Пустой" : 
                userEmotion[index]?.[formattedDate]?.last?.emotion ? 
                userEmotion[index]?.[formattedDate]?.last?.emotion 
                : 'Пустой'} </span>


                <span className='people_name'>{userEmotion[index]?.[formattedDate]?.last && userEmotion[index]?.[formattedDate]?.last.confidence ? userEmotion[index]?.[formattedDate]?.last.confidence : "0"} %</span>
              </p>
            </Link>
          </li>
        )
        // })
      })}
      <EditAdminModal editAdminModal={editAdminModal} setEditAdminModal={setEditAdminModal} />
    </ul>
  )
}

export default Pupil;