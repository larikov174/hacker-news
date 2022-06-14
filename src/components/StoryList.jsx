import styled from 'styled-components';
import StoryCard from './StoryCard';
import { useGetPostsQuery } from '../app/features/api/api';
import { LIST_LIMIT_LENGTH } from '../utils/const';

const Container = styled.section`
	width: 100%;
	height: auto;
	padding: 0 10px;
`;

const StoryList = () => {
	const { data = [], isLoading, isError } = useGetPostsQuery(LIST_LIMIT_LENGTH);
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error occurred</div>;

	return (
		<Container>
			{data.map((story) => (
				<StoryCard key={story.data.id} story={story.data} />
			))}
		</Container>
	);
};

export default StoryList;
