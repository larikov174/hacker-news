import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { storyActions } from '../app/story/storySlice';
import { commentActions } from '../app/story/commentSlice';

const allActions = {
	...storyActions,
	...commentActions,
};
export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(allActions, dispatch);
};
