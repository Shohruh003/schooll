import { useContext } from "react";
import { PupilCountContext } from "../context/PupilCount";

export const PupilCountHooks = () => {
  const {pupilCount, setPupilCount} = useContext(PupilCountContext);
  return {pupilCount, setPupilCount}
}