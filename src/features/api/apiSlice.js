import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000",
        // baseUrl: "https://contractor-assister.herokuapp.com",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
                console.log("Header token set to: ", token)
            }

            return headers
        },
    }),
    tagTypes: ["Employee", "Jobs", "Clients", "TimeEntries", "Tasks"],
    endpoints: builder => ({
        getToken: builder.mutation({
            query: (data) => ({
                url: "/admin/token",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `grant_type=&username=${data.username}&password=${data.password}&scope=&client_id=&client_secret=`
            })
        }),
        getJobs: builder.query({
            query: () => "/jobs",
            providesTags: ["Jobs"]
        }),
        getJobById: builder.query({
            query: jobId => `/jobs/${jobId}`
        }),
        addNewJob: builder.mutation({
            query: initialJob => ({
                url: "/jobs",
                method: "POST",
                body: initialJob
            }),
            invalidatesTags: ["Jobs"]
        }),
        deleteJob: builder.mutation({
            query: (id) => ({
                url: `/jobs/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Jobs"]
        }),
        getEmployees: builder.query({
            query: () => "/employees",
            providesTags: ["Employee"]
        }),
        getEmployeeById: builder.query({
            query: id => `/employees/${id}`
        }),
        getEmployeeByName: builder.query({
            query: name => `/employees/name/${name}`
        }),
        addNewEmployee: builder.mutation({
            query: initialEmployee => ({
                url: "/employees",
                method: "POST",
                body: initialEmployee
            }),
            invalidatesTags: ["Employee"]
        }),
        getClients: builder.query({
            query: () => "/clients",
            providesTags: ["Clients"]
        }),
        getClientById: builder.query({
            query: clientId => `/clients/${clientId}`
        }),
        addNewClient: builder.mutation({
            query: initialClient => ({
                url: "/clients",
                method: "POST",
                body: initialClient
            }),
            invalidatesTags: ["Clients"]
        }),
        getTimeEntriesByWeek: builder.query({
            query: week => `/time_sheet/week/${week}`,
            providesTags: ["TimeEntries"]
        }),
        getTimeEntriesByJob: builder.query({
            query: jobId => `/time_sheet/job/${jobId}`,
            providesTags: ["TimeEntries"]
        }),
        getTimeEntryById: builder.query({
            query: (id) => `/time_sheet/${id}`,
        }),
        addNewTimeEntry: builder.mutation({
            query: (initialTimeEntry) => ({
                url: `/time_sheet/employee/${initialTimeEntry.employeeId}`,
                method: "POST",
                body: initialTimeEntry,
            }),
            invalidatesTags: ["TimeEntries"]
        }),
        updateTimeEntry: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/time_sheet/${id}`,
                method: "PATCH",
                body: patch
            }),
            invalidatesTags: ["TimeEntries"]
        }),
        deleteTimeEntry: builder.mutation({
            query: (id) => ({
                url: `/time_sheet/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["TimeEntries"]
        }),
        getTasksByJob: builder.query({
            query: jobId => `/tasks/${jobId}`,
            providesTags: ["Tasks"]
        }),
        addNewTask: builder.mutation({
            query: ({ jobId, ...task }) => ({
                url: `/tasks/${jobId}`,
                method: "POST",
                body: task
            }),
            invalidatesTags: ["Tasks"]
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Tasks"]
        }),
        updateTask: builder.mutation({
            query: ({ taskId, ...patch }) => ({
                url: `/tasks/${taskId}`,
                method: "PATCH",
                body: patch
            }),
            invalidatesTags: ["Tasks"]
        }),
    }),
})


export const {
    useGetEmployeesQuery, useAddNewEmployeeMutation, useGetEmployeeByNameQuery, useGetEmployeeByIdQuery,
    useGetJobsQuery, useAddNewJobMutation, useDeleteJobMutation, useGetJobByIdQuery,
    useGetClientsQuery, useAddNewClientMutation, useGetClientByIdQuery,
    useAddNewTimeEntryMutation, useGetTimeEntriesByJobQuery, useDeleteTimeEntryMutation,
    useUpdateTimeEntryMutation, useGetTimeEntryByIdQuery, useGetTimeEntriesByWeekQuery,
    useAddNewTaskMutation, useGetTasksByJobQuery, useDeleteTaskMutation, useUpdateTaskMutation,
    useGetTokenMutation,
} = apiSlice