import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import jobs from "../../components/jobs/job_board.json"

export const jobSlice = createSlice({
    name: "job",
    initialState: {
        listOfJobs: jobs,
    },

    reducers: {
        jobAdded(state, action) {
            state.listOfJobs.push(action.payload)
        }
    }
})

export const { jobAdded } = jobSlice.actions
export const selectJobs = state => state.job.listOfJobs
export default jobSlice.reducer;

