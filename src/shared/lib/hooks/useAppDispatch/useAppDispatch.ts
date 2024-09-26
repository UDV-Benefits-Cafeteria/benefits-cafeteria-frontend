import type { AppDispatch } from "@app/providers/StoreProvaider";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
