import { useContext } from "react";
import { ClassesContext } from "../context/Classes";

export const ClassesHooks = () => {
  const {classes, setClasses} = useContext(ClassesContext);
  return {classes, setClasses}
}