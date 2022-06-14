import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { storyActions } from '../app/features/stories/storySlice';
import { commentActions } from '../app/features/comments/commentSlice';

const allActions = {
	...storyActions,
	...commentActions,
};
export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(allActions, dispatch);
};
