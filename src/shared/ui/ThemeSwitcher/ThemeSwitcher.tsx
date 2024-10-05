import { type FC } from "react";

import { useTheme } from "@shared/lib/hooks/useTheme/useTheme";

import "@shared/styles/index.scss";

export const ThemeSwitcher: FC = () => {
  const [currentTheme, setTheme] = useTheme();

  const handelSwitchTheme = () => {
    if (currentTheme === "light") {
      setTheme("dark");
    } else if (currentTheme === "dark") {
      setTheme("light");
    }
  };

  return <button onClick={handelSwitchTheme}>{currentTheme}</button>;
};
