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
	const [commentsData, setCommentsData] = useState(null);

	useEffect(() => {
		setStory(selectedStory);
	}, [selectedStory]);

	useEffect(() => {
		setCommentsData(comments);
	}, [comments]);
	
	if (loading) return <div>Loading...</div>;

	return (
	story &&
		<Container>
			<StoryCard story={story} getComments={getComments} comments={commentsData} />
		</Container>
	)
};

export default Story;
