import axios from "axios";
import { useContext, useEffect } from "react";
import './pupil.css'
import { Link } from "react-router-dom";
import EditAdminModal from "../../Modal/User_modal/EditAdminmodal";
import { AuthContext } from "../../context/PupilContext";
import usersLogo from '../../Image/photo_people.jpg'
import { useState } from "react";
import { LoginHooks } from "../../Hooks/LoginHooks";
import Delete from "../../Modal/Delete/Delete";
import WeekEmotion from "../../Modal/WeekEmotion/WeekEmotion";


function Pupil() {
  const {setWeekFullName,weekEmotion, setWeekEmotion, user,position, setUsers,pupilEmotion, ageRange, genders, pupilClass, theme, editAdminModal, setEditAdminModal, setEditUser, setDeleteId } = useContext(AuthContext)

  const [userEmotion, setUserEmotion] = useState([])
  const [deleteUser, setDeleteUser] = useState(false)

  const {token} = LoginHooks()
const [config, setConfig] = useState()
  useEffect(() => {
    const configs =  {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    setConfig(configs)
  }, [token]);

  let page = 1;
  const style = document.createElement('style');
  style.innerHTML = `
  .people_list::-webkit-scrollbar-thumb {
    background-color: ${theme};
  }
`;
  document.head.appendChild(style);

  const handleScroll = async (e) => {
    const element = e.target;

    if (Math.floor(element.scrollHeight - element.scrollTop) - 1 < element.clientHeight) {
        page = page++
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

        let page = 1;
    let allData = [];

    while (true) {
      const response = await axios.get(`https://smartsafeschoolback.tadi.uz/api/users/pupils?page=${page}`,{ params,
          headers: {
            Authorization: `Bearer ${token}`,
          }
         });
      const data = response?.data?.results;
      
      allData = allData.concat(data);
      page++;
      setUsers(allData)
    }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPupils();
  }, [ ageRange, pupilClass, genders, pupilEmotion,setUsers,token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = user?.map(async (id) => {
          const response = await axios.get(`https://smartsafeschoolback.tadi.uz/api/users/emotions/${id.id}/for_week/`,config);
          return response.data;
        });

        const presentPupilsData = await Promise.all(promises);
        setUserEmotion(presentPupilsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user,config]);

  const clickItem = (evt) => {
    setEditUser(evt)
    if (position === 'admin') {
      setEditAdminModal(true)
    }
  }

  const deleteItem = (id) => {
    if (position === 'admin') {
      setDeleteId(id)
      setDeleteUser(true)
    }
  };

  const anotherFunction = (item) => {
      setDeleteId(item?.id)
        setWeekFullName(item?.full_name)

  }

  const weekItem = () => {
    setWeekEmotion(true)
  };

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

          <li key={item.id}>
            <div className="people_create">
            <svg className="people_delete" onClick={() => deleteItem(item.id)} width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="1" fill={theme}/>
<path d="M14 18V24C14 24.552 13.552 25 13 25C12.448 25 12 24.552 12 24V18C12 17.448 12.448 17 13 17C13.552 17 14 17.448 14 18ZM21 17C20.448 17 20 17.448 20 18V24C20 24.552 20.448 25 21 25C21.552 25 22 24.552 22 24V18C22 17.448 21.552 17 21 17ZM17 17C16.448 17 16 17.448 16 18V24C16 24.552 16.448 25 17 25C17.552 25 18 24.552 18 24V18C18 17.448 17.552 17 17 17ZM21.333 8.377C20.451 8.193 19.96 6.968 20.144 6.086L14.941 5C14.757 5.883 13.818 6.81 12.937 6.625L7.409 5.526L7 7.484L26.591 11.583L27 9.625L21.333 8.377ZM26 13V29H8V13H26ZM24 27V15H10V27H24Z" fill="#F5F5F5"/>
</svg>

<svg className="perople_update" onClick={() => clickItem(item)} width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="1" fill={theme}/>
<path d="M17 5C10.373 5 5 10.373 5 17C5 23.627 10.373 29 17 29C23.627 29 29 23.627 29 17C29 10.373 23.627 5 17 5ZM12 22L13.006 17.964L16.112 21.069L12 22ZM17.16 20.121L13.958 16.919L19.799 11L23 14.2L17.16 20.121Z" fill="#F5F5F5"/>
</svg>

            </div>
            <div className="people_item" style={{ borderColor: theme }}>
            <Link className='people_link' onClick={() => { weekItem(); anotherFunction(item); }}>
              <img className='people_image' style={{objectFit: "cover"}} src={item?.main_image ?  item?.main_image : usersLogo} alt="People-img" width='100' height='100' />
              <p className="name_item" style={{ borderColor: theme }}>
                <div className="peaoleName">
                <span className='people_heading'>Фамилия и имя</span>
                <span className='people_name'>{item.full_name ? item.full_name : "Отсутствует"}</span>
                </div>
              </p>
              <p className="timePeople" style={{ borderColor: theme }}>
                <div>
                <span className='people_heading'>Пришел: {newFirstTime === '00:00' ? "--:--" : newFirstTime}</span>
                <span className='people_heading'>Ушел: {newLastTime === newFirstTime ? "--:--" : newLastTime}</span>
                </div>
              </p>
              <p style={{ borderColor: theme }}>
                <div>
                <span className='people_heading'>Класс</span>
                <span className='people_name'>{item.pupil_class ? item.pupil_class : "Отсутствует"}</span>
                </div>
              </p>
              <p style={{ borderColor: theme }}>
                <div>
                <span className='people_heading'>Возраст</span>
                <span className='people_name'>{age ? age : "0"}</span>
                </div>
              </p>
              <p style={{ borderColor: theme }}
                className={`emotions ${userEmotion[index]?.[formattedDate]?.last && userEmotion[index]?.[formattedDate]?.last?.emotion ? userEmotion[index]?.[formattedDate]?.last?.emotion === "neutral" ? "Нейтраль" : userEmotion[index]?.[formattedDate]?.last?.emotion === "happy" ? "Веселье" : userEmotion[index]?.[formattedDate]?.last?.emotion === "angry" ? "Злость" : userEmotion[index]?.[formattedDate]?.last?.emotion === "sad" ? "Грусть" : userEmotion[index]?.[formattedDate]?.last?.emotion === "fear" ? "Страх" : userEmotion[index]?.[formattedDate]?.last?.emotion === "surprise" ? "Удивление" : "Отсутствует" : 'Отсутствует'}`}
              >
                <div>
                <span className='people_heading'> {userEmotion[index]?.[formattedDate]?.last && userEmotion[index]?.[formattedDate]?.last?.emotion ? userEmotion[index]?.[formattedDate]?.last?.emotion === "neutral" ? "Нейтраль" : userEmotion[index]?.[formattedDate]?.last?.emotion === "happy" ? "Веселье" : userEmotion[index]?.[formattedDate]?.last?.emotion === "angry" ? "Злость" : userEmotion[index]?.[formattedDate]?.last?.emotion === "sad" ? "Грусть" : userEmotion[index]?.[formattedDate]?.last?.emotion === "fear" ? "Страх" : userEmotion[index]?.[formattedDate]?.last?.emotion === "surprise" ? "Удивление" : "Отсутствует" : 'Отсутствует'} </span>


<span className='people_name'>{userEmotion[index]?.[formattedDate]?.last && userEmotion[index]?.[formattedDate]?.last.confidence ? userEmotion[index]?.[formattedDate]?.last.confidence : "0"} %</span>
                </div>
              </p>
            </Link>
            </div>
          </li>
        )
        // })
      })}
      <EditAdminModal editAdminModal={editAdminModal} setEditAdminModal={setEditAdminModal} />
      <Delete deleteUser={deleteUser} setDeleteUser={setDeleteUser}/>
      <WeekEmotion weekEmotion={weekEmotion} setWeekEmotion={setWeekEmotion}/>
    </ul>
  )
}

export default Pupil;