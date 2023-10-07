import { useContext } from "react";
import { AgeRangeContext } from "../context/AgeRange";

export const AgeRangeHooks = () => {
  const {ageRange, setAgeRange} = useContext(AgeRangeContext);

  return {ageRange, setAgeRange, }
}