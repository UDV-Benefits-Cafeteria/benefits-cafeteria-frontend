import { RegisterPage } from "@pages/RegisterPage/RegisterPage.async";

import { TRoute } from "@app/providers/AppRouter/AppRouter.types";

export const ROUTS: TRoute[] = [
  {
    path: "/",
    element: <div>Hello world!</div>,
    role: ["admin", "employee", "hr"],
    needAuth: false,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    role: ["admin", "employee", "hr"],
    needAuth: false,
  },
];
