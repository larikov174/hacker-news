import { BASE_URL, LIST_LIMIT_LENGTH } from '../utils/const';
import { useState, useEffect } from 'react';

export default function useMainApi() {
	const [stories, setStories] = useState(null);
	const [story, setStory] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const getStoryById = (id) => {
		fetch(`${BASE_URL}/item/${id}.json`)
			.then((item) => item.json())
			.then((res) => setStory(res))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	};

	async function getStories() {
		const rowData = await fetch(`${BASE_URL}/newstories.json`);
		try {
			const arrayWithIds = await rowData.json();
			const promises = arrayWithIds
				.slice(0, LIST_LIMIT_LENGTH)
				.map((id) => fetch(`${BASE_URL}/item/${id}.json`)
				.then((storie) => storie.json()));
			const result = await Promise.all(promises);
			setLoading(false);
			setStories(result);
		} catch (err) {
			setError(err);
			console.error(err);
		}
	}
	useEffect(() => {
		getStories();
	}, []);

	return {
		loading,
		error,
		stories,
		story,
		getStories,
		getStoryById,
	};
}
