// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Advertisment } from '../types';

const CARDS_ON_PAGE = 6;

// Define a service using a base URL and expected endpoints
export const advertisementApi = createApi({
  reducerPath: 'advertisementApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000/' }),
  tagTypes: ['Advertisements'],
  endpoints: (builder) => ({
    getAdvertisements: builder.query<Advertisment[], number>({
      query: (page: number) =>
        `advertisements?_limit=${CARDS_ON_PAGE}&_start=${page * CARDS_ON_PAGE}`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(
                ({ id }) => ({ type: 'Advertisements', id } as const)
              ),
              { type: 'Advertisements', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Advertisements', id: 'LIST' }],
    }),
    getAdvertisementById: builder.query<Advertisment, string>({
      query: (id) => `advertisements/${id}`,
      providesTags: (result, error, id) => [{ type: 'Advertisements', id }],
    }),
    createAdvertisement: builder.mutation<Advertisment, Partial<Advertisment>>({
      query: (advertisement) => ({
        url: 'advertisements',
        method: 'POST',
        body: advertisement,
      }),
      invalidatesTags: [{ type: 'Advertisements', id: 'LIST' }],
    }),
    deleteAdvertisement: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query(id) {
        return {
          url: `advertisements/${id}`,
          method: 'DELETE',
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'Advertisements', id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAdvertisementsQuery,
  useGetAdvertisementByIdQuery,
  useCreateAdvertisementMutation,
  useDeleteAdvertisementMutation,
} = advertisementApi;
