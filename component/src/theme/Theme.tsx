import * as React from "react";
import { ThemeProvider } from "styled-components";
import { theme_colors, system_colors } from "@app/asset/theme";

export const DEFAULT_THEME = {
  colors: {
    ...theme_colors,
    ...system_colors,
  },
};

const Theme = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={DEFAULT_THEME}>{children}</ThemeProvider>
);

export default Theme;
