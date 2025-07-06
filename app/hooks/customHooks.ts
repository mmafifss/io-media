"use client";

import { useEffect, useRef, useState } from "react";

const useFirstLoading = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  useEffect(() => {
    let timeoutId: any;

    timeoutId = setTimeout(() => {
      setIsFirstLoading(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  return [isFirstLoading, setIsFirstLoading];
};

const useDelayUnmount = (isMounted: any, delayTime: any) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId: any;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);

  return shouldRender;
};

export { useFirstLoading, useDelayUnmount };
