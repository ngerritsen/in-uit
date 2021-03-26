import { light, dark } from '../theme';

export function onThemeChange(listener) {
  if (!window.matchMedia) {
    return;
  }

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addListener((event) => listener(event.matches));
}

export function useDarkMode() {
  if (!window.matchMedia) {
    return false;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function getTheme() {
  return useDarkMode() ? dark : light;
}

