import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useGetCommentsQuery } from '../app/features/api/api';
import commentIcon from '../assets/comment-icon.svg';
import refreshIcon from '../assets/refresh.svg';
import rssIcon from '../assets/rss.svg';
import useConvertTime from '../hooks/useConvertTime';
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
	margin-top: ${(props) => props.marginTop + 'px'};
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
			<StyledText color='#000000' uppercase>
				comments
			</StyledText>
			<StyledImage image={refreshIcon} />
		</TitleContainer>
	);

	const fallbackTitle = (titleString) => <StyledText marginTop='30'>{titleString}</StyledText>;

	const defineTitle = () => {
		if (isLoading) return fallbackTitle('Loading...');
		if (isError && data.length > 0) return fallbackTitle('Error...');
		if (!isLoading && !isError && data.length > 0) return defaultTitle();
		return fallbackTitle('No comments yet...');
	};

	return (
		<Container>
			<StyledContainer>
				<StyledImage area='image' image={rssIcon} />
				<StyledText area='title' color='#000000' uppercase>
					{story[0].title}
				</StyledText>
				<StyledInfoBlock area='textInfo'>
					<StyledText borderLeft>article by {story[0].by}</StyledText>
					<StyledText borderLeft>{useConvertTime(story[0].time)}</StyledText>
					<StyledText borderLeft>
						<StyledImage marginLR image={commentIcon} />
						{story[0].kids ? story[0].kids.length : 0} comments
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
