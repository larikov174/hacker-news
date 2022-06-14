import styled from 'styled-components';
import StoryCard from './StoryCard';
import { useSelector } from 'react-redux';

const Container = styled.section`
	width: 100%;
	height: auto;
	padding: 0 10px;
`;

const SingleStory = ({ selectedStory, loading, getComments, comments }) => {
	const {story} = useSelector(state=>state)

	return (
	story &&
		<Container>
			{story && <StoryCard story={story[0]} getComments={getComments} />}
		</Container>
	)
};

export default SingleStory;
