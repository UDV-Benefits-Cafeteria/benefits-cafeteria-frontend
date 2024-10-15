import { FC } from "react";

import { UnregisteredLayout } from "@shared/Layout/UnregisteredLayout";
import { RegisterFormSwitcher } from "@widgets/RegisterFormSwitcher";

export const RegisterPage: FC = () => {
  return (
    <UnregisteredLayout>
      <RegisterFormSwitcher />
    </UnregisteredLayout>
  );
};
