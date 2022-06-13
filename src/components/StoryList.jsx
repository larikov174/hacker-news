import styled from 'styled-components';
import StoryCard from './StoryCard';
import { useGetPostsQuery, useGetStoriesQuery } from '../app/story/storyApi';

const Container = styled.section`
	width: 100%;
	height: auto;
	padding: 0 10px;
`;

const StoryList = ({ selectedStory }) => {
	const {data = [], isLoading, isError} = useGetPostsQuery(6);
	console.log(isLoading, data);
	const {data:newD} = useGetStoriesQuery();
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error occurred</div>;

	return (
		<Container>
			{!isLoading && data.map((post) => (
				<StoryCard key={post.data.id} story={post.data} selectedStoryId={selectedStory} />
			))}
			{newD && newD.map(item=>(
				<div key={item}>{item}</div>
			))}
		</Container>
	);
};

export default StoryList;
