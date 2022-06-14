import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/const';

export const storyApi = createApi({
	reducerPath: 'api/stories',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['Stories', 'Comments'],
	endpoints: (builder) => ({
		getPosts: builder.query({
			queryFn: async (limit = 5, _queryApi, _extraOptions, fetchWithBQ) => {
				const arrayWithIds = await fetchWithBQ(`/newstories.json?print=pretty&limitToFirst=${limit}&orderBy="$key"`);
				try {
					const stories = await arrayWithIds.data;
					const promises = stories.map((id) => fetchWithBQ(`/item/${id}.json?print=pretty`));
					const arr = await Promise.all(promises);
					const data = JSON.parse(JSON.stringify(arr));
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
		getComments: builder.query({
			queryFn: async (commentsArray, _queryApi, _extraOptions, fetchWithBQ) => {
				try {
					const promises = commentsArray.map((id) => fetchWithBQ(`/item/${id}.json?print=pretty`));
					const arr = await Promise.all(promises);
					const data = JSON.parse(JSON.stringify(arr));
					return { data };
				} catch (e) {
					return { error: e.message };
				}
			},
			providesTags: (result) =>
				result
					? [...result.map(({ id }) => ({ type: 'Comments', id })), { type: 'Comments', id: 'LIST' }]
					: [{ type: 'Comments', id: 'LIST' }],
		}),
	}),
});

export const { useGetPostsQuery, useGetCommentsQuery } = storyApi;
