import type { FC } from "react";

import { RegisteredLayout } from "@shared/Layout/RegisteredLayout";
import { LegalEntitiesView } from "@widgets/LegalEntitiesView/ui/LegalEntitiesView";

export const LegalEntities: FC = () => {
  return (
    <RegisteredLayout>
      <LegalEntitiesView />
    </RegisteredLayout>
  );
};
