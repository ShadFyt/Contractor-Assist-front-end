import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

import jobs from "../../components/jobs/job_board.json"

export const jobSlice = createSlice({
    name: "job",
    initialState: {
        listOfJobs: jobs,
    },

    reducers: {
        employeesAdded: {
            reducer(state, action) {
                const { jobId } = action.payload
                const existingJob = state.listOfJobs.find(job => job.id === parseInt(jobId))
                if (existingJob) {
                    existingJob.workers.push(action.payload)
                }
            },
            prepare(jobId, data) {
                return {
                    payload: {
                        ...data,
                        jobId,
                        id: nanoid()
                    }
                }
            }
        },

        expenseAdded: {
            reducer(state, action) {
                console.log("from reducer", action.payload)
                const { jobId } = action.payload
                const existingJob = state.listOfJobs.find(job => job.id === parseInt(jobId))
                if (existingJob) {
                    existingJob.expenses.push(action.payload)
                }
            },
            prepare(expense) {
                return {
                    payload: {
                        ...expense,
                        id: nanoid(),
                    }
                }
            }
        },

        taskEdited(state, action) {
            const { jobId, taskId, value } = action.payload
            const existingJob = state.listOfJobs.find(job => job.id === parseInt(jobId))
            const existingTask = existingJob.tasks.find(task => task.id === taskId)
            if (existingTask) {
                existingTask.task = value
                console.log(" from redux: task is set to", existingTask.task)
            }
        },

        taskIsCompleteUpdate(state, action) {
            const { jobId, taskId, isComplete } = action.payload
            console.log(jobId, isComplete)
            const existingJob = state.listOfJobs.find(job => job.id === parseInt(jobId))
            const existingTask = existingJob.tasks.find(task => task.id === taskId)
            if (existingTask) {
                console.log("task found", existingTask)
                existingTask.isComplete = !isComplete
                console.log("task is set to", existingTask.isComplete)
            }
        },

        taskAdded: {
            reducer(state, action) {
                const { jobId } = action.payload
                const existingJob = state.listOfJobs.find(job => job.id === parseInt(jobId))
                if (existingJob) {
                    existingJob.tasks.push(action.payload)
                    console.log(action.payload)
                }
            },
            prepare(jobId, task) {
                return {
                    payload: {
                        jobId,
                        task,
                        id: nanoid(),
                        isComplete: false
                    }
                }
            }
        },

        taskDeleted(state, action) {
            const { jobId, taskId } = action.payload
            console.log(jobId, taskId)
            const existingJob = state.listOfJobs.find(job => job.id === parseInt(jobId))
            const existingTask = existingJob.tasks.find(task => task.id === taskId)
            if (existingTask) {
                const index = existingJob.tasks.indexOf(existingTask)
                existingJob.tasks.splice(index, 1)
                console.log(`Task ${existingTask.task}: deleted`)
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

export const {
    jobAdded,
    clientUpdated,
    jobDeleted, employeesAdded,
    taskAdded, taskIsCompleteUpdate, taskEdited, taskDeleted,
    expenseAdded
} = jobSlice.actions
export const selectJobs = state => state.job.listOfJobs
export default jobSlice.reducer;

