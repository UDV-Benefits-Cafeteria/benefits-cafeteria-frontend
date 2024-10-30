import type { FC } from "react";

import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputField } from "@shared/ui/Input/InputField";

export const SearchBar: FC = () => {
  return (
    <InputContainer>
      <InputField icon={"loupe"} />
    </InputContainer>
  );
};
