import styled from 'styled-components';
import { useGetPostsQuery } from '../app/features/api/api';
import { StyledText } from '../ui/text';
import { LIST_LIMIT_LENGTH } from '../utils/const';
import StoryCard from './StoryCard';

const Container = styled.section`
	width: 100%;
	height: auto;
	padding: 0 10px;
`;

const StoryList = () => {
	const { data = [], isLoading, isError } = useGetPostsQuery(LIST_LIMIT_LENGTH);
	if (isLoading) return <StyledText grey marginTop='20'>Loading...</StyledText>;
	if (isError) return <StyledText grey>Error occurred</StyledText>;

	return (
		<Container>
			{data.map((story) => (
				<StoryCard key={story.data.id} story={story.data} />
			))}
		</Container>
	);
};

export default StoryList;
