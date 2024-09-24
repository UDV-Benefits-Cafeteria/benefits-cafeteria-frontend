import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@app/providers/StoreProvaider';

export const useAppDispatch = () => useDispatch<AppDispatch>();
