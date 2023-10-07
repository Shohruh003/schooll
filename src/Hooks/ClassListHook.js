import { useContext } from "react";
import { ClassListContext } from "../context/ClassList";

export const ClassListHooks = () => {
  const {classList, setClassList} = useContext(ClassListContext);
  return {classList, setClassList}
}