import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const storySlice = createSlice({
	name: 'slice/story',
	initialState,
	reducers: {
		selectStory: (state, action) => {
			state.push(action.payload);
		},
		clearSelectedStories: (state, action) => {
			state.length = 0;
			return state;
		},
	},
});

export const storyReducer = storySlice.reducer;
export const storyActions = storySlice.actions;
