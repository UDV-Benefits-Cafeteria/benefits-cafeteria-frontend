import { type FC, type PropsWithChildren, useEffect } from "react";

import { UserSliceActions, useLazyGetUserQuery } from "@entity/User";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const isUserMounted = useAppSelector(state => state.user.isMounted);

  const [trigger, { data }] = useLazyGetUserQuery();
  const dispatch = useAppDispatch();
  const userDidMounted = useAppSelector(state => state.user.isMounted);

  useEffect(() => {
    if (!userDidMounted) trigger(null);

    if (data) dispatch(UserSliceActions.setUser(data));
    else dispatch(UserSliceActions.setAuth(false));
  }, [data]);

  return isUserMounted ? (
    children
  ) : (
    <h1
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      Loading...
    </h1>
  );
};
