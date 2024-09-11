// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Advertisment } from '../types';

const CARDS_ON_PAGE = 6;

// Define a service using a base URL and expected endpoints
export const advertisementApi = createApi({
  reducerPath: 'advertisementApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000/' }),
  endpoints: (builder) => ({
    getAdvertisements: builder.query<Advertisment[], number>({
      query: (page: number) =>
        `advertisements?_limit=${CARDS_ON_PAGE}&_start=${page * CARDS_ON_PAGE}`,
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
