import { configureStore } from '@reduxjs/toolkit';
import { storyApi } from './story/storyApi';
import { storyReducer } from './story/storySlice';

export const store = configureStore({
	reducer: {
		[storyApi.reducerPath]: storyApi.reducer,
		story: storyReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storyApi.middleware),
});
