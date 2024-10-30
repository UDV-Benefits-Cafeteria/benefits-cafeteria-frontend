import type { FC } from "react";

import { RegisteredLayout } from "@shared/Layout/RegisteredLayout";
import { CreateBenefitForm } from "@widgets/CreateBenefitForm/ui/CreateBenefitForm";

export const CreateBenefit: FC = () => {
  return (
    <RegisteredLayout>
      <CreateBenefitForm />
    </RegisteredLayout>
  );
};
