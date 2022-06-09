import styled from 'styled-components';
import StoryCard from './StoryCard';

const Container = styled.section`
	width: 100%;
	height: auto;
	padding: 0 10px;
`;

const Main = ({ selectedStory, stories, loading, error }) => {
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error occurred, try again later...</div>;

	return (
		<Container>
			{stories.map((post) => (
				<StoryCard key={post.id} story={post} selectedStoryId={selectedStory} />
			))}
		</Container>
	);
};

export default Main;
