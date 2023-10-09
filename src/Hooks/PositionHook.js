import { useContext } from "react";
import { PositionContext } from "../context/PositionContext";

export const PositionHooks = () => {
  const {position, setPosition} = useContext(PositionContext)
  return {position, setPosition}
}