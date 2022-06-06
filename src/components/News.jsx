import styled from 'styled-components';
import useFetch from '../hooks/useFetch';
import { BASE_URI } from '../utils/const';
import useApi from '../hooks/useApi';

const News = () => {
	// console.log(useApi());
	const { loading, error, data } = useFetch(`${BASE_URI}/newstories.json`);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div>
			{data.map((review) => (
				<div key={review} className='review-card'>
					<p>{review}</p>
				</div>
			))}
		</div>
	);
};

export default News;
