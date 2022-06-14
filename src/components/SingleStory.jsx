import styled from 'styled-components';
import StoryCard from './StoryCard';
import { useSelector } from 'react-redux';
import { useGetCommentsQuery } from '../app/story/storyApi';

const Container = styled.section`
	width: 100%;
	height: auto;
	padding: 0 10px;
`;

const SingleStory = () => {
	const {story} = useSelector(state=>state)
	const { data = [], isLoading, error } = useGetCommentsQuery(story[0].kids)
	// if (isLoading) return <div>Loading...</div>;
	// if (isError) return <div>Error occurred</div>;

	return (
		<Container>
			{story && <StoryCard story={story[0]} comments={data} loadingComments={isLoading} errorOnLoadComments={error} />}
		</Container>
	)
};

export default SingleStory;
