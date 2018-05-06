import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  color: "#2f8dcd"
};

export default props => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);
