import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const jobSlice = createSlice({
    name: "job",
    initialState: {
        listOfJobs: []
    }
})