import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Advertisment } from '../types';

const CARDS_ON_PAGE = 6;

export const advertisementApi = createApi({
  reducerPath: 'advertisementApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000/' }),
  tagTypes: ['Advertisements'],
  endpoints: (builder) => ({
    getAdvertisements: builder.query<Advertisment[], number>({
      query: (page: number) =>
        `advertisements?_limit=${CARDS_ON_PAGE}&_start=${page * CARDS_ON_PAGE}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ id }) => ({ type: 'Advertisements', id } as const)
              ),
              { type: 'Advertisements', id: 'LIST' },
            ]
          : [{ type: 'Advertisements', id: 'LIST' }],
    }),
    getAdvertisementById: builder.query<Advertisment, string>({
      query: (id) => `advertisements/${id}`,
      providesTags: (result, error, id) => [{ type: 'Advertisements', id }],
    }),
    createAdvertisement: builder.mutation<Advertisment, Partial<Advertisment>>({
      query: (advertisement) => ({
        url: 'advertisements',
        method: 'POST',
        body: {
          ...advertisement,
          createdAt: new Date().toISOString(),
          views: 0,
          likes: 0,
        },
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
      invalidatesTags: (result, error, id) => [{ type: 'Advertisements', id }],
    }),
  }),
});

export const {
  useGetAdvertisementsQuery,
  useGetAdvertisementByIdQuery,
  useCreateAdvertisementMutation,
  useDeleteAdvertisementMutation,
} = advertisementApi;
