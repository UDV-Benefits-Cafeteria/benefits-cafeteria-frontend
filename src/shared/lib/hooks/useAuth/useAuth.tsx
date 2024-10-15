import { useEffect } from "react";

import { useGetUserQuery } from "@entity/User/api/User.api";
import { UserSliceActions } from "@entity/User/model/slice/IUser.slice";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";

export const useAuth = () => {
  const { isError, isLoading } = useGetUserQuery(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading) return;
    let res = false;

    if (!isError) res = true;

    dispatch(UserSliceActions.setAuth(res));
  }, [isLoading, isError]);
};
