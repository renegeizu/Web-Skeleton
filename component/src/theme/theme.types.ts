import { DEFAULT_THEME } from "./Theme";

export type ColorType = keyof typeof DEFAULT_THEME.colors;

// Example
const myColor: ColorType = "primary";
