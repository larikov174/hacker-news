import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useGetCommentsQuery } from '../app/features/api/api';
import commentIcon from '../assets/comment-icon.svg';
import refreshIcon from '../assets/refresh.svg';
import rssIcon from '../assets/rss.svg';
import useConvertTime from '../hooks/useConvertTime';
import { Icon } from '../ui/icon';
import { StyledText, StyledTitle } from '../ui/text';
import Comment from './Comment';

const Container = styled.section`
	width: 100%;
	height: auto;
	padding: 0 10px;
`;

const StyledContainer = styled.div`
	display: grid;
	grid-template-columns: 30px 1fr;
	grid-template-rows: repeat(2, 1fr);
	grid-template-areas:
		'image title'
		'textInfo textInfo';
	margin-top: 20px;
	row-gap: 5px;
	align-items: center;
`;

const StyledInfoBlock = styled.div`
	display: flex;
	grid-area: ${(props) => props.area};
`;

const TitleContainer = styled.div`
	width: fit-content;
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

const StyledLink = styled.a`
	color: ${(props) => props.color || '#7d7d7d'};
	text-transform: ${(props) => props.uppercase || 'none'};
	border-left: ${(props) => (props.borderLeft ? '2px solid #7d7d7d' : '')};
	margin-left: 5px;
	padding: ${(props) => (props.borderLeft ? '0 5px' : '')};
`;

const SingleStory = () => {
	const { story } = useSelector((state) => state);
	const { data = [], isLoading, isError, refetch } = useGetCommentsQuery(story[0].kids);

	const handleUpdate = () => refetch();

	useEffect(() => {
		setInterval(() => {
			refetch();
		}, 60000);
		return () => {
			clearInterval(refetch());
		};
	}, [refetch]);

	const defaultTitle = () => (
		<TitleContainer onClick={handleUpdate}>
			<StyledTitle margin='0 10px'>comments</StyledTitle>
			<Icon image={refreshIcon} />
		</TitleContainer>
	);

	const fallbackTitle = (titleString) => <StyledText grey marginTop='30'>{titleString}</StyledText>;

	const defineTitle = () => {
		if (isLoading) return fallbackTitle('Loading...');
		if (isError && data.length > 0) return fallbackTitle('Error...');
		if (!isLoading && !isError && data.length > 0) return defaultTitle();
		return fallbackTitle('No comments yet...');
	};

	return (
		<Container>
			<StyledContainer>
				<Icon area='image' image={rssIcon} />
				<StyledTitle area='title'>{story[0].title}</StyledTitle>
				<StyledInfoBlock area='textInfo'>
					<StyledText grey borderLeft>article by {story[0].by}</StyledText>
					<StyledText grey borderLeft>{useConvertTime(story[0].time)}</StyledText>
					<StyledText grey borderLeft>
						<Icon margin image={commentIcon} />
						{story[0].kids ? story[0].kids.length : 0}
					</StyledText>
					<StyledLink href={story[0].url} target='_blank' rel='noopener noreferrer' borderLeft>
						{story[0].url ? 'More details...' : 'Sorry, but no URL provided yet...'}
					</StyledLink>
				</StyledInfoBlock>
			</StyledContainer>
			{defineTitle()}
			{!isLoading && data.map((item) => <Comment key={item.data.id} comment={item.data} />)}
		</Container>
	);
};

export default SingleStory;
