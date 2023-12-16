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
  const [theme, setTheme] = useState('#ffbe98');
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
  const [teacherPupils, setTeacherPupils] = useState()
  const [depres, setDepres] = useState()
  const [scholl, setSchool] = useState()
  const [deleteId, setDeleteId] = useState()
  const [weekEmotion, setWeekEmotion] = useState(false)
  const [weekFullName, setWeekFullName] = useState()
const [weekTime, setWeekTime] = useState()



  return (
    <AuthContext.Provider value={{weekTime, setWeekTime,weekFullName, setWeekFullName,weekEmotion, setWeekEmotion,deleteId, setDeleteId,scholl, setSchool,depres, setDepres,teacherPupils, setTeacherPupils,pupilsClass, setPupilsClass,user, setUsers,ageRange, setAgeRange,classes, setClasses,classList, setClassList,genders, setGenders,originalTeacher, setOriginalTeacher,originalUsers, setOriginalUsers,position, setPosition,pupilClass, setPupilClass,pupilCount, setPupilCount,pupilEmotion, setPupilEmotion,teacher, setTeacher,teacherCount, setTeacherCount,theme, setTheme,editAdminModal, setEditAdminModal, notificationCount, setNotificationCount, notification, setNotification, modal, setModal,comersPupils, setComersPupil,missingTeachers, setMissingTeachers,lateComersTeachers, setLateComersTeachers,lateComersPupils, setLateComersPupils, teach, setTeach,editUser, setEditUser}}>
      {children}
    </AuthContext.Provider>
  );
};