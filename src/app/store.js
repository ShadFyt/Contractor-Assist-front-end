import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/job/jobSlice';

export const store = configureStore({
  reducer: {
    job: jobReducer,
  },
});
