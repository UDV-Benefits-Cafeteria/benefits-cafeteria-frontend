import { type FC, useState } from "react";

import { RegistrationFormEmail, RegistrationFormPassword } from "@feature/RegistrationForm";

import { TSteps } from "@feature/RegistrationForm/model/types/RegistrationForm.types";

type TRegisterFormSwitcherProps = {};

export const RegisterFormSwitcher: FC<TRegisterFormSwitcherProps> = () => {
  const [currentStep, setCurrentStep] = useState<TSteps>("email");

  return (() => {
    switch (currentStep) {
      case "email":
        return <RegistrationFormEmail setCurrentStep={setCurrentStep} />;

      case "password":
        return <RegistrationFormPassword />;

      default:
        return <div></div>;
    }
  })();
};
