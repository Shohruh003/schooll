import axios from "axios";
import { useContext, useEffect } from "react";
import './pupil.css'
import { Link } from "react-router-dom";
import EditAdminModal from "../../Modal/User_modal/EditAdminmodal";
import { AuthContext } from "../../context/PupilContext";
import usersLogo from '../../Image/photo_people.jpg'
import { useState } from "react";


function Pupil() {
  const { user,position, setUsers,pupilEmotion, ageRange, genders, setOriginalUsers, pupilClass, theme, editAdminModal, setEditAdminModal, setEditUser } = useContext(AuthContext)

  const [userEmotion, setUserEmotion] = useState([])
  // const [page, setPage] = useState(1);
  let page = 1;
  console.log(page);
  const style = document.createElement('style');
  style.innerHTML = `
  .people_list::-webkit-scrollbar-thumb {
    background-color: ${theme};
  }
`;
  document.head.appendChild(style);

  const handleScroll = async (e) => {
    const element = e.target;

    // console.log(Math.floor(element.scrollHeight - element.scrollTop) - 1);
    // console.log(element.clientHeight);
    if (Math.floor(element.scrollHeight - element.scrollTop) - 1 < element.clientHeight) {
      // if (page < 20) {
        page = page++
      // }
    }
  }

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

    //     let page = 1;
    // let allData = [];

    // while (true) {
    //   const response = await axios.get(`https://www.api.yomon-emas.uz/api/users/pupils?page=${page}`);
    //   const data = response.data.results;

    //   if (data.length === 0) {
    //     break;
    //   }
      
    //   allData = allData.concat(data);
    //   page++;
    //   setUsers(allData)
    // }

        if (Object.keys(params).length > 0) {
          const response = await axios.get(`https://www.api.yomon-emas.uz/api/users/pupils/?page=1`, { params });
          const arr = response.data.results
          setUsers(arr);
          setOriginalUsers(response.data);
        } else if (page <= 20) {
          const response = await axios.get(`https://www.api.yomon-emas.uz/api/users/pupils/?page=${page}`);
          const arr = response.data.results
          setUsers([...user, ...arr]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPupils();
  }, [ ageRange, pupilClass, genders, pupilEmotion]);

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
    setEditUser(evt)
    if (position === 'admin') {
      setEditAdminModal(true)
    }
  }

  return (
    <ul onScroll={(e) => handleScroll(e)} className="people_list" style={{ '--scrollbar-thumb': theme }}>
      {user?.map((item, index) => {
        const date = item.birth_date;
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const newDate = new Date();
        const formattedDate = newDate.toISOString().substring(0, 10);

        const firstTime = userEmotion[index]?.[formattedDate]?.first?.time
        const lastTime = userEmotion[index]?.[formattedDate]?.last?.time

const dateTime1 = new Date(firstTime ? firstTime : '0');
const dateTime2 = new Date(lastTime ? lastTime : '0');

const newFirstTime = dateTime1.toLocaleTimeString('uz-UZ', { hour: 'numeric', minute: 'numeric' });
const newLastTime = dateTime2.toLocaleTimeString('uz-UZ', { hour: 'numeric', minute: 'numeric' });
        return (

          <li key={item.id} style={{ borderColor: theme }} onClick={() => clickItem(item)}>
            <Link className='people_link'>
              <img className='people_image' src={item?.main_image ?  item?.main_image : usersLogo} alt="People-img" width='100' height='100' />
              <p className="name_item" style={{ borderColor: theme }}>
                <div>
                <span className='people_heading'>Фамилия и имя</span>
                <span className='people_name'>{item.full_name ? item.full_name : "Пустой"}</span>
                </div>
              </p>
              <p className="timePeople" style={{ borderColor: theme }}>
                <div>
                <span className='people_heading'>Пришел: {newFirstTime}</span>
                <span className='people_heading'>Ушел: {newLastTime}</span>
                </div>
              </p>
              <p style={{ borderColor: theme }}>
                <div>
                <span className='people_heading'>Класс</span>
                <span className='people_name'>{item.pupil_class ? item.pupil_class : "Пустой"}</span>
                </div>
              </p>
              <p style={{ borderColor: theme }}>
                <div>
                <span className='people_heading'>Возраст</span>
                <span className='people_name'>{age ? age : "0"}</span>
                </div>
              </p>
              <p style={{ borderColor: theme }}
                className={`emotions ${userEmotion[index]?.[formattedDate]?.last && userEmotion[index]?.[formattedDate]?.last?.emotion ? userEmotion[index]?.[formattedDate]?.last?.emotion === "neutral" ? "Нейтраль" : userEmotion[index]?.[formattedDate]?.last?.emotion === "happy" ? "Веселье" : userEmotion[index]?.[formattedDate]?.last?.emotion === "angry" ? "Злость" : userEmotion[index]?.[formattedDate]?.last?.emotion === "sad" ? "Грусть" : userEmotion[index]?.[formattedDate]?.last?.emotion === "fear" ? "Страх" : userEmotion[index]?.[formattedDate]?.last?.emotion === "surprise" ? "Удивление" : "Пустой" : 'Пустой'}`}
              >
                <div>
                <span className='people_heading'> {userEmotion[index]?.[formattedDate]?.last && userEmotion[index]?.[formattedDate]?.last?.emotion ? userEmotion[index]?.[formattedDate]?.last?.emotion === "neutral" ? "Нейтраль" : userEmotion[index]?.[formattedDate]?.last?.emotion === "happy" ? "Веселье" : userEmotion[index]?.[formattedDate]?.last?.emotion === "angry" ? "Злость" : userEmotion[index]?.[formattedDate]?.last?.emotion === "sad" ? "Грусть" : userEmotion[index]?.[formattedDate]?.last?.emotion === "fear" ? "Страх" : userEmotion[index]?.[formattedDate]?.last?.emotion === "surprise" ? "Удивление" : "Пустой" : 'Пустой'} </span>


<span className='people_name'>{userEmotion[index]?.[formattedDate]?.last && userEmotion[index]?.[formattedDate]?.last.confidence ? userEmotion[index]?.[formattedDate]?.last.confidence : "0"} %</span>
                </div>
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