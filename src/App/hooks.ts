import { useLayoutEffect, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { queryStringToObject } from "../utils/helpers";
import { WindowSize } from "./types";

type GenericEffectCallback<T> = (params: T) => void;

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

export const usePathParameters = <T>(
  effectCallback: GenericEffectCallback<T>
): void => {
  const params = useParams<T>();

  useEffect(() => {
    effectCallback(params);
  }, [params]);
};

export const useQueryParameters = <T>(
  effectCallback: GenericEffectCallback<T>
): void => {
  const location = useLocation<T>();
  const { search } = location;

  useEffect(() => {
    const params = queryStringToObject<T>(search);

    effectCallback(params);
  }, [search]);
};
