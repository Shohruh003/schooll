import { useContext } from "react";
import { OriginalUsersContext } from "../context/OriginalUsers";

export const OriginalUserHooks = () => {
  const {originalUsers, setOriginalUsers} = useContext(OriginalUsersContext);
  return {originalUsers, setOriginalUsers}
}