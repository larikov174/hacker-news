import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/const';

export const storyApi = createApi({
	reducerPath: 'api/stories',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['Stories'],
	endpoints: (builder) => ({
		// getStories: builder.query({
		// 	query: (limit = 5) => `/newstories.json?print=pretty&limitToFirst=${limit}&orderBy="$key"`,
		// 	providesTags: (result) =>
		// 		result
		// 			? [...result.map(({ id }) => ({ type: 'Stories', id })), { type: 'Stories', id: 'LIST' }]
		// 			: [{ type: 'Stories', id: 'LIST' }],
		// }),
		getPosts: builder.query({
			queryFn: async (limit = 5, _queryApi, _extraOptions, fetchWithBQ) => {
				const arrayWithIds = await fetchWithBQ(`/newstories.json?print=pretty&limitToFirst=${limit}&orderBy="$key"`);
				try {
					const stories = await arrayWithIds.data;
					const promises = stories.map((id) => fetchWithBQ(`/item/${id}.json?print=pretty`));
					const data = await Promise.all(promises);
					return { data };
				} catch (e) {
					return { error: e.message };
				}
			},
			providesTags: (result) =>
				result
					? [...result.map(({ id }) => ({ type: 'Stories', id })), { type: 'Stories', id: 'LIST' }]
					: [{ type: 'Stories', id: 'LIST' }],
		}),
	}),
});

export const { useGetPostsQuery } = storyApi;
