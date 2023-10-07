import { useContext } from "react";
import { GendersContext } from "../context/Genders";

export const GendersHooks = () => {
  const {genders, setGenders} = useContext(GendersContext);
  return {genders, setGenders}
}