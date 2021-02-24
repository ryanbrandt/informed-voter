import { createContext } from "react";
import { WindowSize } from "./hooks";

export const WindowSizeContext = createContext<WindowSize>({
  width: 0,
  height: 0,
});
