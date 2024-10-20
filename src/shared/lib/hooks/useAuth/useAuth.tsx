import { useEffect } from "react";

import { useLazyGetUserQuery } from "@entity/User/api/User.api";
import { UserSliceActions } from "@entity/User/model/slice/User.slice";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";

export const useAuth = () => {
  const [trigger, { isLoading, isError }] = useLazyGetUserQuery();
  const dispatch = useAppDispatch();
  const userDidMounted = useAppSelector(state => state.user.isMounted);

  useEffect(() => {
    if (!userDidMounted) trigger(null);

    if (isLoading) return;
    let res = false;

    if (!isError) res = true;

    dispatch(UserSliceActions.setAuth(res));
  }, [isLoading, isError]);
};
