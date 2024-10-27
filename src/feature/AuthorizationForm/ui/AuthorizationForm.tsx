import { type FC, useState } from "react";

import { UserSliceActions, useLoginMutation } from "@entity/User";
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
import { validatePassword } from "@shared/utils/validate/validatePassword";
import { useNavigate } from "react-router-dom";

import { REGISTER } from "@app/providers/AppRouter/AppRouter.config";

const passwordErrorsTexts: Partial<TErrorsTexts> = {
  401: "Не верный пароль",
  404: "Пользователь не верефицирован",
};

const errorsTexts: Partial<TErrorsTexts> = {
  404: "Пользователь не верефицирован",
};

export const AuthorizationForm: FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const dispatch = useAppDispatch();
  const [trigger] = useLoginMutation();

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSave = async () => {
    const isPasswordCorrect = validatePassword(password);
    const isEmailCorrect = validateEmail(email);

    if (!isEmailCorrect) {
      setEmailError("Введите корректный email");

      return;
    }

    if (!isPasswordCorrect) {
      setPasswordError("Введите корректный пароль");

      return;
    }

    const resp = await trigger({
      email: email,
      password: password,
    });

    if (resp.error) {
      setPasswordError(getRequestError(passwordErrorsTexts, resp.error)!);
      setEmailError(getRequestError(errorsTexts, resp.error)!);
    }

    if (resp.data?.is_success) {
      dispatch(UserSliceActions.setAuth(true));
      navigate("/main");
    }
  };

  const handleChangePassword = (newValue: string) => {
    setPasswordError("");
    setPassword(newValue);
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
        Авторизация
      </Title>

      <FormInputContainer>
        <InputContainer>
          <InputField
            placeholder={"Почта"}
            icon={"mail"}
            isError={!!emailError}
            onChange={e => handleChangeEmail(e.currentTarget.value)}
          />

          <InputErrorText isError={!!emailError}>{emailError}</InputErrorText>
        </InputContainer>

        <InputContainer>
          <InputField
            placeholder={"Пароль"}
            canHide={true}
            icon={"password"}
            onChange={e => handleChangePassword(e.currentTarget.value)}
          />

          <InputErrorText isError={!!passwordError}>{passwordError}</InputErrorText>
        </InputContainer>
      </FormInputContainer>

      <Button onClick={handleSave}>Войти</Button>

      <FormFooter>
        <Text boldness={"medium"}>Еще нет аккаунта?</Text>

        <Text boldness={"medium"}>
          <Link route={REGISTER}>Зарегистрироваться</Link>
        </Text>
      </FormFooter>
    </FormContainer>
  );
};
