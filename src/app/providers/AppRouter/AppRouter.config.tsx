import { ApplicationsAsync } from "@pages/Applications/Applications.async";
import { AuthorizationPage } from "@pages/AuthorizationPage";
import { BenefitEdit } from "@pages/BenefitEdit";
import { BenefitPage } from "@pages/BenefitPage";
import { Benefits } from "@pages/Benefits";
import { BenefitsBar } from "@pages/BenefitsBar";
import { CreateBenefit } from "@pages/CreateBenefit";
import { CreateEmployee } from "@pages/CreateEmployee";
import { EmployeeEdit } from "@pages/EmployeeEdit";
import { Employees } from "@pages/Employees";
import { NotFoundPage } from "@pages/NotFoundPage";
import { PersonalAccount } from "@pages/PersonalAccount/PersonalAccount";
import { PreLanding } from "@pages/PreLanding";
import { PurchaseHistory } from "@pages/PurchaseHistory/PurchaseHistory";
import { RegisterPage } from "@pages/RegisterPage";
import { PATH } from "@shared/consts/localStorage";
import { Navigate } from "react-router-dom";

import type { TRoute } from "./AppRouter.types";

export const AUTH = "/auth";
export const LOGIN = AUTH + "/login";
export const REGISTER = AUTH + "/register";
export const PRE_LANDING = "/landing";
export const MAIN = "/main";
export const APPLICATION = MAIN + "/application";
export const BENEFITS = MAIN + "/benefits";
export const CURRENT_BENEFITS = BENEFITS + "/:id";
export const BENEFITS_EDIT = CURRENT_BENEFITS + "/edit";
export const BENEFITS_BAR = BENEFITS + "/bar";
export const CREATE_BENEFITS = BENEFITS + "/create";
export const EMPLOYEES = MAIN + "/employees";
export const CREATE_EMPLOYEES = EMPLOYEES + "/create";
export const CURRENT_EMPLOYEE = EMPLOYEES + "/:id";
export const EMPLOYEES_EDIT = CURRENT_EMPLOYEE + "/edit";
export const PURCHASE_HISTORY = MAIN + "/history";
export const PERSONAL_ACCOUNT = MAIN + "/account";

const lastVisit = localStorage.getItem(PATH);

const navigateToAdmin: TRoute = {
  path: "/",
  element: <Navigate to={EMPLOYEES} />,
  role: ["admin", "hr"],
  needAuth: true,
};

const navigateToBar: TRoute = {
  path: "/",
  element: <Navigate to={BENEFITS_BAR} />,
  role: ["admin", "employee", "hr"],
  needAuth: true,
};

let navigateTo: TRoute = {
  path: "/",
  element: <Navigate to={PRE_LANDING} />,
  role: ["admin", "employee", "hr"],
  needAuth: false,
};

if (lastVisit) {
  if (lastVisit === "admin") navigateTo = navigateToAdmin;

  if (lastVisit === "user") navigateTo = navigateToBar;
}

export const ROUTS: TRoute[] = [
  navigateTo,
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
    path: MAIN,
    element: <Navigate to={BENEFITS_BAR} />,
    role: ["admin", "employee", "hr"],
    needAuth: true,
  },
  {
    path: BENEFITS_BAR,
    element: <BenefitsBar />,
    role: ["employee", "admin", "hr"],
    needAuth: true,
  },
  {
    path: CURRENT_BENEFITS,
    element: <BenefitPage />,
    role: ["employee", "admin", "hr"],
    needAuth: true,
  },
  {
    path: PERSONAL_ACCOUNT,
    element: <PersonalAccount />,
    role: ["employee", "admin", "hr"],
    needAuth: true,
  },
  {
    path: BENEFITS_EDIT,
    element: <BenefitEdit />,
    role: ["admin", "hr"],
    needAuth: true,
  },
  {
    path: EMPLOYEES_EDIT,
    element: <EmployeeEdit />,
    role: ["admin", "hr"],
    needAuth: true,
  },
  {
    path: APPLICATION,
    element: <ApplicationsAsync />,
    role: ["admin", "hr"],
    needAuth: true,
  },
  {
    path: PURCHASE_HISTORY,
    element: <PurchaseHistory />,
    role: ["employee", "admin", "hr"],
    needAuth: true,
  },
  {
    path: BENEFITS,
    element: <Benefits />,
    role: ["admin", "hr"],
    needAuth: true,
  },
  {
    path: CREATE_BENEFITS,
    element: <CreateBenefit />,
    role: ["admin", "hr"],
    needAuth: true,
  },
  {
    path: EMPLOYEES,
    element: <Employees />,
    role: ["admin", "hr"],
    needAuth: true,
  },
  {
    path: CURRENT_EMPLOYEE,
    element: <div>текущий пользователь</div>,
    role: ["admin", "hr"],
    needAuth: true,
  },
  {
    path: CREATE_EMPLOYEES,
    element: <CreateEmployee />,
    role: ["admin", "hr"],
    needAuth: true,
  },
  {
    path: "/*",
    element: <NotFoundPage />,
    role: ["admin", "employee", "hr"],
    needAuth: false,
  },
];
