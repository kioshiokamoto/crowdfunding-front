import { getUserInfo } from "lib/services/user.services";
import { auth } from "lib/utils/firebaseConfig";
import React, { createContext, useCallback, useEffect } from "react";
import { useMemo, useState } from "react";

import { GlobalProviderProps as Props } from "./global.context.types";
import { GlobalProviderValue } from "./global.context.types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const GlobalContext = createContext<GlobalProviderValue>();

const GlobalProvider: React.FC<Props> = props => {
  const [user, setUser] = useState<any>();

  const subscriber = useCallback(async (user: any) => {
    const { uid: userId } = user ?? {};
    if (userId) {
      const userData = await getUserInfo(user.uid);
      setUser({
        ...user,
        ...userData
      });
    } else {
      setUser(undefined);
    }
  }, []);

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(subscriber);

    return authSubscriber;
  }, [subscriber]);

  const value: GlobalProviderValue = useMemo(() => {
    return { user, setUser };
  }, [user, setUser]);

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
