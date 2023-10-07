import { useContext } from "react";
import { TeacherCountContext } from "../context/TeacherCount";

export const TeacherCountHooks = () => {
  const {teacherCount, setTeacherCount} = useContext(TeacherCountContext);
  return {teacherCount, setTeacherCount}
}