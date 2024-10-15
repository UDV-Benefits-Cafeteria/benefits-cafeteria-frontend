import { type FC, Suspense } from "react";

import { AppRouter } from "@app/providers/AppRouter/AppRouter";

import "@shared/styles/index.scss";

import { AuthProvider } from "./providers/AuthProvider/AuthProvider";
import { StoreProvider } from "./providers/StoreProvider";

const App: FC = () => {
  return (
    <Suspense fallback={""}>
      <StoreProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </StoreProvider>
    </Suspense>
  );
};

export default App;
