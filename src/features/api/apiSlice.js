import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    tagTypes: ["Employee"],
    endpoints: builder => ({
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


export const { useGetEmployeesQuery, useAddNewEmployeeMutation } = apiSlice