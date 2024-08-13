import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://test-front.framework.team/' }),
  tagTypes: ['Paintings'],
  endpoints: builder => ({
    getAuthors: builder.query({
      query: () => 'authors',
    }),
    getLocations: builder.query({
      query: () => 'locations',
    }),
    getPaintingWhithSeachAndFilters: builder.query({
      query: (query = '') => ({
        url: `paintings${query}`,
        invalidatesTags: ['Paintings'],
      }),
    }),
    getAuthorsWhithSeachAndFilters: builder.query({
      query: (query = '') => ({
        url: `authors${query}`,
        providesTags: ['Paintings'],
      }),
    }),
    getLocationsWhithSeachAndFilters: builder.query({
      query: (query = '') => ({
        url: `locations${query}`,
        providesTags: ['Paintings'],
      }),
    }),
  }),
});

export const {
  useGetAuthorsQuery,
  useGetLocationsQuery,
  useGetPaintingWhithSeachAndFiltersQuery,
  useGetAuthorsWhithSeachAndFiltersQuery,
  useGetLocationsWhithSeachAndFiltersQuery,
} = apiSlice;
