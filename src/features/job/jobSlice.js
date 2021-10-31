import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import jobs from "../../components/jobs/job_board.json"

export const jobSlice = createSlice({
    name: "job",
    initialState: {
        listOfJobs: jobs,
    },

    reducers: {

    }
})

export const selectJobs = state => state.job.listOfJobs
export default jobSlice.reducer;

