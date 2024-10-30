import type { FC } from "react";

import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ROUTS } from "./AppRouter.config";

import type { TRoute } from "@app/providers/AppRouter/AppRouter.types";

export const AppRouter: FC = () => {
  const user = useAppSelector(state => state.user);

  const rotes = ROUTS.reduce((acc: TRoute[], el: TRoute) => {
    const isUserAuth = !!(user.isAuth && user.data);

    if (el.needAuth && !isUserAuth) return acc;

    if (isUserAuth && !el?.role?.includes(user.data!.role)) return acc;

    acc.push(el);

    return acc;
  }, []);

  return <RouterProvider router={createBrowserRouter(rotes)} />;
};
