import { configureStore } from '@reduxjs/toolkit';
import { storyApi } from './story/storyApi';
import { storyReducer } from './story/storySlice';
import { commentReducer } from './story/commentSlice';

export const store = configureStore({
	reducer: {
		[storyApi.reducerPath]: storyApi.reducer,
		story: storyReducer,
		comment: commentReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storyApi.middleware),
});
