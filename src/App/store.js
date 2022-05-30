import { configureStore } from "@reduxjs/toolkit";
import dentalScheduleReducer from '../features/dentalScheduleSlice/dentalScheduleSlice';

export const store = configureStore({
    reducer: {
        dentalSchedule: dentalScheduleReducer,
    },
})