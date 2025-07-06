"use client";

import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  ReactNode,
} from "react";

interface IAppContext {
  globalState: { [key: string]: any };
  setState: (newState?: any, preUpdate?: any) => void;
  [key: string]: any;
}

interface IAppProviderProps {
  children: ReactNode;
  initialState?: object;
}

const AppContext = createContext<IAppContext>({
  globalState: {},
  setState: () => {},
});
const { Provider } = AppContext;

export const Consumer = AppContext.Consumer;

export const AppProvider = ({
  children,
  initialState = {},
}: IAppProviderProps) => {
  const [state, setActualState] = useState(initialState);

  const setState = useCallback((newState: any, preUpdate: any) => {
    setActualState((prevState) => {
      if (preUpdate && preUpdate.call) {
        preUpdate();
      }
      return { ...prevState, ...newState };
    });
  }, []);

  const updateState = useCallback(
    (updateFunction: any) => setActualState(updateFunction),
    []
  );

  const appContextValue = {
    globalState: { ...initialState, ...state },
    setState,
    updateState,
  };

  return <Provider value={appContextValue}>{children}</Provider>;
};

export const useAppContext = (): IAppContext => useContext(AppContext);

export default AppContext;
