import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/const';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['Story'],
	endpoints: (builder) => ({
		getStories: builder.query({
			query: () => '/newstories.json',
			providesTags: ['Stories'],
		}),
	}),
});

export const { useGetStoriesQuery } = apiSlice;
