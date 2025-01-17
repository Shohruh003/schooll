import { useContext, useEffect, useState } from "react";
import "./teacherList.css";
import { Link } from "react-router-dom";
import EditAdminModal from "../../Modal/User_modal/EditAdminmodal";
import { AuthContext } from "../../context/PupilContext";
import usersLogo from "../../Image/photo_people.jpg";
import Delete from "../../Modal/Delete/Delete";
import WeekEmotion from "../../Modal/WeekEmotion/WeekEmotion";
import WeekTime from "../../Modal/WeekTime/WeekTime";
import api from "../Api/api";

function TeacherList() {
  const {
    weekTime,
    setWeekTime,
    setWeekFullName,
    weekEmotion,
    setWeekEmotion,
    genders,
    position,
    setOriginalUsers,
    pupilClass,
    pupilEmotion,
    teacher,
    setTeacher,
    theme,
    editAdminModal,
    setEditAdminModal,
    setDeleteId,
    setEditUser,
    setWeekMainImage
  } = useContext(AuthContext);
  const [deleteUser, setDeleteUser] = useState(false);
  const style = document.createElement("style");
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
          params.gender = genders.join(",");
        }

        if (pupilEmotion) {
          params.filter_by_emotion = pupilEmotion;
        }

        if (pupilClass) {
          params.search = pupilClass;
        }

        const response = await api.get("/users/users/?status=teacher", {
          params,
        });
        setTeacher(response.data.results);
        setOriginalUsers(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPupils();
  }, [pupilClass, genders, pupilEmotion, setTeacher, setOriginalUsers]);

  const clickItem = (evt) => {
    setEditUser(evt);
    if (position === "admin") {
      setEditAdminModal(true);
    }
  };
  return (
    <ul className="teacher_list" style={{ "--scrollbar-thumb": theme }}>
      {teacher?.map((item) => {
        const emotions = item?.todays_emotions
          ? item?.todays_emotions
          : {
              emotions: [
                {
                  emotions: "Отсутствует",
                  confidence: 0,
                  create_date: "0",
                },
              ],
            };
        const emotionsCome =
          emotions && emotions[0]
            ? emotions[0]
            : {
                emotions: "Отсутствует",
                confidence: 0,
                create_date: "0",
              };
        const emotionsWent =
          emotions && emotions.length > 1
            ? emotions[emotions.length - 1]
            : {
                emotions: "Отсутствует",
                confidence: 0,
                create_date: "0",
              };
        const dateCome = emotionsCome.create_date;

        const comeDateTime = new Date(dateCome);
        const comeHours = comeDateTime.getHours().toString().padStart(2, "0");
        const comeMinutes = comeDateTime
          .getMinutes()
          .toString()
          .padStart(2, "0");
        const comeClock = `${comeHours}:${comeMinutes}`;

        const dateWent = emotionsWent.create_date;
        const wentDateTime = new Date(dateWent);
        const wentHours = wentDateTime.getHours().toString().padStart(2, "0");
        const wentMinutes = wentDateTime
          .getMinutes()
          .toString()
          .padStart(2, "0");
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
          return currentPath.endsWith("/psychologist/teacher");
        };
        return (
          <li key={item.id} className="techers_item">
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
              <Link className="teacher_link">
                <img
                  onClick={() => clickItem(item)}
                  className="teacher_image"
                  style={{ objectFit: "cover" }}
                  src={item?.main_image ? item?.main_image : usersLogo}
                  alt="teacher of the img"
                  width="100"
                  height="100"
                />
                <p className="name_item" style={{ borderColor: theme }}>
                  <div>
                    <span className="teacher_heading">Фамилия и имя</span>
                    <span className="teacher_name">
                      {item.full_name ? item.full_name : "Отсутствует"}
                    </span>
                  </div>
                </p>
                <p
                  className="timeTeacher"
                  style={{ borderColor: theme }}
                  onClick={() => {
                    handleWeekTime();
                    anotherWeekTime(item);
                  }}
                >
                  <div>
                    <span className="teacher_heading">
                      Пришел: {comeClock === "00:00" ? "09:00" : comeClock}
                    </span>
                    <span className="teacher_heading">
                      Ушел: {wentClock === "00:00" ? "18:00" : wentClock}
                    </span>
                  </div>
                </p>
                <p
                  onClick={() => {
                    weekItem();
                    anotherFunction(item);
                  }}
                  style={{ borderColor: theme }}
                  className={`emotions ${
                    firstEmotionWithMaxConfidence &&
                    firstEmotionWithMaxConfidence.emotions
                      ? firstEmotionWithMaxConfidence.emotions === "neutral"
                        ? "Нейтраль"
                        : firstEmotionWithMaxConfidence.emotions === "happy"
                        ? "Веселье"
                        : firstEmotionWithMaxConfidence.emotions === "angry"
                        ? "Злость"
                        : firstEmotionWithMaxConfidence.emotions === "sad"
                        ? "Грусть"
                        : firstEmotionWithMaxConfidence.emotions === "fear"
                        ? "Страх"
                        : firstEmotionWithMaxConfidence.emotions === "surprise"
                        ? "Удивление"
                        : "Нейтраль"
                      : "Нейтраль"
                  }`}
                >
                  <div>
                    <span className="people_heading">
                      {" "}
                      {firstEmotionWithMaxConfidence &&
                      firstEmotionWithMaxConfidence.emotions
                        ? firstEmotionWithMaxConfidence.emotions === "neutral"
                          ? "Нейтраль"
                          : firstEmotionWithMaxConfidence.emotions === "happy"
                          ? "Веселье"
                          : firstEmotionWithMaxConfidence.emotions === "angry"
                          ? "Злость"
                          : firstEmotionWithMaxConfidence.emotions === "sad"
                          ? "Грусть"
                          : firstEmotionWithMaxConfidence.emotions === "fear"
                          ? "Страх"
                          : firstEmotionWithMaxConfidence.emotions ===
                            "surprise"
                          ? "Удивление"
                          : "Нейтраль"
                        : "Нейтраль"}{" "}
                    </span>
                    <span className="people_name">
                      {firstEmotionWithMaxConfidence &&
                      firstEmotionWithMaxConfidence.emotions
                        ? firstEmotionWithMaxConfidence.confidence
                        : "100"}{" "}
                      %
                    </span>
                  </div>
                </p>
              </Link>
            </div>
          </li>
        );
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

export default TeacherList;
