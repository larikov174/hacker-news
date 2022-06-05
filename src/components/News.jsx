import styled from 'styled-components';
import useFetch from '../hooks/useFetch';

const News = () => {
	const { loading, error, data } = useFetch('https://hacker-news.firebaseio.com/v0/newstories.json');
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
