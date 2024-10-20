import { FC } from "react";

import { AuthorizationForm } from "@feature/AuthorizationForm/ui/AuthorizationForm";
import { UnregisteredLayout } from "@shared/Layout/UnregisteredLayout";

export const AuthorizationPage: FC = () => {
  return (
    <UnregisteredLayout>
      <AuthorizationForm />
    </UnregisteredLayout>
  );
};
