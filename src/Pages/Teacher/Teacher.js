import React, { useContext, useEffect, useState, useCallback } from "react";
import "./teacher.css";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../context/PupilContext";
import { DecodeHooks } from "../../Hooks/DecodeHook";
import Notification from "../../Modal/Notification/Notification";
import TeacherPupils from "../../components/TeacherPupils/TeacherPupils";
import usersLogo from "../../Image/photo_people.jpg";
import api from "../../components/Api/api";
import Report from "../../Modal/Report/Report";

function Teacher(props) {
  const { isActive } = props;
  const {
    setTeacherPupils,
    setUsers,
    originalUsers,
    genders,
    theme,
    setTheme,
    setNotification,
    notificationCount,
    setNotificationCount,
    pupilsClass,
    pupilEmotion,
    setPupilsClass,
    modal,
    setModal,
    teach,
    depres,
    teacherPupils,
    setDepres,
    setTeach,
    classes,
    setClasses,
    setOriginalUsers,
  } = useContext(AuthContext);
  const { decode } = DecodeHooks();
  const [pupilMissing, setPupilMissing] = useState();
  const [teachClass, setTeachClass] = useState();
  const [test, setTest] = useState();
  const [report, setReport] = useState(false);
  const style = document.createElement("style");
  style.innerHTML = `
  .teacher_list::-webkit-scrollbar-thumb {
    background-color: ${theme};
  }
`;
  document.head.appendChild(style);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await api.get(`/users/pupils/classes/`);
        setClasses(response.data);
        setDepres(Math.round(response.data.classes[test]?.sad_avg));
        const presentPupilIds =
          response.data?.classes[test]?.absent_pupils?.pupils;
        if (Array.isArray(presentPupilIds)) {
          const promises = presentPupilIds.map(async (id) => {
            const response1 = await api.get(`/users/pupils/${id.id}`);
            return response1.data;
          });
          const presentPupilsData = await Promise.all(promises);
          setPupilMissing(presentPupilsData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchParents();
  }, [decode, test, setClasses, setDepres]);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await api.get(`/users/users/${decode}/`);
        setTest(response.data?.pupil_class[0]);
        setTeach(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchParents();
  }, [decode, setTeach]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await api.get(
          `/notification/notification/${decode}/get_messages_by_user/`
        );
        setNotification(response.data.messages);
        setNotificationCount(response.data.messages.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotification();
  }, [decode, setNotification, setNotificationCount]);

  const applyDefaultTheme = useCallback(() => {
    setTheme("#81B37A");
  }, [setTheme]);

  useEffect(() => {
    const applyTheme = () => {
      const body = document.body;
      const panelHeading = document.querySelector(".panel_heading");
      const dockaAdmin = document.querySelector(".adminBoard_header");
      const headerIcons = document.querySelectorAll(".header_icon circle");
      const headerLinks = document.querySelectorAll(".header-link");
      const adminPanel = document.querySelector(".admin_panel");
      const itemButtons = document.querySelectorAll(".item_button");
      const ageSearch = document.querySelectorAll(".ageSearch");
      const smsCount = document.querySelector(".sms_count");
      const panelButton = document.querySelector(".panel_button");

      if (theme === "#ffbe98") {
        body.style.backgroundColor = "#fafafa";
        panelHeading.style.backgroundColor = "#ffbe98";
        dockaAdmin.style.color = "#ffbe98";
        headerLinks.forEach((e) => {
          e.style.borderColor = "#ffbe98";

          e.addEventListener("mouseover", () => {
            e.style.backgroundColor = "rgba(255, 190, 152,0.25)";
          });

          e.addEventListener("mouseout", () => {
            e.style.backgroundColor = "";
          });
        });
        adminPanel.style.borderColor = "#ffbe98";
        itemButtons.forEach((e) => {
          e.style.borderColor = "#ffbe98";
        });
        smsCount.style.backgroundColor = "#ffbe98";
        headerIcons.forEach((e) => {
          e.setAttribute("fill", "#ffbe98");
        });
        ageSearch.forEach((e) => {
          e.style.borderColor = "#ffbe98";
        });
        panelButton.style.backgroundColor = "#ffbe98";
      } else if (theme === "#81B37A") {
        body.style.backgroundColor = "#E4F0E2";
        panelHeading.style.backgroundColor = "#ACCAA8";
        dockaAdmin.style.color = "#81B37A";
        headerIcons.forEach((e) => {
          e.setAttribute("fill", "#ACCAA8");
        });
        headerLinks.forEach((e) => {
          e.style.borderColor = "#81B37A";

          e.addEventListener("mouseover", () => {
            e.style.backgroundColor = "#9BC196";
          });

          e.addEventListener("mouseout", () => {
            e.style.backgroundColor = "";
          });
        });
        adminPanel.style.borderColor = "#81B37A";
        itemButtons.forEach((e) => {
          e.style.borderColor = "#81B37A";
          e.style.backgroundColor = "transparent";
        });
        smsCount.style.backgroundColor = "#81B37A";
        ageSearch.forEach((e) => {
          e.style.borderColor = "#81B37A";
        });
        panelButton.style.backgroundColor = "#81B37A";
      }
    };

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      applyDefaultTheme();
    }

    applyTheme();
  }, [theme, applyDefaultTheme, setTheme]);

  const changeTheme = () => {
    const newTheme = theme === "#81B37A" ? "#ffbe98" : "#81B37A";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // const handleSearch = (event) => {
  //   const searchTerm = event.target.value;
  //   setTeacherPupils(searchTerm);
  // };
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    const filteredUsers = originalUsers.filter((item) =>
      item.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(searchTerm === "" ? originalUsers : filteredUsers);
    setTeacherPupils(searchTerm === "" ? originalUsers : filteredUsers);
  };
  const handleGenderChange = async (event) => {
    var MaleCheckboxChecked = document.getElementById("maleCheckbox");
    var FemaleCheckboxChecked = document.getElementById("femaleCheckbox");
    var maleCheckboxChecked =
      MaleCheckboxChecked.checked === true ? true : false;
    var femaleCheckboxChecked =
      FemaleCheckboxChecked.checked === true ? true : false;

    var x = teacherPupils;
    if (
      (maleCheckboxChecked && femaleCheckboxChecked) ||
      (!maleCheckboxChecked && !femaleCheckboxChecked)
    ) {
      const pupilIds = teach?.pupils[teach?.pupil_class[0]]?.map(
        (pupil) => pupil.id
      );
      const promises = pupilIds?.map(async (id) => {
        const response = await api.get(`/users/pupils/${id}/`);
        return response.data;
      });

      const absentPupilsData = await Promise.all(promises);
      x = absentPupilsData;
    } else if (maleCheckboxChecked) {
      x = teacherPupils.filter((pupil) => pupil.gender === true);
    } else if (femaleCheckboxChecked) {
      x = teacherPupils.filter((pupil) => pupil.gender === false);
    }
    setTeacherPupils(x);
  };

  const handleEmotionChange = async (event) => {
    const selectedEmotion = event.target.value;
    const pupilIds = teach?.pupils[teach?.pupil_class[0]]?.map(
      (pupil) => pupil.id
    );
    const promises = pupilIds?.map(async (id) => {
      const response = await api.get(`/users/pupils/${id}/`);
      return response.data;
    });
    const absentPupilsData = await Promise.all(promises);
    var x = absentPupilsData;
    switch (selectedEmotion) {
      case "happy":
        x = x.filter(
          (pupil) =>
            pupil.emotions?.[pupil?.emotions?.length - 1]?.emotions === "happy"
        );
        setTeacherPupils(x);
        break;
      case "neutral":
        x = x.filter(
          (pupil) =>
            pupil.emotions?.[pupil?.emotions?.length - 1]?.emotions ===
            "neutral"
        );
        setTeacherPupils(x);
        break;
      case "sad":
        x = x.filter(
          (pupil) =>
            pupil.emotions?.[pupil?.emotions?.length - 1]?.emotions === "sad"
        );
        setTeacherPupils(x);
        break;
      case "angry":
        x = x.filter(
          (pupil) =>
            pupil.emotions?.[pupil?.emotions?.length - 1]?.emotions === "angry"
        );
        setTeacherPupils(x);
        break;
      case "fear":
        x = x.filter(
          (pupil) =>
            pupil.emotions?.[pupil?.emotions?.length - 1]?.emotions === "fear"
        );
        setTeacherPupils(x);
        break;
      case "surprise":
        x = x.filter(
          (pupil) =>
            pupil.emotions?.[pupil?.emotions?.length - 1]?.emotions ===
            "surprise"
        );
        setTeacherPupils(x);
        break;
      default:
        setTeacherPupils(x);
        break;
    }
  };
  const handleModal = () => {
    try {
      setModal(true);
      const response = api.get(
        `/notification/notification/${decode}/get_messages_by_user/`
      );
      setNotification(response.data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    api
      .get(`/users/users/${decode}/teacher_pupils`)
      .then((response) => {
        setTeachClass(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [decode]);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const pupilIds = teach?.pupils[teach?.pupil_class[0]]?.map(
          (pupil) => pupil.id
        );
        if (Array.isArray(pupilIds)) {
          const promises = pupilIds.map(async (id) => {
            const response = await api.get(`/users/pupils/${id}/`);
            return response.data;
          });

          const absentPupilsData = await Promise.all(promises);
          setTeacherPupils(absentPupilsData);
          setOriginalUsers(absentPupilsData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData1();
  }, [setOriginalUsers, setTeacherPupils, teach]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await api.get(`/users/pupils/classes/`);
        setDepres(
          Math.round(
            response1.data.classes[pupilsClass ? pupilsClass : test]?.sad_avg
          )
        );

        const params = {};

        if (genders.length > 0) {
          params.gender = genders.join(",");
        }

        if (pupilEmotion) {
          params.filter_by_emotion = pupilEmotion;
        }
        const pupilIds = teach?.pupils[pupilsClass ? pupilsClass : test]?.map(
          (pupil) => pupil.id
        );

        const promises1 = pupilIds?.map(async (id) => {
          const response2 = await api.get(`/users/pupils/${id}/`);
          return response2.data;
        });

        const absentPupilsData = await Promise.all(promises1);
        setTeacherPupils(absentPupilsData);
        setOriginalUsers(absentPupilsData);

        const presentPupilIds =
          classes?.classes[pupilsClass ? pupilsClass : test]?.absent_pupils?.id;

        if (presentPupilIds && Array.isArray(presentPupilIds)) {
          const promises2 = presentPupilIds.map(async (id) => {
            const response3 = await api.get(`/users/pupils/${id}`);
            return response3.data;
          });
          const presentPupilsData = await Promise.all(promises2);
          setPupilMissing(presentPupilsData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [
    pupilsClass,
    genders,
    pupilEmotion,
    teach,
    classes,
    setDepres,
    setOriginalUsers,
    setTeacherPupils,
    test,
  ]);

  const onPupilClass = (evt) => {
    const pupilClassValue = evt?.target?.value;
    setPupilsClass(pupilClassValue);
    localStorage.setItem("pupilClass", pupilClassValue);
  };

  const teachPupilsCount =
    teach?.pupils[pupilsClass ? pupilsClass : test]?.length;

  return (
    <div className="admin_page">
      <div className="container">
        <div className="admin">
          <div div className="header">
            <Link to="/">
              <svg
                className="site-logo"
                width="467"
                height="50"
                viewBox="0 0 467 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="467" height="50" fill={theme} />
                <path
                  d="M27.8945 14.0791H41.7178V17.3818H31.6055V24.6182H41.7178V27.9209H31.6055V40H27.8945V14.0791Z"
                  fill="white"
                />
                <path
                  d="M63.5678 29.7393V36.9941C63.5678 37.5755 63.7657 37.8662 64.1615 37.8662C64.5697 37.8662 65.2068 37.5632 66.0727 36.957V39.0166C65.3057 39.5114 64.6872 39.8454 64.2172 40.0186C63.7595 40.2041 63.2771 40.2969 62.7699 40.2969C61.3227 40.2969 60.4691 39.7279 60.2094 38.5898C58.7745 39.7031 57.2468 40.2598 55.6264 40.2598C54.4389 40.2598 53.4493 39.8701 52.6576 39.0908C51.866 38.2992 51.4701 37.3096 51.4701 36.1221C51.4701 35.0459 51.8536 34.0872 52.6205 33.2461C53.3998 32.3926 54.5007 31.7184 55.9232 31.2236L60.2465 29.7393V28.8301C60.2465 26.7767 59.2198 25.75 57.1664 25.75C55.3233 25.75 53.5297 26.7025 51.7855 28.6074V24.915C53.0967 23.3688 54.9831 22.5957 57.4447 22.5957C59.2878 22.5957 60.766 23.0781 61.8793 24.043C62.2504 24.3522 62.5844 24.7666 62.8812 25.2861C63.1781 25.7933 63.3637 26.3066 63.4379 26.8262C63.5245 27.3333 63.5678 28.3044 63.5678 29.7393ZM60.2465 36.623V31.5576L57.9828 32.4297C56.8324 32.8874 56.016 33.3512 55.5336 33.8213C55.0635 34.279 54.8285 34.8542 54.8285 35.5469C54.8285 36.252 55.0512 36.8271 55.4965 37.2725C55.9542 37.7178 56.5417 37.9404 57.2592 37.9404C58.3354 37.9404 59.3311 37.5013 60.2465 36.623Z"
                  fill="white"
                />
                <path
                  d="M89.4627 36.0107V39.3506C87.768 39.9814 86.1105 40.2969 84.49 40.2969C81.8182 40.2969 79.6844 39.5052 78.0887 37.9219C76.5053 36.3385 75.7137 34.2171 75.7137 31.5576C75.7137 28.8734 76.4868 26.7087 78.033 25.0635C79.5792 23.4183 81.6141 22.5957 84.1375 22.5957C85.0158 22.5957 85.8012 22.6823 86.4939 22.8555C87.199 23.0163 88.0649 23.3255 89.0916 23.7832V27.3828C87.3846 26.2943 85.8012 25.75 84.3416 25.75C82.8201 25.75 81.5708 26.2881 80.5936 27.3643C79.6163 28.4281 79.1277 29.7887 79.1277 31.4463C79.1277 33.1904 79.6535 34.5758 80.7049 35.6025C81.7687 36.6292 83.1974 37.1426 84.991 37.1426C86.2898 37.1426 87.7804 36.7653 89.4627 36.0107Z"
                  fill="white"
                />
                <path
                  d="M115.469 31.7617H103.464C103.551 33.3945 104.095 34.6934 105.097 35.6582C106.111 36.623 107.416 37.1055 109.012 37.1055C111.238 37.1055 113.292 36.4128 115.172 35.0273V38.3301C114.133 39.0228 113.1 39.5176 112.073 39.8145C111.059 40.1113 109.865 40.2598 108.492 40.2598C106.612 40.2598 105.091 39.8701 103.928 39.0908C102.765 38.3115 101.831 37.2663 101.126 35.9551C100.433 34.6315 100.087 33.1038 100.087 31.3721C100.087 28.7744 100.823 26.6654 102.295 25.0449C103.767 23.4121 105.678 22.5957 108.029 22.5957C110.292 22.5957 112.098 23.3874 113.446 24.9707C114.795 26.554 115.469 28.6755 115.469 31.335V31.7617ZM103.538 29.7393H112.129C112.043 28.391 111.64 27.3519 110.923 26.6221C110.206 25.8923 109.241 25.5273 108.029 25.5273C106.816 25.5273 105.821 25.8923 105.041 26.6221C104.274 27.3519 103.773 28.391 103.538 29.7393Z"
                  fill="white"
                />
                <path
                  d="M145.42 14.0791H149.131V40H145.42V14.0791Z"
                  fill="white"
                />
                <path
                  d="M162.52 39.9629V14.0791H171.259C174.785 14.0791 177.574 14.611 179.627 15.6748C181.681 16.7262 183.314 18.2786 184.526 20.332C185.738 22.3854 186.344 24.6243 186.344 27.0488C186.344 28.7806 186.01 30.4382 185.342 32.0215C184.674 33.6048 183.722 34.9964 182.485 36.1963C181.223 37.4333 179.757 38.3672 178.087 38.998C177.11 39.3815 176.213 39.6413 175.397 39.7773C174.58 39.901 173.022 39.9629 170.721 39.9629H162.52ZM170.87 17.3818H166.231V36.6602H170.981C172.836 36.6602 174.277 36.5365 175.304 36.2891C176.331 36.0293 177.184 35.7077 177.865 35.3242C178.557 34.9284 179.188 34.446 179.757 33.877C181.588 32.0215 182.503 29.6774 182.503 26.8447C182.503 24.0615 181.563 21.7917 179.683 20.0352C178.99 19.3796 178.192 18.8415 177.289 18.4209C176.399 18.0003 175.551 17.722 174.747 17.5859C173.943 17.4499 172.651 17.3818 170.87 17.3818Z"
                  fill="white"
                />
                <path
                  d="M205.003 29.127L202.182 27.4199C200.414 26.3438 199.152 25.2861 198.397 24.2471C197.655 23.1956 197.284 21.9896 197.284 20.6289C197.284 18.5879 197.989 16.9303 199.399 15.6562C200.822 14.3822 202.665 13.7451 204.929 13.7451C207.093 13.7451 209.079 14.3512 210.885 15.5635V19.7754C209.017 17.9818 207.007 17.085 204.854 17.085C203.642 17.085 202.646 17.3695 201.867 17.9385C201.088 18.4951 200.698 19.2126 200.698 20.0908C200.698 20.8701 200.983 21.5999 201.552 22.2803C202.121 22.9606 203.042 23.6719 204.316 24.4141L207.155 26.084C210.322 27.9642 211.905 30.3639 211.905 33.2832C211.905 35.3613 211.206 37.0498 209.808 38.3486C208.423 39.6475 206.617 40.2969 204.39 40.2969C201.83 40.2969 199.498 39.5114 197.395 37.9404V33.2275C199.399 35.7633 201.719 37.0312 204.353 37.0312C205.516 37.0312 206.481 36.7096 207.248 36.0664C208.027 35.4108 208.417 34.5944 208.417 33.6172C208.417 32.0339 207.279 30.5371 205.003 29.127Z"
                  fill="white"
                />
                <path
                  d="M248.183 29.127L245.363 27.4199C243.594 26.3438 242.332 25.2861 241.578 24.2471C240.836 23.1956 240.464 21.9896 240.464 20.6289C240.464 18.5879 241.17 16.9303 242.58 15.6562C244.002 14.3822 245.845 13.7451 248.109 13.7451C250.274 13.7451 252.259 14.3512 254.065 15.5635V19.7754C252.197 17.9818 250.187 17.085 248.035 17.085C246.823 17.085 245.827 17.3695 245.047 17.9385C244.268 18.4951 243.879 19.2126 243.879 20.0908C243.879 20.8701 244.163 21.5999 244.732 22.2803C245.301 22.9606 246.223 23.6719 247.497 24.4141L250.336 26.084C253.502 27.9642 255.086 30.3639 255.086 33.2832C255.086 35.3613 254.387 37.0498 252.989 38.3486C251.603 39.6475 249.797 40.2969 247.571 40.2969C245.01 40.2969 242.679 39.5114 240.576 37.9404V33.2275C242.58 35.7633 244.899 37.0312 247.534 37.0312C248.697 37.0312 249.661 36.7096 250.428 36.0664C251.208 35.4108 251.597 34.5944 251.597 33.6172C251.597 32.0339 250.459 30.5371 248.183 29.127Z"
                  fill="white"
                />
                <path
                  d="M279.106 36.0107V39.3506C277.412 39.9814 275.754 40.2969 274.134 40.2969C271.462 40.2969 269.328 39.5052 267.732 37.9219C266.149 36.3385 265.357 34.2171 265.357 31.5576C265.357 28.8734 266.131 26.7087 267.677 25.0635C269.223 23.4183 271.258 22.5957 273.781 22.5957C274.66 22.5957 275.445 22.6823 276.138 22.8555C276.843 23.0163 277.709 23.3255 278.735 23.7832V27.3828C277.028 26.2943 275.445 25.75 273.985 25.75C272.464 25.75 271.215 26.2881 270.237 27.3643C269.26 28.4281 268.771 29.7887 268.771 31.4463C268.771 33.1904 269.297 34.5758 270.349 35.6025C271.412 36.6292 272.841 37.1426 274.635 37.1426C275.934 37.1426 277.424 36.7653 279.106 36.0107Z"
                  fill="white"
                />
                <path
                  d="M290.492 14.0791H293.869V25.1748C295.279 23.4554 297.029 22.5957 299.12 22.5957C300.258 22.5957 301.278 22.8802 302.181 23.4492C303.084 24.0182 303.752 24.8037 304.185 25.8057C304.63 26.8076 304.853 28.2982 304.853 30.2773V40H301.476V29.4424C301.476 28.193 301.167 27.1911 300.548 26.4365C299.942 25.6696 299.138 25.2861 298.136 25.2861C297.394 25.2861 296.695 25.4779 296.039 25.8613C295.384 26.2448 294.66 26.8818 293.869 27.7725V40H290.492V14.0791Z"
                  fill="white"
                />
                <path
                  d="M325.33 22.8926C327.928 22.8926 330.086 23.7337 331.805 25.416C333.525 27.0859 334.385 29.1888 334.385 31.7246C334.385 34.1862 333.513 36.2334 331.768 37.8662C330.024 39.4867 327.829 40.2969 325.181 40.2969C322.621 40.2969 320.481 39.4743 318.762 37.8291C317.042 36.1715 316.182 34.1058 316.182 31.6318C316.182 29.1331 317.048 27.055 318.78 25.3975C320.524 23.7275 322.707 22.8926 325.33 22.8926ZM325.144 25.9355C323.524 25.9355 322.194 26.4674 321.155 27.5312C320.116 28.5951 319.596 29.9495 319.596 31.5947C319.596 33.2275 320.128 34.5635 321.192 35.6025C322.256 36.6292 323.623 37.1426 325.293 37.1426C326.95 37.1426 328.305 36.623 329.356 35.584C330.42 34.5326 330.952 33.1904 330.952 31.5576C330.952 29.9372 330.402 28.5951 329.301 27.5312C328.2 26.4674 326.814 25.9355 325.144 25.9355Z"
                  fill="white"
                />
                <path
                  d="M353.897 22.8926C356.494 22.8926 358.653 23.7337 360.372 25.416C362.092 27.0859 362.951 29.1888 362.951 31.7246C362.951 34.1862 362.079 36.2334 360.335 37.8662C358.591 39.4867 356.395 40.2969 353.748 40.2969C351.188 40.2969 349.048 39.4743 347.328 37.8291C345.609 36.1715 344.749 34.1058 344.749 31.6318C344.749 29.1331 345.615 27.055 347.347 25.3975C349.091 23.7275 351.274 22.8926 353.897 22.8926ZM353.711 25.9355C352.091 25.9355 350.761 26.4674 349.722 27.5312C348.683 28.5951 348.163 29.9495 348.163 31.5947C348.163 33.2275 348.695 34.5635 349.759 35.6025C350.823 36.6292 352.19 37.1426 353.86 37.1426C355.517 37.1426 356.872 36.623 357.923 35.584C358.987 34.5326 359.519 33.1904 359.519 31.5576C359.519 29.9372 358.968 28.5951 357.867 27.5312C356.766 26.4674 355.381 25.9355 353.711 25.9355Z"
                  fill="white"
                />
                <path
                  d="M374.374 14.0791H377.751V40H374.374V14.0791Z"
                  fill="white"
                />
              </svg>
            </Link>

            <div className="domIcon">
              <label className="search_label" style={{ borderColor: theme }}>
                <input
                  className="search_input header_icon"
                  type="text"
                  placeholder="Искать..."
                  onChange={handleSearch}
                />
                <svg
                  className="search_icon"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="25" cy="25" r="25" fill={theme} />
                  <path
                    d="M28.97 30.031C27.491 31.269 25.586 32.016 23.509 32.016C18.812 32.016 15 28.204 15 23.508C15 18.812 18.812 15 23.509 15C28.204 15 32.017 18.812 32.017 23.508C32.017 25.586 31.27 27.492 30.032 28.969L34.781 33.719C34.927 33.865 35 34.057 35 34.25C35 34.837 34.463 35 34.25 35C34.058 35 33.866 34.927 33.719 34.78L28.97 30.031ZM23.509 16.501C19.641 16.501 16.502 19.641 16.502 23.508C16.502 27.375 19.641 30.515 23.509 30.515C27.375 30.515 30.516 27.375 30.516 23.508C30.516 19.641 27.375 16.501 23.509 16.501Z"
                    fill="white"
                  />
                </svg>
              </label>

              <button className="header_icon languageIcon">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="25" cy="25" r="25" fill="#ffbe98" />
                  <g clip-path="url(#clip0_1_2406)">
                    <path
                      d="M26.144 21.171C26.109 21.105 26.486 21.069 26.553 21.069C26.627 21.078 26.357 21.521 26.144 21.171ZM23.992 18.099L24.1 18.068C24.164 18.123 24.028 18.163 24.049 18.204C24.135 18.359 24.07 18.452 24.057 18.536C24.043 18.621 23.953 18.584 23.908 18.629C23.855 18.695 24.166 18.704 24.17 18.714C24.181 18.747 23.795 18.803 23.866 18.885C23.962 19.021 24.69 18.69 24.574 18.709C24.799 18.596 24.603 18.584 24.477 18.519C24.434 18.304 24.398 17.972 24.264 17.839L24.352 17.737C24.146 17.438 23.992 18.099 23.992 18.099ZM37 25C37 31.627 31.627 37 25 37C18.372 37 13 31.627 13 25C13 18.373 18.372 13 25 13C31.627 13 37 18.373 37 25ZM28.69 19.629C28.684 19.483 28.5 19.345 28.308 19.598C28.173 19.772 28.197 20.037 28.124 20.155C28.02 20.33 28.691 20.494 28.691 20.329C28.716 20.052 29.423 20.266 29.561 20.304C29.809 20.373 30.204 20.078 29.772 19.923C29.417 19.793 29.23 19.654 29.198 19.4C29.198 19.4 29.386 19.224 29.304 19.234C29.086 19.261 28.69 20.02 28.69 19.629ZM34.986 25C34.986 23.965 34.809 22.92 34.629 22.368C34.571 22.194 34.44 22.056 34.27 21.99C34.014 21.89 32.933 22.587 32.77 22.244C32.663 22.015 32.446 22.39 32.198 22.252C32.078 22.186 31.744 21.737 31.593 21.792C31.284 21.903 32.067 22.756 32.281 22.868C32.482 22.716 33.133 22.403 33.273 22.83C33.541 23.634 32.536 24.515 32.022 24.979C31.254 25.673 31.398 24.53 30.875 24.127C30.6 23.916 30.603 23.467 30.325 23.312C30.201 23.242 29.632 22.587 29.637 22.499L29.62 22.665C29.526 22.736 29.326 22.397 29.305 22.344C29.305 22.639 29.785 23.109 29.944 23.345C30.215 23.75 30.36 24.34 30.692 24.671C30.87 24.849 31.55 25.585 31.727 25.569C31.92 25.552 32.53 25.111 32.638 25.136C33.282 25.288 31.122 28.341 30.917 28.719C30.748 29.036 31.055 29.82 31.03 30.195C31.001 30.628 30.66 30.768 30.337 31.004C29.991 31.257 30.072 31.749 29.781 31.929C29.264 32.247 28.892 33.282 28.158 33.277C27.942 33.276 27.018 33.637 26.897 33.284C26.803 33.028 26.677 32.834 26.544 32.581C26.414 32.333 26.529 32.076 26.371 31.857C26.262 31.705 25.896 31.36 25.863 31.18C25.861 31.025 25.98 30.554 26.143 30.472C26.372 30.355 26.187 30.014 26.159 29.816C26.111 29.462 25.892 29.17 25.629 28.965C25.24 28.666 25.441 28.428 25.532 28.001C25.532 27.797 25.408 27.529 25.134 27.609C24.57 27.773 24.741 27.169 24.33 27.196C24.034 27.217 23.792 27.405 23.517 27.488C23.171 27.592 22.817 27.406 22.475 27.363C21.068 27.185 20.609 25.577 20.976 24.417C21.013 24.227 20.862 23.875 20.928 23.728C21.086 23.376 21.408 22.981 21.69 22.714C21.848 22.564 22.051 22.602 22.237 22.485C22.524 22.304 22.528 21.932 22.809 21.704C23.209 21.379 23.755 21.386 24.277 21.316C24.555 21.279 25.613 21.05 25.78 21.256C25.78 21.294 25.971 21.86 25.761 21.828C26.194 21.851 26.811 22.577 27.222 22.407C27.433 22.319 27.356 21.671 27.789 21.984C28.051 22.172 29.225 22.256 29.469 22.053C29.619 21.929 29.703 21.123 29.521 21.032C29.637 21.147 28.91 21.156 28.842 21.13C28.722 21.086 28.61 21.244 28.417 21.155C28.533 21.21 27.771 20.801 28.199 20.488C28.02 20.619 27.853 20.451 27.66 20.595C27.527 20.703 27.722 20.775 27.532 20.869C27.23 21.022 27.002 20.344 26.888 20.267C26.772 20.191 25.874 19.561 26.118 19.972L26.907 20.757C26.868 20.782 26.7 20.471 26.7 20.698C26.753 20.563 26.72 21.277 26.596 21.045C26.541 20.956 26.686 20.906 26.602 20.777C26.602 20.692 26.374 20.609 26.33 20.551C26.205 20.396 25.873 20.054 25.693 19.972C25.643 19.949 24.929 20.059 24.869 20.082C24.799 20.18 24.739 20.283 24.69 20.393C24.542 20.448 24.403 20.519 24.271 20.607L24.114 20.96C24.046 21.021 23.349 21.251 23.345 21.26C23.374 21.185 22.858 21.089 22.892 20.939C22.93 20.774 23.105 20.259 23.06 20.071C23.012 19.874 24.134 20.355 24.206 19.836C24.235 19.611 24.252 19.349 23.893 19.311C23.961 19.319 24.588 19.065 24.692 18.951C24.838 18.783 25.173 18.509 25.416 18.509C25.7 18.509 25.639 18.096 25.77 17.894C25.901 17.947 25.7 18.27 25.857 18.401C25.847 18.298 26.302 18.458 26.346 18.434C26.45 18.38 27.03 18.412 26.94 18.14C26.84 17.863 26.991 17.945 27.121 17.887C27.099 17.896 27.461 17.268 27.523 17.474C27.48 17.262 27.102 17.548 26.97 17.537C26.665 17.513 26.794 17.017 26.909 16.872C26.998 16.757 26.666 16.616 26.662 16.836C26.656 17.165 26.35 17.463 26.421 17.9C26.529 18.559 25.686 17.741 25.612 17.786C25.332 17.956 25.103 17.572 25.248 17.342C25.396 17.107 25.753 17.118 25.9 16.866C26.004 16.688 26.125 16.481 26.285 16.346C26.82 15.897 26.968 16.256 27.501 16.305C28.022 16.353 27.677 16.429 27.605 16.629C27.536 16.819 27.891 16.887 28.014 16.728C28.084 16.636 28.243 16.405 28.312 16.234C28.401 16.012 29.213 16.037 28.646 15.698C28.272 15.475 26.642 15.026 25.55 15.026C25.314 15.026 25.149 15.289 24.969 15.438C24.613 15.733 23.701 16.312 23.194 16.136C22.675 15.957 21.564 16.796 21.386 16.802C21.321 16.806 21.39 16.168 21.744 16.121C21.591 16.144 22.991 15.414 22.953 15.262C22.907 15.082 20.154 16.084 20.277 16.285C20.336 16.377 20.576 16.377 20.261 16.579C20.081 16.688 19.889 17.38 19.72 17.38C19.215 17.601 19.183 16.945 18.621 17.789L17.727 18.149C16.399 19.56 15.48 21.347 15.147 23.332C15.134 23.411 15.481 23.558 15.526 23.612C15.638 23.746 15.638 24.324 15.693 24.513C15.831 24.991 16.172 25.257 16.433 25.692C16.587 25.951 16.843 26.606 16.762 26.878C16.87 26.7 17.832 27.693 18.008 27.9C18.422 28.387 18.741 28.977 18.069 29.459C17.852 29.615 18.399 30.588 18.117 30.827L17.756 30.92C17.4 31.139 17.561 31.676 17.777 31.902C19.595 33.803 22.157 34.989 24.997 34.989C30.514 34.989 34.986 30.517 34.986 25ZM23.479 18.643C23.604 18.588 23.772 18.59 23.79 18.423C23.805 18.275 23.834 18.377 23.87 18.323C23.905 18.27 23.803 18.185 23.76 18.177C23.696 18.163 23.652 18.246 23.611 18.281L23.539 18.3L23.471 18.387L23.479 18.435L23.392 18.541C23.307 18.625 23.394 18.68 23.479 18.643Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_2406">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(13 13)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>

              <button className="header_icon themeIcon" onClick={changeTheme}>
                <svg
                  className="fon_icon header_icon"
                  width="55"
                  height="55"
                  viewBox="0 0 55 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="27.5" cy="27.5" r="27.5" fill="#ffbe98" />
                  <g clip-path="url(#clip0_147_1139)">
                    <path
                      d="M18.7263 38.373C23.9822 38.8084 22.0996 33.2248 26.9625 33.1732L29.0686 34.9309C29.5934 41.2766 21.8327 42.6917 18.7263 38.373ZM34.8424 30.2204C36.4775 27.6549 41.5421 19.0497 41.5421 19.0497C41.9455 18.3358 41.0494 17.5911 40.4238 18.1181C40.4238 18.1181 32.8934 24.6654 30.6716 26.7405C28.9162 28.3814 28.9082 29.1307 28.3398 31.8361L30.2648 33.4402C32.8166 32.3918 33.5511 32.2497 34.8424 30.2204ZM21.0936 34.6617C21.8567 33.3623 23.0965 31.2505 26.1891 30.924C26.6864 28.5326 26.8846 27.1427 29.1075 25.0665C30.6808 23.5975 34.7657 20.0145 37.1524 17.9291C36.0066 15.3991 32.4075 13.3194 27.7818 13.3572C20.1918 13.4202 14.0822 19.6192 14.143 27.2126C14.1693 30.5481 15.3816 33.5961 17.3742 35.9611C19.2282 36.4526 20.0967 36.3598 21.0936 34.6617ZM29.0594 16.5174C30.3221 16.5105 31.3568 17.5269 31.3694 18.7896C31.374 20.0534 30.3588 21.0916 29.0938 21.0996C27.8277 21.1099 26.793 20.0913 26.7861 18.8263C26.7712 17.559 27.7898 16.5277 29.0594 16.5174ZM22.1879 18.8102C23.4506 18.7988 24.4887 19.8151 24.4933 21.0824C24.507 22.3497 23.4849 23.3798 22.2245 23.3924C20.9572 23.4004 19.9225 22.3829 19.9145 21.1145C19.9042 19.8506 20.9194 18.8182 22.1879 18.8102ZM19.8928 25.6829C21.16 25.6749 22.1959 26.6936 22.2028 27.9574C22.2142 29.2224 21.1944 30.2582 19.9271 30.2663C18.661 30.2754 17.6297 29.2579 17.6229 27.9918C17.6103 26.7256 18.63 25.6955 19.8928 25.6829ZM31.3866 35.4592C31.4107 38.0247 30.376 39.7194 29.4593 40.7151L29.4066 40.7655C35.428 40.0883 39.7902 35.8339 36.5864 31.7261C35.0132 34.0716 33.6829 34.5242 31.3866 35.4592Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_147_1139">
                      <rect
                        width="27.5"
                        height="27.5"
                        fill="white"
                        transform="translate(14.1429 13.3571)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>

            <div className="adminBoard_header">
              <div className="admin_board">
                <p className="admin_boardHead">Доска</p>
                <button className="header_icon" onClick={handleModal}>
                  <svg
                    className=" header_icon"
                    width="57"
                    height="57"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="30" cy="30" r="30" fill="#ffbe98" />
                    <g clip-path="url(#clip0_147_1132)">
                      <path
                        d="M35.2069 19.5027C34.4019 19.0352 33.9044 18.1652 33.9069 17.2277V17.2239C33.9069 15.7589 32.7331 14.5714 31.2856 14.5714C29.8381 14.5714 28.6644 15.7589 28.6644 17.2239V17.2277C28.6669 18.1664 28.1694 19.0352 27.3644 19.5027C21.5294 22.8927 24.8819 34.1464 18.7856 36.1352V38.3214H43.7856V36.1352C37.6894 34.1464 41.0419 22.8927 35.2069 19.5027ZM31.2856 15.8214C31.9756 15.8214 32.5356 16.3827 32.5356 17.0714C32.5356 17.7614 31.9756 18.3214 31.2856 18.3214C30.5956 18.3214 30.0356 17.7614 30.0356 17.0714C30.0356 16.3827 30.5956 15.8214 31.2856 15.8214ZM35.0356 40.8214C35.0356 42.8189 33.2956 44.5714 31.3219 44.5714C29.3481 44.5714 27.5356 42.8189 27.5356 40.8214H35.0356ZM41.3044 25.1702C40.9969 23.2902 40.1381 20.5677 37.7831 18.2764L39.5281 16.4839C41.7781 18.6739 43.2456 21.5389 43.7719 24.7664L41.3044 25.1702ZM18.7856 24.7677C19.3119 21.5389 20.7794 18.6752 23.0294 16.4839L24.7744 18.2764C22.4194 20.5677 21.5594 23.2902 21.2531 25.1702L18.7856 24.7677Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_147_1132">
                        <rect
                          width="30"
                          height="30"
                          fill="white"
                          transform="translate(16.2856 14.5714)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span
                    className="sms_count"
                    style={
                      notificationCount
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {notificationCount}
                  </span>
                </button>
                <Link className="header_icon" to="/">
                  <svg
                    className="domIcons"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="25" cy="25" r="25" fill="#ffbe98" />
                    <path
                      d="M33 20.093L30 17.093V15H33V20.093ZM37 26H34V36H16V26H13L25 14L37 26ZM27 28H23V34H27V28Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </div>
              <p className="admin_boardSpan">Преподавателя</p>
            </div>
          </div>
          <div className="admin_inner">
            <div className="admin_header">
              <nav>
                <ul className="header-list">
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "header-active header-link" : "header-link"
                      }
                      activeClassName="active"
                      style={{ backgroundColor: isActive ? "#81B37A" : "" }}
                      to="pupil"
                    >
                      <svg
                        className="navLinkIcon"
                        width="120"
                        height="130"
                        viewBox="0 0 150 138"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M75 0L139.952 34.4933V103.48L75 137.973L10.0481 103.48V34.4933L75 0Z"
                          fill={theme}
                        />
                        <line
                          x1="140.233"
                          y1="34.4424"
                          x2="9.23302"
                          y2="103.442"
                          stroke="white"
                        />
                        <path
                          d="M114.381 86.5294C113.566 77.505 107.546 69 96.7586 69C85.971 69 79.9514 77.505 79.1359 86.5294C75.6102 86.8388 74 90.1313 74 93.9619C74 97.2525 75.8491 101.4 79.8869 103.132C85.4533 113.203 94.1755 114 96.7586 114C99.3417 114 108.064 113.203 113.63 103.132C117.668 101.398 119.517 97.2525 119.517 93.9619C119.517 90.1762 117.922 86.8406 114.381 86.5294ZM111.679 99.8606C111.212 100.016 110.825 100.346 110.6 100.781C106.037 109.568 98.8524 110.25 96.7586 110.25C94.6648 110.25 87.4807 109.568 82.9176 100.781C82.6919 100.348 82.305 100.018 81.8384 99.8606C77.1957 98.3062 76.9966 91.6781 78.8931 90.4631C79.2838 90.2137 79.8224 90.2119 80.1657 90.3638C81.4174 90.9112 82.8322 90.0094 82.8322 88.65L82.8702 87.5887C86.2897 86.8275 91.0841 82.3875 92.2847 80.0156C92.1538 81.6131 90.5948 86.1169 88.3474 87.6337C93.5591 87.6337 100.201 82.9331 102.922 78.5813C103.089 82.4831 106.932 86.1112 110.575 86.6644C110.639 87.3281 110.685 87.99 110.685 88.65C110.685 90.0056 112.098 90.9131 113.352 90.3638C113.619 90.2456 114.177 90.1762 114.624 90.4631C116.521 91.6781 116.322 98.3062 111.679 99.8606ZM105.293 92.4375C105.293 93.99 104.231 95.25 102.922 95.25C101.614 95.25 100.552 93.99 100.552 92.4375C100.552 90.885 101.614 89.625 102.922 89.625C104.231 89.625 105.293 90.885 105.293 92.4375ZM90.5948 95.25C89.2862 95.25 88.2241 93.99 88.2241 92.4375C88.2241 90.885 89.2862 89.625 90.5948 89.625C91.9034 89.625 92.9655 90.885 92.9655 92.4375C92.9655 93.99 91.9034 95.25 90.5948 95.25ZM91.069 100.875H102.448C102.448 100.875 100.997 105.289 96.7586 105.289C92.6753 105.289 91.069 100.875 91.069 100.875ZM129 100.875C123.726 102.369 121.951 98.8875 121.414 93.375C120.473 83.715 119.568 76.6387 113.731 77.8969C113.014 76.3144 112.138 74.7413 110.719 73.2525C112.375 71.1394 115.523 69 119.123 69C132.998 69 126.273 90.5456 126.273 95.25C126.273 98.0625 126.83 99.6056 129 100.875Z"
                          fill="white"
                        />
                        <path
                          d="M71.3583 41.698C70.6083 33.882 65.7375 28.538 58.4417 26.574C56.6208 26.082 52.9896 25.33 56.1667 21C46.0208 21 33.8146 29.47 32.6417 41.698C28.7687 42.028 27 45.54 27 49.626C27 53.136 29.0313 57.56 33.4667 59.408C39.5812 70.15 49.1625 71 52 71C54.8375 71 64.4188 70.15 70.5333 59.408C74.9688 57.558 77 53.136 77 49.626C77 45.588 75.2479 42.03 71.3583 41.698ZM68.3896 55.918C67.8771 56.084 67.4521 56.436 67.2042 56.9C62.1917 66.272 54.3 67 52 67C49.7 67 41.8083 66.272 36.7958 56.9C36.5479 56.438 36.1229 56.086 35.6104 55.918C30.5104 54.26 30.2917 47.19 32.375 45.894C32.8646 45.59 33.4812 45.662 33.7729 45.788C35.15 46.374 36.7021 45.406 36.7021 43.96C36.7021 41.922 37.0167 40.084 37.5979 38.446C39.8729 33.326 44.1 41.174 52 41.174C59.9021 41.174 64.1292 33.324 66.4021 38.448C66.9812 40.086 67.2979 41.924 67.2979 43.96C67.2979 45.41 68.8521 46.374 70.2271 45.788C70.5187 45.662 71.1354 45.588 71.625 45.894C73.7083 47.19 73.4896 54.26 68.3896 55.918ZM61.375 48C61.375 49.656 60.2083 51 58.7708 51C57.3333 51 56.1667 49.656 56.1667 48C56.1667 46.344 57.3333 45 58.7708 45C60.2083 45 61.375 46.344 61.375 48ZM45.2292 51C43.7917 51 42.625 49.656 42.625 48C42.625 46.344 43.7917 45 45.2292 45C46.6667 45 47.8333 46.344 47.8333 48C47.8333 49.656 46.6667 51 45.2292 51ZM45.75 57H58.25C58.25 57 56.6562 61.708 52 61.708C47.5146 61.708 45.75 57 45.75 57Z"
                          fill="white"
                        />
                      </svg>

                      <h4 className="navLinkName">Всего учеников</h4>
                      <span className="quantity">{teachPupilsCount}</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "header-active header-link" : "header-link"
                      }
                      activeClassName="active"
                      style={{ backgroundColor: isActive ? "#81B37A" : "" }}
                      to="#"
                    >
                      <svg
                        className="navLinkIcon"
                        width="120"
                        height="130"
                        viewBox="0 0 150 146"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#filter0_d_1_647)">
                          <path
                            d="M75 0L139.952 34.4933V103.48L75 137.973L10.0481 103.48V34.4933L75 0Z"
                            fill={theme}
                          />
                        </g>
                        <path
                          d="M93.002 61.0081C99.9077 61.0081 106.158 63.8033 110.679 68.3236C115.2 72.8439 117.996 79.0934 117.996 85.998H118V86.002H117.996C117.996 92.9066 115.2 99.1561 110.679 103.676C106.158 108.197 99.9077 110.992 93.002 110.992V111H92.998V110.992C86.0923 110.992 79.8418 108.197 75.3207 103.676C70.8038 99.152 68.0081 92.9066 68.0081 85.998H68V85.9939H68.0081C68.0081 79.0934 70.8038 72.8439 75.3248 68.3236C79.8459 63.8033 86.0964 61.0081 93.002 61.0081ZM79.0035 79.6752C78.5599 79.13 78.6413 78.3285 79.1866 77.885C79.7319 77.4415 80.5336 77.5229 80.9771 78.0681C81.0585 78.1698 81.1725 78.2756 81.3027 78.3855C81.9619 78.9266 82.9752 79.2887 84.0495 79.3457C85.1075 79.4026 86.194 79.1544 87.0201 78.4872C87.1869 78.3529 87.3497 78.1861 87.5084 77.9949C87.956 77.4497 88.7577 77.3683 89.303 77.8159C89.8483 78.2634 89.9297 79.0649 89.4821 79.6101C89.2257 79.9234 88.9368 80.2042 88.6234 80.4605C87.2643 81.5631 85.5511 81.974 83.9193 81.8886C82.3078 81.8032 80.7452 81.2254 79.6871 80.3588C79.4389 80.1594 79.207 79.9275 79.0035 79.6752ZM82.3363 97.5652C81.9985 98.1837 81.2294 98.4074 80.6109 98.0738C79.9923 97.7361 79.7685 96.9671 80.1022 96.3487C81.7707 93.289 84.3832 91.1082 87.3619 89.8225C89.6448 88.8379 92.1434 88.3741 94.5891 88.4473C97.0551 88.5205 99.4804 89.1308 101.596 90.2864C104.063 91.629 106.105 93.704 107.326 96.5196C107.603 97.1624 107.306 97.9111 106.663 98.1877C106.02 98.4644 105.271 98.1674 104.994 97.5245C104.018 95.2664 102.37 93.5983 100.384 92.516C98.6259 91.5558 96.5953 91.0472 94.524 90.9862C92.4364 90.9251 90.3081 91.3157 88.3711 92.1539C85.8888 93.228 83.7158 95.0345 82.3363 97.5652ZM96.522 79.6752C96.0785 79.13 96.1598 78.3285 96.7051 77.885C97.2504 77.4415 98.0521 77.5229 98.4956 78.0681C98.577 78.1698 98.691 78.2756 98.8212 78.3855C99.4804 78.9266 100.494 79.2887 101.568 79.3457C102.626 79.4026 103.713 79.1544 104.535 78.4872C104.701 78.3529 104.864 78.1861 105.023 77.9949C105.47 77.4497 106.272 77.3683 106.817 77.8159C107.363 78.2634 107.444 79.0649 106.996 79.6101C106.74 79.9234 106.451 80.2042 106.138 80.4605C104.779 81.5631 103.066 81.974 101.434 81.8886C99.8223 81.8032 98.2596 81.2254 97.2016 80.3588C96.9574 80.1594 96.7255 79.9275 96.522 79.6752ZM93.002 64.1858V64.1939H92.998L93.002 64.1858C86.9835 64.1858 81.5306 66.6311 77.5792 70.5817C73.6279 74.5284 71.1863 79.9804 71.1863 85.998H71.1944V86.002H71.1863C71.1863 92.0196 73.632 97.4716 77.5792 101.418C81.5306 105.369 86.9835 107.81 93.002 107.814V107.806H93.0061V107.814C99.0247 107.814 104.478 105.369 108.425 101.418C112.376 97.4676 114.818 92.0155 114.818 85.998H114.814V85.9939H114.818C114.818 79.9804 112.372 74.5284 108.425 70.5777C104.474 66.6311 99.0206 64.1858 93.002 64.1858Z"
                          fill="white"
                        />
                        <path
                          d="M48.0016 29C50.6279 28.9987 53.2288 29.5151 55.6554 30.5196C58.0821 31.5241 60.2871 32.9971 62.1443 34.8543C64.0016 36.7116 65.4746 38.9167 66.4794 41.3436C67.4841 43.7705 68.0009 46.3716 68 48.9984C68.0004 51.6249 67.4836 54.2257 66.4789 56.6524C65.4742 59.0791 64.0015 61.2841 62.1447 63.1415C60.288 64.9988 58.0836 66.4722 55.6574 67.4774C53.2313 68.4826 50.631 69 48.0049 69C45.3786 69.0021 42.7776 68.4866 40.3506 67.4829C37.9236 66.4792 35.7181 65.0069 33.8603 63.1503C32.0025 61.2936 30.5286 59.089 29.5231 56.6625C28.5176 54.2359 28 51.6349 28 49.0081C27.9974 46.3802 28.513 43.7775 29.5172 41.3491C30.5215 38.9206 31.9946 36.7141 33.8524 34.8557C35.7102 32.9973 37.9162 31.5235 40.3441 30.5187C42.7719 29.514 45.3741 28.9979 48.0016 29ZM38.7984 42.3692C38.6119 42.5783 38.352 42.7073 38.0727 42.7295C37.7934 42.7516 37.5164 42.665 37.2993 42.4878C37.0823 42.3106 36.942 42.0565 36.9077 41.7784C36.8735 41.5003 36.9478 41.2197 37.1153 40.9951C37.2901 40.7763 37.4864 40.5756 37.7013 40.396C38.7435 39.5986 40.007 39.1437 41.3181 39.0936C42.762 38.9866 44.1939 39.4207 45.3354 40.3114C45.6037 40.5313 45.8491 40.7779 46.0679 41.0472C46.1587 41.158 46.2269 41.2855 46.2684 41.4226C46.31 41.5597 46.3241 41.7036 46.3101 41.8462C46.296 41.9887 46.254 42.1271 46.1865 42.2534C46.119 42.3798 46.0272 42.4916 45.9165 42.5824C45.8058 42.6733 45.6782 42.7414 45.5412 42.783C45.4041 42.8246 45.2602 42.8387 45.1177 42.8247C44.9751 42.8106 44.8368 42.7686 44.7105 42.7011C44.5842 42.6335 44.4724 42.5418 44.3815 42.431C44.2538 42.2799 44.1097 42.1434 43.9518 42.024C43.2257 41.4752 42.3229 41.2133 41.4158 41.2882C40.5693 41.3112 39.7502 41.593 39.0686 42.0956C38.965 42.1768 38.8701 42.2685 38.7854 42.3692H38.7984ZM52.0807 42.3692C51.8986 42.5928 51.635 42.7349 51.3481 42.7642C51.0611 42.7935 50.7743 42.7076 50.5507 42.5254C50.327 42.3432 50.185 42.0796 50.1556 41.7926C50.1263 41.5057 50.2122 41.2188 50.3944 40.9951C50.5697 40.7807 50.766 40.5844 50.9804 40.409C52.0215 39.608 53.2848 39.1485 54.5972 39.0936C56.0421 38.9861 57.4753 39.4202 58.6177 40.3114C58.8853 40.5322 59.1306 40.7786 59.3502 41.0472C59.4411 41.158 59.5092 41.2855 59.5508 41.4226C59.5923 41.5597 59.6065 41.7036 59.5924 41.8462C59.5784 41.9887 59.5364 42.1271 59.4688 42.2534C59.4013 42.3798 59.3096 42.4916 59.1988 42.5824C59.0881 42.6733 58.9606 42.7414 58.8235 42.783C58.6864 42.8246 58.5425 42.8387 58.4 42.8247C58.2575 42.8106 58.1191 42.7686 57.9928 42.7011C57.8665 42.6335 57.7547 42.5418 57.6639 42.431C57.5394 42.2814 57.3997 42.145 57.2472 42.024C56.5184 41.467 55.609 41.2002 54.6949 41.2751C53.847 41.3023 53.0279 41.5887 52.3477 42.0956C52.2458 42.1777 52.1521 42.2692 52.0677 42.3692H52.0807ZM36.6238 53.5275C36.5471 53.4017 36.4968 53.2617 36.4759 53.1159C36.455 52.9701 36.4639 52.8216 36.5021 52.6793C36.5403 52.5371 36.607 52.4041 36.6981 52.2884C36.7893 52.1727 36.903 52.0767 37.0323 52.0063C37.1617 51.9359 37.304 51.8925 37.4506 51.8787C37.5972 51.8649 37.7451 51.8811 37.8853 51.9262C38.0255 51.9713 38.155 52.0445 38.2661 52.1412C38.3772 52.2379 38.4675 52.3562 38.5315 52.4888C39.6829 54.5651 41.4992 56.1936 43.6881 57.1123C45.347 57.8243 47.1413 58.1655 48.9457 58.1119C50.6934 58.0745 52.4081 57.6284 53.9526 56.8095C55.7116 55.8684 57.1001 54.3592 57.8918 52.5279C58.0049 52.261 58.2193 52.0501 58.4879 51.9414C58.7566 51.8327 59.0574 51.8352 59.3242 51.9483C59.591 52.0614 59.8019 52.2759 59.9106 52.5446C60.0192 52.8133 60.0167 53.1141 59.9036 53.381C58.9238 55.6578 57.2028 57.5362 55.0204 58.711C53.1756 59.6972 51.1249 60.2359 49.0336 60.2837C46.9109 60.3469 44.7999 59.9457 42.8482 59.1083C40.2187 57.995 38.04 56.0293 36.6628 53.5275H36.6238ZM48.0179 31.5495C43.3872 31.5477 38.9454 33.3857 35.6694 36.6591C32.3934 39.9326 30.5516 44.3734 30.549 49.0049C30.5525 53.6333 32.3924 58.0711 35.6646 61.3439C38.9368 64.6167 43.374 66.4569 48.0016 66.4603C52.6293 66.456 57.0661 64.615 60.3377 61.3416C63.6094 58.0682 65.4484 53.63 65.451 49.0016C65.4475 44.3741 63.608 39.9371 60.3364 36.6649C57.0647 33.3927 52.6284 31.5529 48.0016 31.5495H48.0179Z"
                          fill="white"
                        />
                      </svg>

                      <h4 className="navLinkName navLinkName1">
                        Уровень депрессии
                      </h4>
                      <span className="quantity">{depres ? depres : 0}%</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "header-active header-link" : "header-link"
                      }
                      activeClassName="active"
                      style={{ backgroundColor: isActive ? "#81B37A" : "" }}
                      to="#"
                    >
                      <svg
                        className="navLinkIcon"
                        width="120"
                        height="130"
                        viewBox="0 0 128 138"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#filter0_d_1_464)">
                          <path
                            d="M60 0L120 32.5V97.5L60 130L0 97.5V32.5L60 0Z"
                            fill={theme}
                          />
                        </g>
                        <path
                          d="M49.8901 73.1589V67.7747V61.387V57.5169C47.8444 57.9615 46.278 58.1652 44.921 58.177H44.9157H44.9105C44.1879 58.1753 43.605 58.1176 43.0222 57.9895C42.1833 57.803 41.4842 57.4899 40.8805 57.0343C40.8379 57.0019 40.8132 56.9564 40.8005 56.9024C40.3676 58.2286 40.1803 59.7184 40.3657 61.3934C40.7822 65.1566 44.8159 71.5415 49.8901 73.1589ZM67.9702 42.1H56.4581C56.4831 42.5803 56.5115 43.3311 56.5115 44.2671C56.5108 45.7552 56.4401 47.7091 56.165 49.7886C56.1321 50.0365 56.1011 50.3039 56.07 50.5788C56.5478 50.9704 56.9175 51.4754 57.1232 52.0622C57.663 53.6037 56.9063 55.2385 55.4087 56.0082C55.0842 57.8633 54.6244 59.6523 53.6229 61.0777C52.9926 61.9918 51.9522 62.7966 50.6381 63.0236V100.83C50.6381 103.134 52.7081 105 55.2599 105C57.8125 105 59.8825 103.134 59.8825 100.83V70.3823H61.6152V100.83C61.6152 103.134 63.6852 105 66.237 105C68.7896 105 70.8596 103.134 70.8596 100.83V49.404C71.1026 49.7548 71.3545 50.1795 71.6073 50.6884C71.7661 51.0082 71.925 51.358 72.0824 51.7499C73.1359 54.3855 74.0223 58.7083 74.0185 65.4568C74.0185 67.3166 73.9524 69.3593 73.8073 71.6039C73.7116 73.0911 74.9703 74.3681 76.6194 74.4544C76.6788 74.4578 76.7379 74.4591 76.7966 74.4591C78.3689 74.4595 79.6863 73.3518 79.7794 71.9183C79.9297 69.5799 80 67.4323 80 65.4571C79.985 55.2766 78.1828 49.6428 75.7255 46.2547C74.4978 44.5733 73.0611 43.4947 71.7336 42.8967C71.3542 42.7243 70.9908 42.5948 70.6457 42.4933C69.8263 42.2511 69.1287 42.1823 68.6547 42.1772C68.4352 42.1286 68.2068 42.1 67.9702 42.1ZM51.1118 59.6122C51.5279 59.0422 51.9025 58.0907 52.1727 56.9732C51.6325 57.1118 51.123 57.2363 50.6378 57.349V60.1195C50.7839 60.0045 50.935 59.8429 51.1118 59.6122Z"
                          fill="white"
                        />
                        <path
                          d="M60.7486 40.1782C65.3941 40.1782 69.16 36.7804 69.16 32.5891C69.16 28.3977 65.3941 25 60.7486 25C56.1031 25 52.3372 28.3977 52.3372 32.5891C52.3372 36.7804 56.1031 40.1782 60.7486 40.1782Z"
                          fill="white"
                        />
                        <path
                          d="M41.3605 56.5178V56.5172C41.9751 56.9809 42.6189 57.2049 43.1987 57.3344C43.7841 57.4622 44.3382 57.5007 44.9135 57.5024C47.1715 57.4822 50.0175 56.903 54.4599 55.6517C56.0349 55.2024 56.9082 53.6869 56.4106 52.2656C55.913 50.8446 54.233 50.0567 52.658 50.5056C48.5136 51.702 45.8784 52.1256 44.9135 52.1054C44.8832 52.1054 44.8619 52.1044 44.8361 52.1037C45.623 51.8666 47.5334 51.2928 49.8904 50.6021V50.514C50.139 50.3204 50.3888 50.1299 50.6381 49.9416V50.3835C51.2176 50.2145 51.8172 50.0401 52.4299 49.8634C52.6714 49.7942 52.9171 49.7501 53.1645 49.7261C53.175 49.6415 53.1847 49.5511 53.1956 49.4684C53.4517 47.5317 53.5208 45.6756 53.5208 44.2667C53.5208 43.4832 53.4999 42.8376 53.4793 42.3917C53.47 42.1917 53.461 42.0365 53.4539 41.9235C52.8116 41.9013 52.157 42.0625 51.5948 42.4271C51.5776 42.4386 51.0445 42.7843 50.2217 43.3469C49.1973 44.0475 47.7229 45.085 46.2242 46.2395C44.8694 47.2861 43.5 48.4171 42.3751 49.5578C41.811 50.1322 41.3037 50.7053 40.8734 51.3485C40.4637 52.0001 40.0322 52.7078 40.0027 53.8593C39.9638 54.5943 40.3452 55.564 41.008 56.2173C41.0106 56.2129 41.0132 56.2085 41.0158 56.2038C41.1201 56.3148 41.233 56.421 41.3605 56.5178Z"
                          fill="white"
                        />
                      </svg>

                      <h4 className="navLinkName">Посещаемость учеников</h4>
                      <span className="quantity">
                        {teachPupilsCount -
                          (pupilMissing?.length ? pupilMissing?.length : 0) >
                        0
                          ? teachPupilsCount -
                            (pupilMissing?.length ? pupilMissing?.length : 0)
                          : 0}
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <div>
                <Routes>
                  <Route path="/pupil" element={<TeacherPupils />} />
                </Routes>

                <ul
                  className="attendanceRes"
                  style={{ borderColor: theme, "--scrollbar-thumb": theme }}
                >
                  {pupilMissing?.map((item, index) => (
                    <li
                      key={index}
                      className="attendance_itemRes"
                      style={{ borderColor: theme }}
                    >
                      <Link className="attendance_linkRes">
                        <p className="attendance_nameRes">{item?.full_name}</p>
                        <img
                          className="attendance_avatarRes"
                          style={{ objectFit: "cover" }}
                          src={item?.main_image ? item?.main_image : usersLogo}
                          alt="Avatar"
                          width="50"
                          height="50"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="admin_panelInner">
              <div className="admin_panel">
                <h4 className="panel_heading">фильтрация</h4>

                <ul className="panel_list">
                  <li className="panel_item">
                    <div className="item_button search_danger">
                      <span>По полу</span>
                      <div onChange={handleGenderChange}>
                        <label htmlFor="maleCheckbox" className="radio_label">
                          Мальчик
                          <input
                            className="radio_button"
                            id="maleCheckbox"
                            type="checkbox"
                            value="true"
                          />
                        </label>
                        <label htmlFor="femaleCheckbox" className="radio_label">
                          Девочка
                          <input
                            className="radio_button"
                            id="femaleCheckbox"
                            type="checkbox"
                            value="false"
                          />
                        </label>
                      </div>
                    </div>
                  </li>

                  <li className="panel_item">
                    <select
                      className="item_button search_select"
                      onChange={handleEmotionChange}
                    >
                      <option className="search_option" value="all">
                        По ЭС
                      </option>
                      <option className="search_option" value="happy">
                        Веселье
                      </option>
                      <option className="search_option" value="neutral">
                        Нейтраль
                      </option>
                      <option className="search_option" value="sad">
                        Грусть
                      </option>
                      <option className="search_option" value="angry">
                        Злость
                      </option>
                      <option className="search_option" value="fear">
                        Страх
                      </option>
                      <option className="search_option" value="surprise">
                        Удивление
                      </option>
                    </select>

                    <div className="classSelecttt">
                      <select
                        style={{ borderColor: theme }}
                        onChange={onPupilClass}
                        id="classSelect"
                        value={pupilsClass}
                        className="select_teachPupil"
                      >
                        {teachClass?.pupils?.map((item) => (
                          <option
                            key={item?.pupil_class}
                            value={item?.pupil_class}
                          >
                            {item?.pupil_class}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
              <button
                className="panel_button"
                type="button"
                onClick={() => setReport(true)}
              >
                Отчет
              </button>
              {/* <div className='attendance_div' style={{borderColor: theme,'--scrollbar-thumb': theme}}>

  <h5 className='attendance_title'>Отсутствующие ученики</h5>
<ul className='attendance' style={{'--scrollbar-thumb': theme}}>
{pupilMissing?.map((item, index) => (
  <li key={index} className="attendance_item" style={{borderColor: theme}}>
  <Link className='attendance_link'>
    <p className='attendance_name'>{item?.full_name}</p>
    <img className='attendance_avatar' style={{objectFit: "cover"}} src={item?.main_image ? item?.main_image : usersLogo} alt='Avatar' width='50' height='50'/>
  </Link>
</li>
))}
</ul>
</div> */}
              <Notification modal={modal} setModal={setModal} />
              <Report report={report} setReport={setReport} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teacher;
