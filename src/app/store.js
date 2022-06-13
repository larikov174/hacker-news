import { configureStore } from '@reduxjs/toolkit';
import { storyApi } from './story/storyApi';

export const store = configureStore({
	reducer: {
		[storyApi.reducerPath]: storyApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storyApi.middleware),
});
