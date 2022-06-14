import { useEffect } from 'react';
import styled from 'styled-components';
import StoryCard from './StoryCard';
import { useSelector } from 'react-redux';
import { useGetCommentsQuery } from '../app/features/api/api';
import Comment from './Comment';
import refreshIcon from '../assets/refresh.svg';

const Container = styled.section`
	width: 100%;
	height: auto;
	padding: 0 10px;
`;

const TitleContainer = styled.div`
	width: 100%;
	height: 30px;
	display: flex;
	align-items: center;
	margin-top: 30px;
	&:hover {
		cursor: pointer;
		opacity: 0.7;
		will-change: opacity;
		transition: opacity 0.3s;
	}
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

const StyledImage = styled.span`
	background-image: url(${(props) => props.image});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	width: 15px;
	height: 15px;
	display: block;
	margin: ${(props) => (props.marginLR ? '0 5px' : '')};
`;

const SingleStory = () => {
	const { story } = useSelector((state) => state);
	const { data = [], isLoading, error, refetch } = useGetCommentsQuery(story[0].kids);

	const handleUpdate = () => refetch();

	useEffect(() => {
		setInterval(() => {
			refetch();
		}, 60000);
		return () => {
			clearInterval(refetch());
		};
	}, [refetch]);

	const commentsTitle = () => (
		<TitleContainer onClick={handleUpdate}>
			<StyledText color='#000000' uppercase>comments</StyledText>
			<StyledImage image={refreshIcon} />
		</TitleContainer>
	)

	const noComments = () => <StyledText marginTop='30'>No comments yet...</StyledText>

	return (
		<Container>
			{!isLoading && <StoryCard story={story[0]} />}
			{data.length > 0 ? commentsTitle() : noComments()}
			{!isLoading && data.map((item) => <Comment key={item.data.id} comment={item.data} />)}
		</Container>
	);
};

export default SingleStory;
