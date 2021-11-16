import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

import jobs from "../../components/jobs/job_board.json"

export const jobSlice = createSlice({
    name: "job",
    initialState: {
        listOfJobs: jobs,
    },

    reducers: {
        employeesAdded(state, action) {
            const { id, data } = action.payload
            const existingJob = state.listOfJobs.find(job => job.id === parseInt(id))
            if (existingJob) {
                existingJob.workers.push(data)
            }
        },
        jobAdded: {
            reducer(state, action) {
                state.listOfJobs.push(action.payload)
            },
            prepare(...rest) {
                return {
                    payload: {
                        ...rest,
                        id: nanoid()
                    }
                }
            }
        },
        clientUpdated(state, action) {
            const { id, address, email, number } = action.payload
            const existingJob = state.listOfJobs.find(job => job.id === id)
            if (existingJob) {
                console.log("found", existingJob.contact.owner)
                existingJob.contact.address = address
                existingJob.contact.email = email
                existingJob.contact.number = number
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

export const { jobAdded, clientUpdated, jobDeleted, employeesAdded } = jobSlice.actions
export const selectJobs = state => state.job.listOfJobs
export default jobSlice.reducer;

