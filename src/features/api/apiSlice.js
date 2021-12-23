import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    tagTypes: ["Employee", "Jobs", "Clients"],
    endpoints: builder => ({
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
            query: job => ({
                url: `/jobs/${job.id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Jobs"]
        }),
        getEmployees: builder.query({
            query: () => "/employees",
            providesTags: ["Employee"]
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
        })
    }),
})


export const {
    useGetEmployeesQuery, useAddNewEmployeeMutation,
    useGetJobsQuery, useAddNewJobMutation, useDeleteJobMutation, useGetJobByIdQuery,
    useGetClientsQuery, useAddNewClientMutation, useGetClientByIdQuery,
} = apiSlice