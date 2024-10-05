import { type FC, Suspense } from "react";

import { ThemeSwitcher } from "@shared/ui/ThemeSwitcher/ThemeSwitcher";

import "@shared/styles/index.scss";

const App: FC = () => {
  return (
    <Suspense fallback={""}>
      <ThemeSwitcher />
    </Suspense>
  );
};

export default App;
