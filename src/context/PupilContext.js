import React from 'react';
import { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUsers] = useState([])
  const [ageRange, setAgeRange] = useState('');
  const [classes, setClasses] = useState();
  const [classList, setClassList] = useState([]);
  const [genders, setGenders] = useState([]);
  const [originalTeacher, setOriginalTeacher] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [position, setPosition] = useState();
  const [pupilClass, setPupilClass] = useState('');
  const [pupilCount, setPupilCount] = useState();
  const [pupilEmotion, setPupilEmotion] = useState();
  const [teacher, setTeacher] = useState();
  const [teacherCount, setTeacherCount] = useState();
  const [theme, setTheme] = useState('#FC6C85');
  const [editAdminModal, setEditAdminModal] = useState()
  const [notificationCount, setNotificationCount] = useState()
  const [notification, setNotification] = useState()
  const [modal, setModal] = useState()
  const [comersPupils, setComersPupil] = useState([])
  const [missingTeachers, setMissingTeachers]= useState([])
  const [lateComersTeachers, setLateComersTeachers] = useState([])
  const [lateComersPupils, setLateComersPupils] = useState([])
  const [teach, setTeach] = useState()
  const [editUser, setEditUser] = useState()
  const [pupilsClass, setPupilsClass] = useState()


  return (
    <AuthContext.Provider value={{pupilsClass, setPupilsClass,user, setUsers,ageRange, setAgeRange,classes, setClasses,classList, setClassList,genders, setGenders,originalTeacher, setOriginalTeacher,originalUsers, setOriginalUsers,position, setPosition,pupilClass, setPupilClass,pupilCount, setPupilCount,pupilEmotion, setPupilEmotion,teacher, setTeacher,teacherCount, setTeacherCount,theme, setTheme,editAdminModal, setEditAdminModal, notificationCount, setNotificationCount, notification, setNotification, modal, setModal,comersPupils, setComersPupil,missingTeachers, setMissingTeachers,lateComersTeachers, setLateComersTeachers,lateComersPupils, setLateComersPupils, teach, setTeach,editUser, setEditUser}}>
      {children}
    </AuthContext.Provider>
  );
};