import { configureStore } from '@reduxjs/toolkit';
import bicyclesReducer from './slices/bicyclesSlice';

const store = configureStore({
  reducer: {
    bicycles: bicyclesReducer,
  },
});

export default store;
