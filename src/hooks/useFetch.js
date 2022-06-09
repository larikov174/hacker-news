import { useEffect, useState } from 'react';
import { BASE_URL, LIST_LIMIT_LENGTH } from '../utils/const';

const useFetch = () => {
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getNewStories() {
			try {
				const newStories = await fetch(`${BASE_URL}/newstories.json`);

				if (!newStories.ok) {
					throw new Error(`${newStories.status} ${newStories.statusText}`);
				}

				const newStoriesArray = await newStories.json();
				const promises = newStoriesArray
					.slice(0, LIST_LIMIT_LENGTH)
					.map((id) => fetch(`${BASE_URL}/item/${id}.json`).then((storie) => storie.json()));
				const result = await Promise.all(promises);
				setLoading(false);
				setPosts(result);
			} catch (err) {
				setLoading(false);
				setError(err);
				console.error(err);
			}
		}
		getNewStories();
	}, []);

	return { loading, error, posts };
};

export default useFetch;
