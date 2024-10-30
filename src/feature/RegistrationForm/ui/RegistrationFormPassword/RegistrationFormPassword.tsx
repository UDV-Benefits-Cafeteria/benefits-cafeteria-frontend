import { type FC, useState } from "react";

import { useSetPasswordMutation } from "@entity/User/api/User.api";
import { UserSliceActions } from "@entity/User/model/slice/User.slice";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
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
import { validatePassword } from "@shared/utils/validate/validatePassword";
import { useNavigate } from "react-router-dom";

import { LOGIN } from "@app/providers/AppRouter/AppRouter.config";

type TRegistrationFormProps = {};

const errorsTexts: Partial<TErrorsTexts> = {
  404: "Пользователь не найден",
};

export const RegistrationFormPassword: FC<TRegistrationFormProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = useAppSelector(state => state.registrationForm.id);

  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [secondPasswordError, setSecondPasswordError] = useState<string>("");
  const [trigger] = useSetPasswordMutation();

  const savePassword = async () => {
    const isPasswordCorrect = validatePassword(password);
    const isSecondPasswordCorrect = password === secondPassword;

    if (!isPasswordCorrect) {
      setPasswordError("Введите корректный email");

      return;
    }

    if (!isSecondPasswordCorrect) {
      setSecondPasswordError("Пароли не совпадают");

      return;
    }

    const resp = await trigger({ id: id, password: password, re_password: secondPassword });

    if (resp.error) setPasswordError(getRequestError(errorsTexts, resp.error)!);

    if (resp.data) {
      dispatch(UserSliceActions.setAuth(true));
      navigate("/main");
    }
  };

  const handleChangePassword = (newValue: string) => {
    setPasswordError("");
    setPassword(newValue);
  };

  const handleChangeSecondPassword = (newValue: string) => {
    setSecondPassword("");
    setSecondPassword(newValue);
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
        <InputContainer>
          <InputField
            placeholder={"Пароль"}
            canHide={true}
            icon={"password"}
            onChange={e => handleChangePassword(e.currentTarget.value)}
          />

          <InputErrorText isError={!!passwordError}>{passwordError}</InputErrorText>
        </InputContainer>

        <InputContainer>
          <InputField
            placeholder={"Повторите пароль"}
            canHide={true}
            icon={"password"}
            onChange={e => handleChangeSecondPassword(e.currentTarget.value)}
          />

          <InputErrorText isError={!!secondPasswordError}>{secondPasswordError}</InputErrorText>
        </InputContainer>
      </FormInputContainer>

      <Button onClick={savePassword}>Зарегистрироваться</Button>

      <FormFooter>
        <Text boldness={"medium"}>Уже есть аккаунт?</Text>

        <Text boldness={"medium"}>
          <Link route={LOGIN}>Войти</Link>
        </Text>
      </FormFooter>
    </FormContainer>
  );
};
