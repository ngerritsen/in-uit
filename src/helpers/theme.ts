import { light, dark } from "../theme";
import { Theme } from "../types";

export function onDarkModeChange(listener: (matches: boolean) => void) {
  if (!window.matchMedia) {
    return;
  }

  window.matchMedia("(prefers-color-scheme: dark)").addListener((event) => listener(event.matches));
}

export function isInDarkMode() {
  if (!window.matchMedia) {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function getTheme(useDarkMode: boolean): Theme {
  return useDarkMode ? dark : light;
}
