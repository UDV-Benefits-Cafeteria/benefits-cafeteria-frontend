import { Suspense } from "react";

import { InputTemplate } from "@shared/ui/Input/InputTemplate";
import { TextTemplate } from "@shared/ui/Text/TextTemplate";
import TitleTemplate from "@shared/ui/Title/TitleTemplate";

import "@shared/styles/index.scss";

const App = () => {
  return (
    <Suspense fallback={""}>
      <TextTemplate />
      <TitleTemplate />
      <InputTemplate />
    </Suspense>
  );
};

export default App;
