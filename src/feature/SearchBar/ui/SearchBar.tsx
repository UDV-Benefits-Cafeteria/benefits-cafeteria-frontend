import type { FC } from "react";

import { InputContainer } from "@shared/ui/Input/InputContainer";
import { InputField } from "@shared/ui/Input/InputField";

export const SearchBar: FC = ({ setValue, value }) => {
  return (
    <InputContainer>
      <InputField
        icon={"loupe"}
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
      />
    </InputContainer>
  );
};
