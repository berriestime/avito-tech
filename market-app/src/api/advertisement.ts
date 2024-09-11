// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Advertisment } from '../types';

// Define a service using a base URL and expected endpoints
export const advertisementApi = createApi({
  reducerPath: 'advertisementApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000/' }),
  endpoints: (builder) => ({
    getAdvertisements: builder.query<Advertisment[], void>({
      query: () => `advertisements`,
    }),
    getAdvertisementById: builder.query<Advertisment, string>({
      query: (id) => `advertisements/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAdvertisementsQuery, useGetAdvertisementByIdQuery } =
  advertisementApi;
