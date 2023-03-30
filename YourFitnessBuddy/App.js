import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";

import { ThemeProvider } from "styled-components/native";
import ThemeContext from "./src/global/themeContext";
import BuddyThemes from "./src/components/themeProvider";

import setupAxiosInterceptors from "./src/config/interceptor";
import Router from "./src/config/router";
import { store } from "./src/config/store";

export default App = () => {
  const [theme, setTheme] = useState(BuddyThemes.Ronnie);

  const handleThemeChange = (newTheme) => {
    setTheme(BuddyThemes[newTheme]);
  };

  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return (
    <ThemeContext.Provider value={handleThemeChange}>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
      </Provider>
    </ThemeContext.Provider>
  );
};
