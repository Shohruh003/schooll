import { useContext, useEffect } from "react";
import "./pupil.css";
import { Link } from "react-router-dom";
import EditAdminModal from "../../Modal/User_modal/EditAdminmodal";
import { AuthContext } from "../../context/PupilContext";
import usersLogo from "../../Image/photo_people.jpg";
import { useState } from "react";
import Delete from "../../Modal/Delete/Delete";
import WeekEmotion from "../../Modal/WeekEmotion/WeekEmotion";
import WeekTime from "../../Modal/WeekTime/WeekTime";
import api from "../Api/api";

function Pupil() {
  const {
    weekTime,
    setWeekTime,
    setWeekFullName,
    weekEmotion,
    setWeekEmotion,
    user,
    position,
    setUsers,
    pupilEmotion,
    ageRange,
    genders,
    pupilClass,
    theme,
    editAdminModal,
    setEditAdminModal,
    setEditUser,
    setDeleteId,
    setWeekMainImage
  } = useContext(AuthContext);

  const [userEmotion, setUserEmotion] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);

  const mock = [
    {
      id: 1,
      age: 15,
      className: "7-B",
      emotions: "neutral",
      confidence: '78',
      come: "09:00",
      exit: '14:00',
      displayName: "Madina Isaqova",
      photo: "https://react-declarative-playground.github.io/image/4.jpg",
    },
    {
      id: 2,
      age: 10,
      className: "5-B",
      emotions: "sad",
      confidence: '90',
      come: "09:00",
      exit: '14:00',
      displayName: "Sadiriddin Alisherov",
      photo: "https://react-declarative-playground.github.io/image/5.jpg",
    },
    {
      id: 3,
      age: 15,
      className: "7-V",
      emotions: "angry",
      confidence: '74',
      come: "09:00",
      exit: '14:00',
      displayName: "Bekmirza Ahmedov",
      photo: "https://react-declarative-playground.github.io/image/6.jpg",
    },
    {
      id: 4,
      age: 15,
      className: "8-A",
      emotions: "happy",
      confidence: '95',
      come: "09:00",
      exit: '14:00',
      displayName: "Shohruh Azimov",
      photo: "https://react-declarative-playground.github.io/image/1.jpg",
    },
    {
      id: 5,
      age: 15,
      className: "7-V",
      emotions: "neutral",
      confidence: '100',
      come: "09:00",
      exit: '14:00',
      displayName: "Mirsolihov Miraziz",
      number: 5,
      photo: "https://react-declarative-playground.github.io/image/2.jpg",
    },
    {
      id: 6,
      age: 15,
      className: "7-V",
      emotions: "neutral",
      confidence: '99',
      come: "09:00",
      exit: '14:00',
      displayName: "Noila Ergasheva",
      number: 6,
      photo: "https://react-declarative-playground.github.io/image/3.jpg",
    },
  ];

  let page = 1;
  const style = document.createElement("style");
  style.innerHTML = `
  .people_list::-webkit-scrollbar-thumb {
    background-color: ${theme};
  }
`;
  document.head.appendChild(style);

  const handleScroll = async (e) => {
    const element = e.target;

    if (
      Math.floor(element.scrollHeight - element.scrollTop) - 1 <
      element.clientHeight
    ) {
      page = page++;
    }
  };

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
          params.gender = genders.join(",");
        }
        if (pupilEmotion) {
          params.filter_by_emotion = pupilEmotion;
        }

        let page = 1;
        let allData = [];

        while (true) {
          const response = await api.get(`/users/pupils?page=${page}`, {
            params,
          });
          const data = response?.data?.results;

          allData = allData.concat(data);
          page++;
          setUsers(allData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPupils();
  }, [ageRange, pupilClass, genders, pupilEmotion, setUsers]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = user?.map(async (id) => {
          const response = await api.get(`/users/emotions/${id.id}/for_week/`);
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
    setEditUser(evt);
    if (position === "admin") {
      setEditAdminModal(true);
    }
  };

  const deleteItem = (id) => {
    if (position === "admin") {
      setDeleteId(id);
      setDeleteUser(true);
    }
  };

  const anotherFunction = (item) => {
    setDeleteId(item?.id);
    setWeekFullName(item?.full_name);
  };

  const weekItem = () => {
    setWeekEmotion(true);
  };

  const handleWeekTime = () => {
    setWeekTime(true);
  };

  const anotherWeekTime = (item) => {
    setDeleteId(item?.id);
    setWeekFullName(item?.full_name);
    setWeekMainImage(item?.main_image)
  };

  const isPsycholog = () => {
    const currentPath = window.location.pathname;
    return currentPath.endsWith("/psychologist/pupil");
  };
  return (
    // <ul
    //   onScroll={(e) => handleScroll(e)}
    //   className="people_list"
    //   style={{ "--scrollbar-thumb": theme }}
    // >
    //   {mock?.map((item) => {
    //     return (
    //       <li key={item.id}>
    //         {isPsycholog() ? (
    //           <div></div>
    //         ) : (
    //           <div className="people_create">
    //             <svg
    //               className="people_delete"
    //               onClick={() => deleteItem(item.id)}
    //               width="25"
    //               height="25"
    //               viewBox="0 0 35 35"
    //               fill="none"
    //               xmlns="http://www.w3.org/2000/svg"
    //             >
    //               <rect width="35" height="35" rx="1" fill={theme} />
    //               <path
    //                 d="M14 18V24C14 24.552 13.552 25 13 25C12.448 25 12 24.552 12 24V18C12 17.448 12.448 17 13 17C13.552 17 14 17.448 14 18ZM21 17C20.448 17 20 17.448 20 18V24C20 24.552 20.448 25 21 25C21.552 25 22 24.552 22 24V18C22 17.448 21.552 17 21 17ZM17 17C16.448 17 16 17.448 16 18V24C16 24.552 16.448 25 17 25C17.552 25 18 24.552 18 24V18C18 17.448 17.552 17 17 17ZM21.333 8.377C20.451 8.193 19.96 6.968 20.144 6.086L14.941 5C14.757 5.883 13.818 6.81 12.937 6.625L7.409 5.526L7 7.484L26.591 11.583L27 9.625L21.333 8.377ZM26 13V29H8V13H26ZM24 27V15H10V27H24Z"
    //                 fill="#F5F5F5"
    //               />
    //             </svg>

    //             <svg
    //               className="perople_update"
    //               onClick={() => clickItem(item)}
    //               width="25"
    //               height="25"
    //               viewBox="0 0 35 35"
    //               fill="none"
    //               xmlns="http://www.w3.org/2000/svg"
    //             >
    //               <rect width="35" height="35" rx="1" fill={theme} />
    //               <path
    //                 d="M17 5C10.373 5 5 10.373 5 17C5 23.627 10.373 29 17 29C23.627 29 29 23.627 29 17C29 10.373 23.627 5 17 5ZM12 22L13.006 17.964L16.112 21.069L12 22ZM17.16 20.121L13.958 16.919L19.799 11L23 14.2L17.16 20.121Z"
    //                 fill="#F5F5F5"
    //               />
    //             </svg>
    //           </div>
    //         )}
    //         <div className="people_item" style={{ borderColor: theme }}>
    //           <Link className="people_link">
    //             <img
    //               onClick={() => clickItem(item)}
    //               className="people_image"
    //               style={{ objectFit: "cover" }}
    //               src={item?.photo ? item?.photo : usersLogo}
    //               alt="People-img"
    //               width="100"
    //               height="100"
    //             />
    //             <p className="name_item" style={{ borderColor: theme }}>
    //               <div className="peaoleName">
    //                 <span className="people_heading">Фамилия и имя</span>
    //                 <span className="people_name">
    //                   {item.displayName ? item.displayName : "Отсутствует"}
    //                 </span>
    //               </div>
    //             </p>
    //             <p
    //               className="timePeople"
    //               style={{ borderColor: theme }}
    //               onClick={() => {
    //                 handleWeekTime();
    //                 anotherWeekTime(item);
    //               }}
    //             >
    //               <div>
    //                 <span className="people_heading">
    //                   Пришел:{" "}
    //                   {item.come === "00:00" ? "--:--" : item.come}
    //                 </span>
    //                 <span className="people_heading">
    //                   Ушел:{" "}
    //                   {item.exit === item.come ? "--:--" : item.exit}
    //                 </span>
    //               </div>
    //             </p>
    //             <p style={{ borderColor: theme }}>
    //               <div>
    //                 <span className="people_heading">Класс</span>
    //                 <span className="people_name">
    //                   {item.className ? item.className : "Отсутствует"}
    //                 </span>
    //               </div>
    //             </p>
    //             <p style={{ borderColor: theme }}>
    //               <div>
    //                 <span className="people_heading">Возраст</span>
    //                 <span className="people_name">{item.age ? item.age : "0"}</span>
    //               </div>
    //             </p>
    //             <p
    //               onClick={() => {
    //                 weekItem();
    //                 anotherFunction(item);
    //               }}
    //               style={{ borderColor: theme }}
    //               className={`emotions ${
    //                 item.emotions ===
    //                     "neutral"
    //                     ? "Нейтраль"
    //                     : item.emotions ===
    //                       "happy"
    //                     ? "Веселье"
    //                     : item.emotions ===
    //                       "angry"
    //                     ? "Злость"
    //                     : item.emotions ===
    //                       "sad"
    //                     ? "Грусть"
    //                     : item.emotions ===
    //                       "fear"
    //                     ? "Страх"
    //                     : item.emotions ===
    //                       "surprise"
    //                     ? "Удивление"
    //                     : "Отсутствует"
    //               }`}
    //             >
    //               <div>
    //                 <span className="people_heading people_emotions">
    //                   {" "}
    //                   {item.emotions ===
    //                       "neutral"
    //                       ? "Нейтраль"
    //                       : item.emotions
    //                           ?.emotion === "happy"
    //                       ? "Веселье"
    //                       : item.emotions
    //                           ?.emotion === "angry"
    //                       ? "Злость"
    //                       : item.emotions
    //                           ?.emotion === "sad"
    //                       ? "Грусть"
    //                       : item.emotions
    //                           ?.emotion === "fear"
    //                       ? "Страх"
    //                       : item.emotions
    //                           ?.emotion === "surprise"
    //                       ? "Удивление"
    //                       : "Отсутствует"}{" "}
    //                 </span>

    //                 <span className="people_name">
    //                   {item.confidence
    //                     ? item.confidence
    //                     : "0"}{" "}
    //                   %
    //                 </span>
    //               </div>
    //             </p>
    //           </Link>
    //         </div>
    //       </li>
    //     );
    //     // })
    //   })}
    //   <EditAdminModal
    //     editAdminModal={editAdminModal}
    //     setEditAdminModal={setEditAdminModal}
    //   />
    //   <Delete deleteUser={deleteUser} setDeleteUser={setDeleteUser} />
    //   <WeekEmotion weekEmotion={weekEmotion} setWeekEmotion={setWeekEmotion} />
    //   <WeekTime weekTime={weekTime} setWeekTime={setWeekTime} />
    // </ul>

    
    <ul
      onScroll={(e) => handleScroll(e)}
      className="people_list"
      style={{ "--scrollbar-thumb": theme }}
    >
      {user?.map((item, index) => {
        const date = item.birth_date;
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const newDate = new Date();
        const formattedDate = newDate.toISOString().substring(0, 10);
        const firstTime = userEmotion[index]?.[formattedDate]?.first?.time;
        const lastTime = userEmotion[index]?.[formattedDate]?.last?.time;

        const dateTime1 = new Date(firstTime ? firstTime : "0");
        const dateTime2 = new Date(lastTime ? lastTime : "0");

        const newFirstTime = dateTime1.toLocaleTimeString("uz-UZ", {
          hour: "numeric",
          minute: "numeric",
        });
        const newLastTime = dateTime2.toLocaleTimeString("uz-UZ", {
          hour: "numeric",
          minute: "numeric",
        });
        return (
          <li key={item.id}>
            {isPsycholog() ? (
              <div></div>
            ) : (
              <div className="people_create">
                <svg
                  className="people_delete"
                  onClick={() => deleteItem(item.id)}
                  width="25"
                  height="25"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="35" height="35" rx="1" fill={theme} />
                  <path
                    d="M14 18V24C14 24.552 13.552 25 13 25C12.448 25 12 24.552 12 24V18C12 17.448 12.448 17 13 17C13.552 17 14 17.448 14 18ZM21 17C20.448 17 20 17.448 20 18V24C20 24.552 20.448 25 21 25C21.552 25 22 24.552 22 24V18C22 17.448 21.552 17 21 17ZM17 17C16.448 17 16 17.448 16 18V24C16 24.552 16.448 25 17 25C17.552 25 18 24.552 18 24V18C18 17.448 17.552 17 17 17ZM21.333 8.377C20.451 8.193 19.96 6.968 20.144 6.086L14.941 5C14.757 5.883 13.818 6.81 12.937 6.625L7.409 5.526L7 7.484L26.591 11.583L27 9.625L21.333 8.377ZM26 13V29H8V13H26ZM24 27V15H10V27H24Z"
                    fill="#F5F5F5"
                  />
                </svg>

                <svg
                  className="perople_update"
                  onClick={() => clickItem(item)}
                  width="25"
                  height="25"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="35" height="35" rx="1" fill={theme} />
                  <path
                    d="M17 5C10.373 5 5 10.373 5 17C5 23.627 10.373 29 17 29C23.627 29 29 23.627 29 17C29 10.373 23.627 5 17 5ZM12 22L13.006 17.964L16.112 21.069L12 22ZM17.16 20.121L13.958 16.919L19.799 11L23 14.2L17.16 20.121Z"
                    fill="#F5F5F5"
                  />
                </svg>
              </div>
            )}
            <div className="people_item" style={{ borderColor: theme }}>
              <Link className="people_link">
                <img
                  onClick={() => clickItem(item)}
                  className="people_image"
                  style={{ objectFit: "cover" }}
                  src={item?.main_image ? item?.main_image : usersLogo}
                  alt="People-img"
                  width="100"
                  height="100"
                />
                <p className="name_item" style={{ borderColor: theme }}>
                  <div className="peaoleName">
                    <span className="people_heading">Фамилия и имя</span>
                    <span className="people_name">
                      {item.full_name ? item.full_name : "Отсутствует"}
                    </span>
                  </div>
                </p>
                <p
                  className="timePeople"
                  style={{ borderColor: theme }}
                  onClick={() => {
                    handleWeekTime();
                    anotherWeekTime(item);
                  }}
                >
                  <div>
                    <span className="people_heading">
                      Пришел:{" "}
                      {newFirstTime === "00:00" ? "09:00" : newFirstTime}
                    </span>
                    <span className="people_heading">
                      Ушел:{" "}
                      {newLastTime === newFirstTime ? "14:00" : newLastTime}
                    </span>
                  </div>
                </p>
                <p style={{ borderColor: theme }}>
                  <div>
                    <span className="people_heading">Класс</span>
                    <span className="people_name">
                      {item.pupil_class ? item.pupil_class : "1-A"}
                    </span>
                  </div>
                </p>
                <p style={{ borderColor: theme }}>
                  <div>
                    <span className="people_heading">Возраст</span>
                    <span className="people_name">{age ? age : "12"}</span>
                  </div>
                </p>
                <p
                  onClick={() => {
                    weekItem();
                    anotherFunction(item);
                  }}
                  style={{ borderColor: theme }}
                  className={`emotions ${
                    userEmotion[index]?.[formattedDate]?.last &&
                    userEmotion[index]?.[formattedDate]?.last?.emotion
                      ? userEmotion[index]?.[formattedDate]?.last?.emotion ===
                        "neutral"
                        ? "Нейтраль"
                        : userEmotion[index]?.[formattedDate]?.last?.emotion ===
                          "happy"
                        ? "Веселье"
                        : userEmotion[index]?.[formattedDate]?.last?.emotion ===
                          "angry"
                        ? "Злость"
                        : userEmotion[index]?.[formattedDate]?.last?.emotion ===
                          "sad"
                        ? "Грусть"
                        : userEmotion[index]?.[formattedDate]?.last?.emotion ===
                          "fear"
                        ? "Страх"
                        : userEmotion[index]?.[formattedDate]?.last?.emotion ===
                          "surprise"
                        ? "Удивление"
                        : "Нейтраль"
                      : "Нейтраль"
                  }`}
                >
                  <div>
                    <span className="people_heading people_emotions">
                      {" "}
                      {userEmotion[index]?.[formattedDate]?.last &&
                      userEmotion[index]?.[formattedDate]?.last?.emotion
                        ? userEmotion[index]?.[formattedDate]?.last?.emotion ===
                          "neutral"
                          ? "Нейтраль"
                          : userEmotion[index]?.[formattedDate]?.last
                              ?.emotion === "happy"
                          ? "Веселье"
                          : userEmotion[index]?.[formattedDate]?.last
                              ?.emotion === "angry"
                          ? "Злость"
                          : userEmotion[index]?.[formattedDate]?.last
                              ?.emotion === "sad"
                          ? "Грусть"
                          : userEmotion[index]?.[formattedDate]?.last
                              ?.emotion === "fear"
                          ? "Страх"
                          : userEmotion[index]?.[formattedDate]?.last
                              ?.emotion === "surprise"
                          ? "Удивление"
                          : "Нейтраль"
                        : "Нейтраль"}{" "}
                    </span>

                    <span className="people_name">
                      {userEmotion[index]?.[formattedDate]?.last &&
                      userEmotion[index]?.[formattedDate]?.last.confidence
                        ? userEmotion[index]?.[formattedDate]?.last.confidence
                        : "100"}{" "}
                      %
                    </span>
                  </div>
                </p>
              </Link>
            </div>
          </li>
        );
        // })
      })}
      <EditAdminModal
        editAdminModal={editAdminModal}
        setEditAdminModal={setEditAdminModal}
      />
      <Delete deleteUser={deleteUser} setDeleteUser={setDeleteUser} />
      <WeekEmotion weekEmotion={weekEmotion} setWeekEmotion={setWeekEmotion} />
      <WeekTime weekTime={weekTime} setWeekTime={setWeekTime} />
    </ul>
  );
}

export default Pupil;
