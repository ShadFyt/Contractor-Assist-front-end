import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    tagTypes: ["Employee", "Jobs"],
    endpoints: builder => ({
        getJobs: builder.query({
            query: () => "/jobs",
            providesTags: ["Jobs"]
        }),
        addNewJob: builder.mutation({
            query: initialJob => ({
                url: "/jobs",
                method: "POST",
                body: initialJob
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
        })
    }),
})


export const {
    useGetEmployeesQuery, useAddNewEmployeeMutation,
    useGetJobsQuery, useAddNewJobMutation,
} = apiSlice