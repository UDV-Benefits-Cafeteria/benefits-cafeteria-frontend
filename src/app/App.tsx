import { type FC, Suspense } from "react";

import { AppRouter } from "@app/providers/AppRouter/AppRouter";

import "@shared/styles/index.scss";

import { AuthProvider } from "./providers/AuthProvider/AuthProvider";
import { StoreProvider } from "./providers/StoreProvider";

import { NotificationProvider } from "./providers/NotificationProvider/NotificationProvider";

import Loader from "@shared/ui/Loader";

const App: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
        <NotificationProvider>
          <StoreProvider>
            <AuthProvider>
              <AppRouter />
            </AuthProvider>
          </StoreProvider>
        </NotificationProvider>
    </Suspense>
  );
};

export default App;
