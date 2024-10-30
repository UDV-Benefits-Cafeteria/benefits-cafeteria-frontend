import type { FC } from "react";

import { RegisteredLayout } from "@shared/Layout/RegisteredLayout";
import { ViewEmployees } from "@widgets/ViewEmployees/ui/ViewEmployees";

export const Employees: FC = () => {
  return (
    <RegisteredLayout>
      <ViewEmployees />
    </RegisteredLayout>
  );
};
