import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const ThemeHooks = () => {
  const {theme, setTheme} = useContext(ThemeContext);
  return {theme, setTheme}
}