import { type FC, useState } from "react";

import { useVerifyEmailMutation } from "@entity/User/api/User.api";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button } from "@shared/ui/Button";
import { FormContainer } from "@shared/ui/Form/FormContainer";
import { FormFooter } from "@shared/ui/Form/FormFooter";
import { FormInputContainer } from "@shared/ui/Form/FormInputContainer";
import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputErrorText } from "@shared/ui/Input/InputErrorText";
import { InputField } from "@shared/ui/Input/InputField";
import { Link } from "@shared/ui/Link";
import { Text } from "@shared/ui/Text";
import { Title } from "@shared/ui/Title";
import { type TErrorsTexts, getRequestError } from "@shared/utils/getRequestError";
import { validateEmail } from "@shared/utils/validate/validateEmail";

import type { TSteps } from "../../model/types/RegistrationForm.types";

import styles from "../../styles/RegistrationForm.module.scss";

import { RegistrationFormSliceActions } from "../../model/slice/RegistrationForm.slice";

type TRegistrationFormProps = {
  setCurrentStep: (value: TSteps) => void;
};

const errorsTexts: Partial<TErrorsTexts> = {
  404: "Пользователь не найден",
};

export const RegistrationFormEmail: FC<TRegistrationFormProps> = props => {
  const { setCurrentStep } = props;
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [trigger] = useVerifyEmailMutation();
  const dispatch = useAppDispatch();

  const saveEmail = async () => {
    const isCorrect = validateEmail(email);

    if (!isCorrect) {
      setEmailError("Введите корректный email");

      return;
    }

    const resp = await trigger({ email: email });

    if (resp.error) setEmailError(getRequestError(errorsTexts, resp.error)!);

    const id = resp.data?.id;

    if (id) {
      dispatch(RegistrationFormSliceActions.setId(id));
      setCurrentStep("password");
    }
  };

  const handleChangeEmail = (newValue: string) => {
    setEmailError("");
    setEmail(newValue);
  };

  return (
    <FormContainer>
      <Title
        type={"page"}
        boldness={"normal"}
      >
        Регистрация
      </Title>

      <FormInputContainer>
        <Text
          className={styles.description}
          type={"description"}
        >
          Для регистрации необходима почта, на&nbsp;которую поступило приглашение.
        </Text>

        <InputContainer>
          <InputField
            placeholder={"Почта"}
            icon={"mail"}
            isError={!!emailError}
            onChange={e => handleChangeEmail(e.currentTarget.value)}
          />

          <InputErrorText isError={!!emailError}>{emailError}</InputErrorText>
        </InputContainer>
      </FormInputContainer>

      <Button
        onClick={saveEmail}
        disabled={!!emailError}
      >
        Продолжить
      </Button>

      <FormFooter>
        <Text boldness={"medium"}>Уже есть аккаунт?</Text>

        <Text boldness={"medium"}>
          <Link route={"/login"}>Войти</Link>
        </Text>
      </FormFooter>
    </FormContainer>
  );
};
