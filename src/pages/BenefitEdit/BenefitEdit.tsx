import type { FC } from "react";

import { RegisteredLayout } from "@shared/Layout/RegisteredLayout";
import { CreateBenefitForm } from "@widgets/CreateBenefitForm/ui/CreateBenefitForm";

export const BenefitEdit: FC = () => {
  return (
    <RegisteredLayout>
      <CreateBenefitForm isEdit={true} />
    </RegisteredLayout>
  );
};
