import type { RootState } from "@app/providers/StoreProvider/config/store";
import { useSelector } from "react-redux";

export const useAppSelector = useSelector.withTypes<RootState>();
