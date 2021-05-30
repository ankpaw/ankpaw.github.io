/* eslint-disable no-unused-vars */
export const checkAndSetTheme = () => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export const setTheme = (theme: Theme) => {
  theme !== Theme.system
    ? (localStorage.theme = theme)
    : localStorage.removeItem("theme");
  checkAndSetTheme();
};

export enum Theme {
  light = "light",
  dark = "dark",
  system = "system",
}
