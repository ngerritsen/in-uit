import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import MainView from './MainView';
import Header from './Header';
import Loader from './Loader';
import Login from './Login';
import { getTheme } from '../helpers/theme';

const App = ({
  authenticationInitialized,
  initialized,
  loggedIn
}) => {
  return (
    <ThemeProvider theme={getTheme()}>
      <div>
        <Header />
        <div className="container">
          {(() => {
            if (authenticationInitialized && !loggedIn) {
              return <Login />;
            }

            if (!initialized) {
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

App.propTypes = {
  authenticationInitialized: PropTypes.bool.isRequired,
  initialized: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  useDarkMode: PropTypes.bool.isRequired,
};

const GlobalStyle = createGlobalStyle`
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
    color: ${props => props.theme.colors.foreground};
    background-color: ${props => props.theme.colors.backgroundSubtle};
  }
`;

function mapStateToProps(state) {
  return {
    loggedIn: state.authentication.loggedIn,
    initialized: state.items.initialized && state.authentication.initialized,
    authenticationInitialized: state.authentication.initialized,
    useDarkMode: state.theme.useDarkMode,
  };
}

export default connect(mapStateToProps)(App);
