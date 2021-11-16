import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '1', name: 'Ryan' },
    { id: '2', name: 'Tim' },
    { id: '3', name: 'Bob' },
]

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {

    }
})

export default employeesSlice.reducer