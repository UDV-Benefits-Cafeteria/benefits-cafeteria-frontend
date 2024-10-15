import { FC } from "react";

import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ROUTS } from "./AppRouter.config";

import { TRoute } from "@app/providers/AppRouter/AppRouter.types";

export const AppRouter: FC = () => {
  const user = useAppSelector(state => state.user);

  const rotes = ROUTS.reduce((acc: TRoute[], el: TRoute) => {
    if (el.needAuth && !user.isAuth) return acc;

    if (el.needAuth && !el?.role?.includes(user.role)) return acc;

    acc.push(el);

    return acc;
  }, []);

  return <RouterProvider router={createBrowserRouter(rotes)} />;
};
