import { configureStore } from '@reduxjs/toolkit';
import employeesSlice from '../features/employees/employeesSlice';
import jobReducer from "../features/job/jobSlice";
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    job: jobReducer,
    employees: employeesSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});
