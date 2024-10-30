import type { FC } from "react";

import { BarHeader } from "@widgets/BarHeader/ui/BarHeader";
import { BenefitBarView } from "@widgets/BenefitBarView/ui/BenefitBarView";

export const BenefitsBar: FC = () => {
  return (
    <>
      <BarHeader />

      <BenefitBarView />
    </>
  );
};
