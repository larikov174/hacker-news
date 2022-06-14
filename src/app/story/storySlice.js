import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const storySlice = createSlice({
	name: 'story',
	initialState,
	reducers: {
		select: (state, action) => {
			state.push(action.payload);
		},
		clearSelected: (state, action) => {
			state.length = 0;
			return state;
		},
	},
});

export const storyReducer = storySlice.reducer;
export const storyActions = storySlice.actions;
