import { useContext } from "react";
import { DecodeContext } from "../context/DecodeContext";

export const DecodeHooks = () => {
  const {decode, setDecode} = useContext(DecodeContext);
  return {decode, setDecode}
}