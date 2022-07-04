import { configureStore } from '@reduxjs/toolkit';
import onlineStore from '../features/onlineStore/onlineStoreSlice';

export const store = configureStore({
  reducer: {
    onlineStore: onlineStore.reducer
  },
});
