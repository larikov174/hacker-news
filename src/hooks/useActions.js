import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { storyActions } from "../app/story/storySlice"

const allActions = {
	...storyActions
}
export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(allActions, dispatch)
}