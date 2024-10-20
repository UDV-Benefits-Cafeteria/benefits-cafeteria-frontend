import { AuthorizationPage } from "@pages/AuthorizationPage";
import { NotFoundPage } from "@pages/NotFoundPage/NotFoundPage";
import { PreLanding } from "@pages/PreLanding";
import { RegisterPage } from "@pages/RegisterPage";

import type { TRoute } from "./AppRouter.types";

export const ROUTS: TRoute[] = [
  {
    path: "/",
    element: <PreLanding />,
    role: ["admin", "employee", "hr"],
    needAuth: false,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    role: ["admin", "employee", "hr"],
    needAuth: false,
  },
  {
    path: "/login",
    element: <AuthorizationPage />,
    role: ["admin", "employee", "hr"],
    needAuth: false,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    role: ["admin", "employee", "hr"],
    needAuth: false,
  },
];
