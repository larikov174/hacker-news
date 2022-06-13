import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/const';

export const storyApi = createApi({
	reducerPath: 'api/stories',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['Stories'],
	endpoints: (builder) => ({
		getStories: builder.query({
			query: (limit = 5) => `/newstories.json?print=pretty&limitToFirst=${limit}&orderBy="$key"`,
			providesTags: (result) =>
			result
				? [...result.map(({ id }) => ({ type: 'Stories', id })), { type: 'Stories', id: 'LIST' }]
				: [{ type: 'Stories', id: 'LIST' }],
		}),
		// getStoryById: builder.query({
		// 	query: (id) => `/item/${id}.json?print=pretty`,
		// 	providesTags: ['Story'],
		// }),
		getPosts: builder.query({
			async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
				const arrayWithIds = await fetchWithBQ(`/newstories.json?print=pretty&limitToFirst=${_arg}&orderBy="$key"`);
				if (arrayWithIds.error) throw arrayWithIds.error;
				const stories = arrayWithIds.data;
				const promises = stories.map((id) => fetchWithBQ(`/item/${id}.json?print=pretty`));
				const result = await Promise.all(promises);
				return await result.data ? { data: result.data } : { error: result.error };
			},
			providesTags: (result) =>
				result
					? [...result.map(({ id }) => ({ type: 'Stories', id })), { type: 'Stories', id: 'LIST' }]
					: [{ type: 'Stories', id: 'LIST' }],
		}),
	}),
});

export const { useGetPostsQuery, useGetStoriesQuery } = storyApi;
