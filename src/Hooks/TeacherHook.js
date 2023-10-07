import { useContext } from "react";
import { TeacherContext } from "../context/TeacherContext";

export const TeacherHooks = () => {
  const {teacher, setTeacher} = useContext(TeacherContext);
  return {teacher, setTeacher}
}