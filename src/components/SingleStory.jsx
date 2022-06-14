import styled from 'styled-components';
import StoryCard from './StoryCard';
import { useSelector } from 'react-redux';
import { useGetCommentsQuery } from '../app/features/api/api';
import Comment from './Comment';

const Container = styled.section`
	width: 100%;
	height: auto;
	padding: 0 10px;
`;

const StyledText = styled.p`
	color: ${(props) => props.color || '#7d7d7d'};
	grid-area: ${(props) => props.area};
	text-transform: ${(props) => props.uppercase || 'none'};
	margin-top: ${(props) => (props.marginTop + 'px')};
	margin-right: ${(props) => (props.borderLeft ? '' : '5px')};
	border-left: ${(props) => (props.borderLeft ? '2px solid #7d7d7d' : '')};
	padding: ${(props) => (props.borderLeft ? '0 5px' : '')};
	display: flex;
	align-items: center;
`;

const SingleStory = () => {
	const { story } = useSelector((state) => state);
	const { data = [], isLoading, error } = useGetCommentsQuery(story[0].kids);

	return (
		<Container>
			{story && <StoryCard story={story[0]} />}
			{data.length > 0 ? <StyledText marginTop='30' color='#000000' uppercase>comments:</StyledText> : <StyledText marginTop='30'>No comments yet...</StyledText>}
			{!isLoading && data.map((item) => <Comment key={item.data.id} comment={item.data} />)}
		</Container>
	);
};

export default SingleStory;
