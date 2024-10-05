import { useState } from "react";

export type TTheme = "light" | "dark";

const body = document.body;

const THEME_ATTRIBUTE = "theme";

const getCurrentTheme = (): TTheme => {
  const themeFromBody = body.getAttribute(THEME_ATTRIBUTE) as TTheme;

  if (themeFromBody) return themeFromBody;

  const themeFromLocalStorage = localStorage.getItem(THEME_ATTRIBUTE) as TTheme;

  if (themeFromLocalStorage) {
    body.setAttribute(THEME_ATTRIBUTE, themeFromLocalStorage);

    return themeFromLocalStorage;
  }

  return "light";
};

const setTheme = (newTheme: TTheme): void => {
  localStorage.setItem(THEME_ATTRIBUTE, newTheme);

  body.setAttribute(THEME_ATTRIBUTE, newTheme);
};

export const useTheme = (): [TTheme, (newTheme: TTheme) => void] => {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());

  const updateTheme = (newTheme: TTheme): void => {
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  return [currentTheme, updateTheme];
};
