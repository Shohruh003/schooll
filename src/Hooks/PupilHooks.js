import { useContext } from "react";
import { PupilContext } from "../context/PupilContext";

export const PupilHooks = () => {
  const {user, setUsers} = useContext(PupilContext);
  return {user, setUsers}
}