import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const commentSlice = createSlice({
	name: 'slice/comment',
	initialState,
	reducers: {
		addComments: (state, action) => {
			state.push(action.payload);
		},
		clearComments: (state, action) => {
			state.length = 0;
			return state;
		},
	},
});

export const commentReducer = commentSlice.reducer;
export const commentActions = commentSlice.actions;
