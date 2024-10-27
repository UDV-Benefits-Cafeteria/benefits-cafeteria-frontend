import { AuthorizationPage } from "@pages/AuthorizationPage";
import { NotFoundPage } from "@pages/NotFoundPage/NotFoundPage";
import { PreLanding } from "@pages/PreLanding";
import { RegisterPage } from "@pages/RegisterPage";
import { RegisteredLayout } from "@shared/Layout/RegisteredLayout";
import { Navigate } from "react-router-dom";

import type { TRoute } from "./AppRouter.types";

export const AUTH = "/auth";
export const LOGIN = AUTH + "/login";
export const REGISTER = AUTH + "/register";
export const PRE_LANDING = "/landing";
export const MAIN = "/main";
export const BENEFITS = MAIN + "/benefits";
export const EMPLOYEES = MAIN + "/employees";

export const ROUTS: TRoute[] = [
  {
    path: "/",
    element: <Navigate to={PRE_LANDING} />,
    role: ["admin", "employee", "hr"],
    needAuth: false,
  },
  {
    path: PRE_LANDING,
    element: <PreLanding />,
    role: ["admin", "employee", "hr"],
    needAuth: false,
  },
  {
    path: AUTH,
    element: <Navigate to={LOGIN} />,
    role: ["admin", "employee", "hr"],
    needAuth: false,
  },
  {
    path: REGISTER,
    element: <RegisterPage />,
    role: ["admin", "employee", "hr"],
    needAuth: false,
  },
  {
    path: LOGIN,
    element: <AuthorizationPage />,
    role: ["admin", "employee", "hr"],
    needAuth: false,
  },
  {
    path: "/main",
    element: <RegisteredLayout>dsada</RegisteredLayout>,
    role: ["admin", "employee", "hr"],
    needAuth: true,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    role: ["admin", "employee", "hr"],
    needAuth: false,
  },
];
