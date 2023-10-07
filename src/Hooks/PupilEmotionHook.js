import { useContext } from "react";
import { PupilEmotionContext } from "../context/PupilEmotion";

export const PupilEmotionHooks = () => {
  const {pupilEmotion, setPupilEmotion} = useContext(PupilEmotionContext);
  return {pupilEmotion, setPupilEmotion}
}