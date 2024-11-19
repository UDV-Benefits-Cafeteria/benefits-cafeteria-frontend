import type { FC } from "react";

import { useGetBenefitQuery } from "@entity/Benefit/api/Benefit.api";
import { RegisteredLayout } from "@shared/Layout/RegisteredLayout";
import { CreateBenefitForm } from "@widgets/CreateBenefitForm/ui/CreateBenefitForm";
import { useLocation } from "react-router-dom";

export const BenefitEdit: FC = () => {
  const pathname = useLocation().pathname;
  const benefit = useGetBenefitQuery(Number(pathname.split("/")[3])).data;

  return (
    <RegisteredLayout>
      <CreateBenefitForm benefit={benefit} />
    </RegisteredLayout>
  );
};
