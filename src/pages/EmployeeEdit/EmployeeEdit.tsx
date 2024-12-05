import type { FC } from "react";

import { useGetCurrentUserQuery } from "@entity/User";
import { RegisteredLayout } from "@shared/Layout/RegisteredLayout";
import { CreateEmployeeForm } from "@widgets/CreateEmployeeForm/ui/CreateEmployeeForm";
import { useLocation } from "react-router-dom";

export const EmployeeEdit: FC = () => {
  const pathname = useLocation().pathname;

  const user = useGetCurrentUserQuery(Number(pathname.split("/")[3])).data;

  return (
    <RegisteredLayout>
      <CreateEmployeeForm user={user} />
    </RegisteredLayout>
  );
};
