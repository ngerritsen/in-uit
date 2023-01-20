import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import MainView from "./MainView";
import Header from "./Header";
import Login from "./Login";
import { getTheme, isInDarkMode, onDarkModeChange } from "../helpers/theme";
import { getIsLoggedIn, getIsLoading } from "../selectors";
import { Theme } from "../types";
import Loader from "./Loader";

const App = () => {
  const [useDarkMode, setUseDarkMode] = useState(isInDarkMode());
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    onDarkModeChange((shouldUseDarkMode: boolean) => {
      if (shouldUseDarkMode !== useDarkMode) {
        setUseDarkMode(shouldUseDarkMode);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={getTheme(useDarkMode)}>
      <Header />
      {(() => {
        if (isLoading) {
          return <Loader />;
        }

        if (!isLoggedIn) {
          return <Login />;
        }

        return <MainView />;
      })()}
      <GlobalStyle />
    </ThemeProvider>
  );
};

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }


  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.5rem;
    margin: 0;
    font-family: 'Open Sans', Arial, sans-serif;
    color: ${(props) => props.theme.colors.foreground};
    background-color: ${(props) => props.theme.colors.backgroundSubtle};
  }
`;

export default App;
