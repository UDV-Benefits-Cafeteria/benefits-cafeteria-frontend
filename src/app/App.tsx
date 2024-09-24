import { Suspense, useState } from "react";

import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";

const App = () => {
  const dispatch = useAppDispatch();
  const [sdada, setSdada] = useState();

  return <Suspense fallback={""}></Suspense>;
};
export default App;
