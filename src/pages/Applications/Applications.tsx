import type { FC } from "react";

import { RegisteredLayout } from "@shared/Layout/RegisteredLayout";
import { ApplicationsView } from "@widgets/ApplicationsView/ui/ApplicationsView";

export const Applications: FC = () => {
  return (
    <RegisteredLayout>
      <ApplicationsView />
    </RegisteredLayout>
  );
};
