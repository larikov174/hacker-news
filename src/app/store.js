import { configureStore } from '@reduxjs/toolkit';
import { api } from './features/api/api';
import { storyReducer } from './features/stories/storySlice';
import { commentReducer } from './features/comments/commentSlice';

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		story: storyReducer,
		comment: commentReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
