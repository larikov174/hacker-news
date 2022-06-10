import styled from 'styled-components';
import StoryCard from './StoryCard';
import { useEffect, useState } from 'react';

const Container = styled.section`
	width: 100%;
	height: auto;
	padding: 0 10px;
`;

const Story = ({ selectedStory, loading, getComments, comments }) => {
	const [story, setStory] = useState(null)

	useEffect(() => {
		setStory(selectedStory);
	}, [selectedStory]);
	
	if (loading) return <div>Loading...</div>;

	return (
	story &&
		<Container>
			<StoryCard story={story} getComments={getComments} comments={comments} />
		</Container>
	)
};

export default Story;
