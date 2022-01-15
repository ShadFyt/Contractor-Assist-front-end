import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';


export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
    const res = await fetch("http://localhost:8000/jobs")
    console.log("fetching from api")
    const jobs = res.json()
    console.log(jobs)
    return jobs
})

export const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        listOfJobs: [],
        status: "idle",
        error: null
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
    },
    extraReducers(builder) {
        builder.addCase(
            fetchJobs.pending, (state, action) => {
                state.status = "loading"
            }
        ).addCase(
            fetchJobs.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.listOfJobs = state.listOfJobs.concat(action.payload)
                console.log("new list of jobs", state.listOfJobs)
            }
        ).addCase(
            fetchJobs.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            }
        )
    }
})

export const {
    jobAdded,
    clientUpdated,
    jobDeleted, employeesAdded,
    taskAdded, taskIsCompleteUpdate, taskEdited, taskDeleted,
    expenseAdded
} = jobSlice.actions
export default jobSlice.reducer;

export const selectAllJobs = state => state.job.listOfJobs

export const selectJobById = (state, jobId) =>
    state.job.listOfJobs.find(job => job.id === jobId)


