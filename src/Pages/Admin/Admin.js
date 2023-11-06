import React, { useContext, useEffect, useState } from "react";
import "./admin.css";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Pupil from "../../components/Pupils/Pupil";
import TeacherList from "../../components/TeacherList/TeacherList";
import ClassesList from "../../components/Classes/ClassesList";
import CreateAdminModal from "../../Modal/Admin/CreateAdminmodal";
import { AuthContext } from "../../context/PupilContext";
import axios from "axios";
import { DecodeHooks } from "../../Hooks/DecodeHook";
import Notification from "../../Modal/Notification/Notification";

function Admin(props) {
  const { isActive } = props;
  const {
    user,
    setUsers,
    originalUsers,
    genders,
    setGenders,
    pupilCount,
    setPupilEmotion,
    classes,
    setClasses,
    teacherCount,
    theme,
    setTheme,
    setAgeRange,
    setTeacher,
    setPupilCount,
    setTeacherCount,
    setNotification,
    notificationCount,
    setPupilClass,
    setNotificationCount,
    modal,
    setModal,
  } = useContext(AuthContext);
  const [adminModal, setAdminModal] = useState();
  const { decode } = DecodeHooks();
  const [teach, setTeach] = useState();
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await axios.get(
          `https://www.api.yomon-emas.uz/api/users/users/${decode}/`
        );
        setTeach(response?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchParents();
  }, [decode]);

  const handleModal = () => {
    try {
      setModal(true);

      const response = axios.get(
        `https://www.api.yomon-emas.uz/api/notification/notification/${decode}/get_messages_by_user/`
      );
      setNotification(response.data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(
          `https://www.api.yomon-emas.uz/api/notification/notification/${decode}/get_messages_by_user/`
        );
        setNotification(response.data.messages);
        setNotificationCount(response.data.messages.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotification();
  }, [decode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      applyDefaultTheme();
    }
  }, []);

  useEffect(() => {
    applyTheme();
  }, [theme]);

  const applyDefaultTheme = () => {
    setTheme("#FC6C85");
  };

  useEffect(() => {
    const fetchPupils = async () => {
      try {
        const response = await axios.get(
          "https://www.api.yomon-emas.uz/api/users/pupils/"
        );
        setPupilCount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPupils();
  }, []);

  useEffect(() => {
    const fetchPupils = async () => {
      try {
        const response = await axios.get(
          "https://www.api.yomon-emas.uz/api/users/users/?status=teacher"
        );
        setTeacherCount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPupils();
  }, []);

  useEffect(() => {
    const fetchPupils = async () => {
      try {
        const response = await axios.get(
          "https://www.api.yomon-emas.uz/api/users/pupils/classes/"
        );
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPupils();
  }, []);

  const applyTheme = () => {
    const body = document.body;
    const panelHeading = document.querySelector(".panel_heading");
    const dockaAdmin = document.querySelector(".adminBoard_header");
    const headerIcons = document.querySelectorAll(".header_icon circle");
    const headerLinks = document.querySelectorAll(".header-link");
    const adminPanel = document.querySelector(".admin_panel");
    const itemButtons = document.querySelectorAll(".item_button");
    const panelButton = document.querySelector(".panel_button");
    const ageSearch = document.querySelectorAll(".ageSearch");
    const smsCount = document.querySelector(".sms_count");
    const panelItem = document.querySelector(".age-search");

    if (theme === "#FC6C85") {
      body.style.backgroundColor = "#fafafa";
      panelHeading.style.backgroundColor = "#FC6C85";
      dockaAdmin.style.color = "#FC6C85";
      headerLinks.forEach((e) => {
        e.style.borderColor = "#FC6C85";

        e.addEventListener("mouseover", () => {
          e.style.backgroundColor = "rgba(252, 108, 133, 0.25)";
        });

        e.addEventListener("mouseout", () => {
          e.style.backgroundColor = "";
        });
      });
      adminPanel.style.borderColor = "#FC6C85";
      itemButtons.forEach((e) => {
        e.style.borderColor = "#FC6C85";
      });
      panelButton.style.backgroundColor = "#F9A298";
      smsCount.style.backgroundColor = "#F9A298";
      headerIcons.forEach((e) => {
        e.setAttribute("fill", "#F9A298");
      });
      ageSearch.forEach((e) => {
        e.style.borderColor = "#FC6C85";
      });
      panelItem.style.borderColor = "#FC6C85";
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
      panelButton.style.backgroundColor = "#81B37A";
      smsCount.style.backgroundColor = "#81B37A";
      ageSearch.forEach((e) => {
        e.style.borderColor = "#81B37A";
      });
      panelItem.style.borderColor = "#81B37A";
    }
  };

  const changeTheme = () => {
    const newTheme = theme === "#FC6C85" ? "#81B37A" : "#FC6C85";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const c1 = document.querySelector(".c1");
  const c2 = document.querySelector(".c2");

  const handleAgeChange = () => {
    if (c1.value !== "" && c2.value !== "") {
      setAgeRange(`${c1.value}-${c2.value}`);
    } else {
      setAgeRange("0-100");
    }
  };

  const handleGenderChange = (event) => {
    const maleCheckboxChecked =
      event.target.id === "maleCheckbox" && event.target.checked;
    const femaleCheckboxChecked =
      event.target.id === "femaleCheckbox" && event.target.checked;

    if (maleCheckboxChecked && !femaleCheckboxChecked) {
      if (!genders.includes("True")) {
        setGenders([...genders, "True"]);
      }
    } else if (femaleCheckboxChecked && !maleCheckboxChecked) {
      if (!genders.includes("False")) {
        setGenders([...genders, "False"]);
      }
    } else {
      const updatedGender = genders.filter((g) => g !== event.target.value);
      setGenders(updatedGender);
    }
  };

  var userslar = []
  const fetchPupils = async () => {
    try {
     const response = await axios.get(
        `https://mycorse.onrender.com/https://www.api.yomon-emas.uz/api/users/pupils/`
      );
      userslar = await response.data.results;
    } catch (error) {
      console.error(error);
    }
  };

  fetchPupils();

  const handleEmotionChange = (event) => {
    const selectedEmotion = event.target.value;
    setPupilEmotion(selectedEmotion);
  };
  // const handleEmotionChange = async (event) => {
  //   const selectedEmotion = event.target.value;
  //   const pupilIds = userslar?.map((pupil) => pupil.id);
  //   const promises = pupilIds?.map(async (id) => {
  //     const response = await axios.get(`https://mycorse.onrender.com/https://www.api.yomon-emas.uz/api/users/pupils/${id}/`);
  //     return response.data;
  //   });
  //   const absentPupilsData = await Promise.all(promises);
  //   var pup = absentPupilsData;
  //   switch (selectedEmotion) {
  //     case "happy":
  //       pup = pup?.filter(
  //         (pupil) =>
  //           pupil.emotions?.[pupil?.emotions?.length - 1]?.emotions == "happy"
  //       );
  //       setUsers(pup);
  //       break;
  //     case "neutral":
  //       pup = pup?.filter(
  //         (pupil) =>
  //           pupil.emotions?.[pupil?.emotions?.length - 1]?.emotions == "neutral"
  //       );
  //       setUsers(pup);
  //       break;
  //     case "sad":
  //       pup = pup?.filter(
  //         (pupil) =>
  //           pupil.emotions?.[pupil?.emotions?.length - 1]?.emotions == "sad"
  //       );
  //       setUsers(pup);
  //       break;
  //     case "angry":
  //       pup = pup?.filter(
  //         (pupil) =>
  //           pupil.emotions?.[pupil?.emotions?.length - 1]?.emotions == "angry"
  //       );
  //       setUsers(pup);
  //       break;
  //     case "fear":
  //       pup = pup?.filter(
  //         (pupil) =>
  //           pupil.emotions?.[pupil?.emotions?.length - 1]?.emotions == "fear"
  //       );
  //       setUsers(pup);
  //       break;
  //     case "surprise":
  //       pup = pup?.filter(
  //         (pupil) =>
  //           pupil.emotions?.[pupil?.emotions?.length - 1]?.emotions ==
  //           "surprise"
  //       );
  //       setUsers(pup);
  //       break;
  //       case "all":
  //         setUsers(userslar);
  //   }
  // };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    const filteredUsers = originalUsers.filter((item) =>
      item.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(searchTerm === "" ? originalUsers : filteredUsers);
    setTeacher(searchTerm === "" ? originalUsers : filteredUsers);
  };

  const handleClasChange = (event) => {
    const searchTerm = event.target.value;
    setPupilClass(searchTerm);
  };

  const search_pupil = document?.querySelector(".search_pupil");
  const maleCheckbox = document?.getElementById("maleCheckbox");
  const femaleCheckbox = document?.getElementById("femaleCheckbox");

  const hendlStatus = (x) => {
    if (x == "teacher") {
      c1.disabled = true;
      c2.disabled = true;
      search_pupil.disabled = true;
      maleCheckbox.disabled = false;
      femaleCheckbox.disabled = false;
    } else if (x === "class") {
      c1.disabled = true;
      c2.disabled = true;
      search_pupil.disabled = true;
      maleCheckbox.disabled = true;
      femaleCheckbox.disabled = true;
    } else {
      c1.disabled = false;
      c2.disabled = false;
      search_pupil.disabled = false;
      maleCheckbox.disabled = false;
      femaleCheckbox.disabled = false;
    }
  };

  return (
    <div className="admin_page">
      <div className="container">
        <div className="admin">
          <div div className="header">
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
                  <circle cx="25" cy="25" r="25" fill="#F9A298" />
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

              <button className="header_icon" onClick={changeTheme}>
                <svg
                  className="fon_icon header_icon"
                  width="55"
                  height="55"
                  viewBox="0 0 55 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="27.5" cy="27.5" r="27.5" fill="#FA8072" />
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
                <Link className="header_icon" to="/">
                  <svg
                    className="domIcons"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="25" cy="25" r="25" fill="#F9A298" />
                    <path
                      d="M33 20.093L30 17.093V15H33V20.093ZM37 26H34V36H16V26H13L25 14L37 26ZM27 28H23V34H27V28Z"
                      fill="white"
                    />
                  </svg>
                </Link>
                <button className="header_icon" onClick={handleModal}>
                  <svg
                    className=" header_icon"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="30" cy="30" r="30" fill="#FA8072" />
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
              </div>
              <p className="admin_boardSpan">администратора</p>
            </div>
          </div>
          <div className="admin_inner">
            <div className="admin_header">
              <nav>
                <ul className="header-list">
                  <li onClick={() => hendlStatus("pupil")}>
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
                        width="150"
                        height="138"
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
                      <span className="quantity">{pupilCount}</span>
                    </NavLink>
                  </li>

                  <li onClick={() => hendlStatus("teacher")}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "header-active header-link" : "header-link"
                      }
                      activeClassName="active"
                      style={{ backgroundColor: isActive ? "#81B37A" : "" }}
                      to="teacher"
                    >
                      <svg
                        className="navLinkIcon navLinkIcon0"
                        width="120"
                        height="130"
                        viewBox="0 0 120 130"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M60 0L120 32.5V97.5L60 130L0 97.5V32.5L60 0Z"
                          fill={theme}
                        />
                        <g clip-path="url(#clip0_147_1000)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M94.9519 82.4709L72.4032 82.4679L80.3686 94.1346H76.5448L68.5648 82.4679H62.8686L54.8886 94.1346H51.2019L59.1702 82.4679H50.5661V79.5513H74.5352V76.6346H83.2852V79.5513H92.0352V38.7179H42.4519V40.0217H39.5352V35.8013H94.9519V82.4709ZM44.6657 56.2209C46.5586 56.2209 48.4369 55.5996 49.6007 54.9492C51.8027 53.7242 57.4611 50.1571 59.7652 48.7542C60.3923 48.375 61.2119 48.515 61.6727 49.0867L61.699 49.1159C62.1773 49.7138 62.1219 50.5742 61.5736 51.0992L51.7415 60.4734C50.2219 61.9259 49.344 63.9238 49.2536 66.0209C48.9765 72.4579 48.4923 86.1809 48.2852 91.7867C48.2386 93.0992 47.1594 94.1375 45.8469 94.1375C44.5519 94.1375 43.5515 93.1225 43.4057 91.8392C43.0819 88.975 42.4461 82.2754 42.1602 79.5542C42.0436 78.4342 41.3465 77.7663 40.4569 77.7634C39.5702 77.7575 38.9315 78.4225 38.8586 79.5367C38.6777 82.2229 38.0827 89.0129 37.8611 91.8479C37.7619 93.1342 36.7032 94.1375 35.4111 94.1375C34.0927 94.1375 33.0077 93.0992 32.9523 91.7779C32.6694 84.9529 31.8761 65.6359 31.8761 65.6359L28.1223 72.4346C27.714 73.1754 26.8244 73.4963 26.0369 73.1929L26.034 73.19C25.369 72.9334 24.9519 72.3004 24.9519 71.615L25.0161 71.1571L28.6444 58.3442C29.0002 57.09 30.1465 56.2238 31.4532 56.2238H44.6657V56.2209ZM65.7852 62.0542H80.3686V59.1375H65.7852V62.0542ZM65.7852 56.2209H86.2019V53.3042H65.7852V56.2209ZM40.6261 41.6375C44.2457 41.6375 47.1886 44.5775 47.1886 48.2C47.1886 51.8225 44.2457 54.7625 40.6261 54.7625C37.0036 54.7625 34.0636 51.8225 34.0636 48.2C34.0636 44.5775 37.0036 41.6375 40.6261 41.6375ZM65.7852 50.3875H86.2019V47.4709H65.7852V50.3875Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_147_1000">
                            <rect
                              width="70"
                              height="70"
                              fill="white"
                              transform="translate(24.9519 30)"
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      <h4 className="navLinkName navLinkName1">
                        Всего преподавателей
                      </h4>
                      <span className="quantity">{teacherCount}</span>
                    </NavLink>
                  </li>

                  <li onClick={() => hendlStatus("class")}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "header-active header-link" : "header-link"
                      }
                      activeClassName="active"
                      style={{ backgroundColor: isActive ? "#81B37A" : "" }}
                      to="class"
                    >
                      <svg
                        className="navLinkIcon"
                        width="150"
                        height="138"
                        viewBox="0 0 150 138"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M75 0L139.952 34.4933V103.48L75 137.973L10.0481 103.48V34.4933L75 0Z"
                          fill={theme}
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M75.497 98.8842C74.2326 98.8842 72.2503 96.8162 70.5102 92.2458C68.7997 93.1063 67.3137 93.7829 65.8691 94.3983C68.135 100.208 71.3581 104 75.497 104C79.7512 104 83.0364 100.001 85.3111 93.9317C83.8783 93.3454 82.3657 92.6775 80.6404 91.8346C78.8708 96.6967 76.8058 98.8842 75.497 98.8842ZM61.5854 92.4208C52.4301 95.7429 43.003 95.8275 43.003 87.6258C43.003 84.8871 44.2881 81.0429 48.3088 75.72C50.0253 73.4479 52.0135 71.2137 54.0313 69.1633C58.5543 64.6279 63.6504 60.2675 70.2946 55.7496C67.0951 54.0113 63.6061 52.3458 60.2028 51.1121C56.7167 49.8433 53.6472 49.1404 51.2956 49.1404C49.7948 49.1404 48.6781 49.4525 48.3147 49.9804C47.9218 50.5404 47.9071 52.2671 49.6294 55.3558L50.2498 55.3179C53.3429 55.3179 55.857 57.8438 55.857 60.9558C55.857 64.0679 53.3429 66.5879 50.2498 66.5879C47.1537 66.5879 44.6455 64.0679 44.6455 60.9558C44.6455 59.9467 44.9085 59.0017 45.3693 58.1821C43.6263 55.1488 43 52.7571 43 50.8817C43 46.4629 46.4092 44.0158 51.2956 44.0158C58.7227 44.0158 68.7258 48.8633 75.1721 52.6083C81.7128 48.6329 92.0617 43.3946 99.7044 43.3946C105.297 43.3946 107.997 46.4688 107.997 50.38C107.997 53.1188 106.709 56.96 102.691 62.28C93.5802 74.3463 75.4645 87.3808 61.5854 92.4208ZM105.654 79.8646C106.074 79.0771 106.304 78.1846 106.304 77.2337C106.304 74.1187 103.796 71.5958 100.7 71.5958C97.6039 71.5958 95.0957 74.1187 95.0957 77.2337C95.0957 80.3429 97.6039 82.8629 100.7 82.8629L101.462 82.8133C103.093 85.8 103.069 87.4713 102.688 88.0254C102.322 88.5533 101.208 88.8625 99.7044 88.8625C94.9716 88.8625 88.3806 86.1092 84.1353 84.0296C82.7173 85.0271 80.9595 86.2112 79.2401 87.2933C84.9271 90.315 93.2936 93.9871 99.7044 93.9871C104.549 93.9871 108 91.5662 108 87.1213C108 85.2604 107.377 82.8775 105.654 79.8646ZM67.7391 80.2117L67.6978 80.1825C64.3181 77.82 60.9856 75.2242 57.8984 72.5088C49.5762 80.9 47.2305 86.9842 48.3325 88.6204C48.7047 89.1717 49.786 89.4925 51.2956 89.4925C58.2382 89.4925 69.2576 83.6067 75.7777 79.3862C83.7808 74.2092 92.9125 66.7629 98.632 59.1854C103.081 53.2996 103.217 50.1992 102.668 49.3825C102.295 48.8283 101.217 48.5133 99.7044 48.5133C93.9376 48.5133 85.1575 52.7688 80.0998 55.6504C83.8311 58.0888 87.3171 60.6642 90.4989 63.2804C89.2935 64.4908 88.035 65.6692 86.7469 66.8125C83.2136 63.9483 79.2903 61.1367 75.2223 58.6167C70.5516 61.6383 65.8484 65.1908 61.6238 68.9767C64.7996 71.7504 68.584 74.6613 72.6166 77.3563C71.0745 78.3217 69.5176 79.2433 67.7391 80.2117ZM75.497 63.1667C78.7586 63.1667 81.4056 65.78 81.4056 69C81.4056 72.22 78.7586 74.8333 75.497 74.8333C72.2355 74.8333 69.5885 72.22 69.5885 69C69.5885 65.78 72.2355 63.1667 75.497 63.1667ZM70.3596 46.1683C68.6461 45.3371 67.1246 44.6575 65.6888 44.0742C67.9636 38.0017 71.2488 34 75.497 34C79.6419 34 82.868 37.7975 85.1309 43.6017C83.6833 44.22 82.1885 44.9054 80.4868 45.7571C78.7527 41.1867 76.7703 39.1217 75.497 39.1217C74.1942 39.1217 72.1321 41.3092 70.3596 46.1683Z"
                          fill="white"
                        />
                      </svg>

                      <h4 className="navLinkName">всего классов</h4>
                      <span className="quantity">{classes?.count}</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <Routes>
                <Route path="/pupil" element={<Pupil />} />
                <Route path="/teacher" element={<TeacherList />} />
                <Route path="/class" element={<ClassesList />} />
              </Routes>
            </div>

            <div>
              <div className="admin_panel">
                <h4 className="panel_heading">фильтрация</h4>

                <ul className="panel_list">
                  <li
                    className="panel_item age-search"
                    onChange={handleAgeChange}
                  >
                    <input id="c1" className="c1 ageSearch" type="text" />
                    <span>По возрасту</span>
                    <input id="c2" className="c2 ageSearch" type="text" />
                  </li>

                  <li className="panel_item">
                    <input
                      className="item_button search_pupil"
                      type="text"
                      placeholder="введите класс..."
                      onChange={handleClasChange}
                    />
                  </li>

                  <li className="panel_item">
                    <div className="item_button search_danger">
                      <span>По полу</span>
                      <div onChange={handleGenderChange}>
                        <input
                          className="radio_button"
                          id="maleCheckbox"
                          type="checkbox"
                          value="True"
                        />
                        <label htmlFor="maleCheckbox" className="radio_label">
                          Мальчик
                        </label>
                        <input
                          className="radio_button"
                          id="femaleCheckbox"
                          type="checkbox"
                          value="False"
                        />
                        <label htmlFor="femaleCheckbox" className="radio_label">
                          Девочка
                        </label>
                      </div>
                    </div>
                  </li>

                  <li className="panel_item">
                    <select
                      className="item_button search_select"
                      onChange={handleEmotionChange}
                    >
                      <option
                        className="search_option"
                        value="all"
                      >
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
                  </li>
                </ul>
              </div>
              <button
                className="panel_button"
                type="button"
                onClick={() => setAdminModal(true)}
              >
                Создать профиль
              </button>
              <CreateAdminModal
                className="admin_Modal"
                adminModal={adminModal}
                setAdminModal={setAdminModal}
              />
              <Notification modal={modal} setModal={setModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
