import { type FC, Suspense } from "react";

import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import Loader from "@shared/ui/Loader";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ROUTS } from "./AppRouter.config";

import type { TRoute } from "@app/providers/AppRouter/AppRouter.types";

export const AppRouter: FC = () => {
  const user = useAppSelector(state => state.user);

  const rotes = ROUTS.reduce((acc: TRoute[], el: TRoute) => {
    const isUserAuth = !!(user.isAuth && user.data);

    if (el.needAuth && !isUserAuth) return acc;

    if (isUserAuth && !el?.role?.includes(user.data!.role)) return acc;

    el.element = <Suspense fallback={<Loader />}>{el.element}</Suspense>;

    acc.push(el);

    return acc;
  }, []);

  return <RouterProvider router={createBrowserRouter(rotes)} />;
};
