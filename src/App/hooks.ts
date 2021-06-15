import { useLayoutEffect, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { WindowSize } from "./types";

export const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const updateSize = () => {
      const { innerWidth, innerHeight } = window;

      setSize({ width: innerWidth, height: innerHeight });
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

interface PathParameters {
  id: string;
}

type PathParameterEffectCallback = (id: string) => void;

export const usePathParameters = (
  effectCallback: PathParameterEffectCallback
): void => {
  const { id } = useParams<PathParameters>();

  useEffect(() => {
    effectCallback(id);
  }, [id]);
};
