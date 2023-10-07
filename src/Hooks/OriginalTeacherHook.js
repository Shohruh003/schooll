import { useContext } from "react";
import { OriginalTeacherContext } from "../context/OriginalTeacher";

export const OriginalTeacherHook = () => {
  const {originalTeacher, setOriginalTeacher} = useContext(OriginalTeacherContext);
  return {originalTeacher, setOriginalTeacher}
}