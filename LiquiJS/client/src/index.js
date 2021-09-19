import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";

import App from "./App";
import "./index.css";

const theme = createTheme({
  typography: {
    fontFamily: `"Montserrat"`,
  },
  palette: {
    primary: {
      main: "#FF8B3D",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
