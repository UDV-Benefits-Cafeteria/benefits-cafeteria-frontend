import { type FC, useState } from "react";

import { useVerifyEmailMutation } from "@entity/User/api/User.api";
import { RegistrationFormEmail, RegistrationFormPassword } from "@feature/RegistrationForm";
import { type TErrorsTexts, getRequestError } from "@shared/utils/getRequestError";
import { validateEmail } from "@shared/utils/validate/validateEmail";

type TRegisterFormSwitcherProps = {};

type TSteps = "password" | "email" | "password_confirmation";

const errorsTexts: Partial<TErrorsTexts> = {
  404: "Пользователь не найден",
};

export const RegisterFormSwitcher: FC<TRegisterFormSwitcherProps> = props => {
  const {} = props;
  const [currentStep, setCurrentStep] = useState<TSteps>("email");
  const [trigger] = useVerifyEmailMutation();

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const handleChangeEmail = (newValue: string) => {
    setEmailError("");
    setEmail(newValue);
  };

  const saveEmail = async () => {
    const isCorrect = validateEmail(email);

    if (!isCorrect) {
      setEmailError("Введите корректный email");

      return;
    }

    const resp = await trigger({ email: email });

    if (resp.error) setEmailError(getRequestError(errorsTexts, resp.error)!);

    if (resp.data?.id) setCurrentStep("password");
  };

  const savePassword = async () => {
    if (error) return;

    await trigger({ email: email });
    setCurrentStep("email");
    setEmailError("Ошибка запроса");
  };

  return (() => {
    switch (currentStep) {
      case "email":
        return (
          <RegistrationFormEmail
            saveEmail={saveEmail}
            error={emailError}
            handleChangeEmail={handleChangeEmail}
          />
        );

      case "password":
        return <RegistrationFormPassword />;

      default:
        return <div></div>;
    }
  })();
};
