import { configureStore } from '@reduxjs/toolkit';
import employeesSlice from '../features/employees/employeesSlice';
import jobReducer from "../features/job/jobSlice";

export const store = configureStore({
  reducer: {
    job: jobReducer,
    employees: employeesSlice,
  },
});
