import styled from 'styled-components';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fromUnixTime, format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Comment from './Comment';
import rssImg from '../assets/rss.svg';
import commentIcon from '../assets/comment-icon.svg';

const StyledListItem = styled.div`
	display: grid;
	grid-template-columns: 30px 1fr;
	grid-template-rows: repeat(2, 1fr);
	grid-template-areas:
		'image title'
		'textInfo textInfo';
	margin-top: 20px;
	row-gap: 5px;
`;

const StyledInnerLink = styled(Link)`
	grid-area: title;
`;

const StyledLink = styled.a`
	color: ${(props) => props.color || '#7d7d7d'};
	text-transform: ${(props) => props.uppercase || 'none'};
	border-left: ${(props) => (props.borderLeft ? '2px solid #7d7d7d' : '')};
	margin-right: ${(props) => (props.borderLeft ? '' : '5px')};
	padding: ${(props) => (props.borderLeft ? '0 5px' : '')};
`;

const StyledInfoBlock = styled.div`
	display: flex;
	grid-area: ${(props) => props.area};
`;

const StyledText = styled.p`
	color: ${(props) => props.color || '#7d7d7d'};
	grid-area: ${(props) => props.area};
	text-transform: ${(props) => props.uppercase || 'none'};
	border-left: ${(props) => (props.borderLeft ? '2px solid #7d7d7d' : '')};
	margin-right: ${(props) => (props.borderLeft ? '' : '5px')};
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
	grid-area: ${(props) => props.area || ''};
	margin: ${(props) => (props.marginLR ? '0 5px' : '')};
`;

const StoryCard = ({ selectedStoryId, story, getComments, comments }) => {
	const convertTime = (initData) => format(fromUnixTime(initData), 'dd MMMM yyyy, hh:mm:ss', { locale: enUS });
	const handleClick = (storyId) => selectedStoryId(storyId);
	const onLoad = (data) => {
		getComments(data.kids);
	};

	const location = useLocation().pathname;

	useEffect(() => {
		location === '/story' && onLoad(story);
	}, []);



	return (
		<>
		<StyledListItem key={story.id}>
			<StyledImage area='image' image={rssImg} />
			{location === '/story' ? (
				<StyledText area='title' color='#000000'>
					{story.title}
				</StyledText>
			) : (
				<StyledInnerLink to={'/story'} onClick={() => handleClick(story.id)}>
					{story.title}
				</StyledInnerLink>
			)}
			<StyledInfoBlock area='textInfo'>
				{location === '/story' ? (
					<StyledLink href={story.url} target='_blank' rel='noopener noreferrer'>
						More details...
					</StyledLink>
				) : (
					<StyledText>{story.score} points</StyledText>
				)}
				<StyledText borderLeft>by {story.by}</StyledText>
				<StyledText borderLeft>comments: {story.descendants}</StyledText>
				<StyledText borderLeft>{convertTime(story.time)}</StyledText>
				{location === '/story' && (
					<StyledText borderLeft>
						<StyledImage marginLR image={commentIcon} />
						{story.descendants} comments
					</StyledText>
				)}
			</StyledInfoBlock>
		
		</StyledListItem>
			{comments && comments.map((item) => <Comment key={item.id} comment={item} />)}
			</>
	);
};

export default StoryCard;
