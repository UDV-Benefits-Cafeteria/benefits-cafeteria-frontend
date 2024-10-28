import type { FC } from "react";

import { RegisteredLayout } from "@shared/Layout/RegisteredLayout";
import { CreateEmployeeForm } from "@widgets/CreateEmployeeForm/ui/CreateEmployeeForm";

export const CreateEmployee: FC = () => {
  return (
    <RegisteredLayout>
      <CreateEmployeeForm />
    </RegisteredLayout>
  );
};
