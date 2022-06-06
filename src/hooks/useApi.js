import { BASE_URI } from '../utils/const';
import { useState } from 'react';

const useApi = async () => {
	const [data, setData] = useState(null);

	async function getNewsArray() {
		const res = await fetch(`${BASE_URI}/newstories.json`);
		const arr = await res.json();
		return arr;
	}

	getNewsArray().then((array) => {
		return setData(
			array.splice(0,3).map(async (id) => {
				const res = await fetch (`${BASE_URI}/item/${id}.json`)
				const obj = await res.json();
				return obj;
			})
		);
	});

	return data;
};

export default useApi;

// async getNewsItem (id) {
// 	const res = await fetch(`${BASE_URI}/item/${id}.json`, {
// 		method: 'GET'
// 	});
// 	return handleResponse(res);
// },

// async getLatestNewsData (array) {
// 	array.splice(0,5).map(id => {
// 		fetch(`${BASE_URI}/item/${id}.json`, {
// 			method: 'GET'
// 		});
// 		return handleResponse(res);
// 	})
// }
