import { createContext } from "react";
import { WindowSize } from "./types";

export const WindowSizeContext = createContext<WindowSize>({
  width: 0,
  height: 0,
});
