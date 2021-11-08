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
        },
        jobUpdated(state, action) {
            const { id, jobName, isComplete, contact, detail, } = action.payload
            const existingJob = state.listOfJobs.find(job => job.id === id)
            if (existingJob) {
                console.log("found", existingJob)
            }
        },
        jobDeleted(state, action) {
            const { id } = action.payload
            const existingJob = state.listOfJobs.find(job => job.id === id)
            if (existingJob) {
                console.log(existingJob.id)
                const index = state.listOfJobs.indexOf(existingJob)
                state.listOfJobs.splice(index, 1)
            }
        }
    }
})

export const { jobAdded, jobUpdated, jobDeleted } = jobSlice.actions
export const selectJobs = state => state.job.listOfJobs
export default jobSlice.reducer;

