import { useContext } from "react";
import { PupilClassContext } from "../context/PupilClass";

export const PupilClassHooks = () => {
  const {pupilClass, setPupilClass} = useContext(PupilClassContext);
  return {pupilClass, setPupilClass}
}