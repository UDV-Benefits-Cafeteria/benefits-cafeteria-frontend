import type { FC } from "react";

import { RegisteredLayout } from "@shared/Layout/RegisteredLayout";
import { ViewBenefits } from "@widgets/ViewBenefits/ui/ViewBenefits";

export const Benefits: FC = () => {
  return (
    <RegisteredLayout>
      <ViewBenefits />
    </RegisteredLayout>
  );
};
