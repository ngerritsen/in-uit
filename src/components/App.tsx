import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import MainView from "./MainView";
import Header from "./Header";
import Loader from "./Loader";
import Login from "./Login";
import { getTheme, isInDarkMode, onDarkModeChange } from "../helpers/theme";
import {
  getIsLoggedIn,
  getIsInitialized,
  getIsAuthenticationInitialized,
} from "../selectors";
import { Theme } from "../types";

const App = () => {
  const [useDarkMode, setUseDarkMode] = useState(isInDarkMode());
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isInitialized = useSelector(getIsInitialized);
  const isAuthenticationInitialized = useSelector(
    getIsAuthenticationInitialized
  );

  useEffect(() => {
    onDarkModeChange((shouldUseDarkMode: boolean) => {
      if (shouldUseDarkMode !== useDarkMode) {
        setUseDarkMode(shouldUseDarkMode);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={getTheme(useDarkMode)}>
      <div>
        <Header />
        <div className="container">
          {(() => {
            if (isAuthenticationInitialized && !isLoggedIn) {
              return <Login />;
            }

            if (!(isInitialized && isAuthenticationInitialized)) {
              return <Loader />;
            }

            return <MainView />;
          })()}
        </div>
      </div>
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
