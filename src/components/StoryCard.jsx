import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Comment from './Comment';
import rssImg from '../assets/rss.svg';
import commentIcon from '../assets/comment-icon.svg';
import useConvertTime from '../hooks/useConvertTime';
import { useActions } from '../hooks/useActions';

const StyledListItem = styled.div`
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

const StyledInnerLink = styled(Link)`
	grid-area: title;
	width: fit-content;
	text-transform: uppercase;
`;

const StyledLink = styled.a`
	color: ${(props) => props.color || '#7d7d7d'};
	text-transform: ${(props) => props.uppercase || 'none'};
	border-left: ${(props) => (props.borderLeft ? '2px solid #7d7d7d' : '')};
	margin-left: 5px;
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

const StoryCard = ({ story, comments }) => {
	const { selectStory } = useActions();
	const location = useLocation().pathname;

	return (
		<>
			<StyledListItem>
				<StyledImage area='image' image={rssImg} />
				{location === '/story' ? (
					<StyledText area='title' color='#000000' uppercase>
						{story.title}
						<StyledLink href={story.url} target='_blank' rel='noopener noreferrer' borderLeft>
							More details...
						</StyledLink>
					</StyledText>
				) : (
					<StyledInnerLink to={'/story'} onClick={() => selectStory(story)}>
						{story.title}
					</StyledInnerLink>
				)}
				<StyledInfoBlock area='textInfo'>
					{location !== '/story' && <StyledText>{story.score} points</StyledText>}
					<StyledText borderLeft>article by {story.by}</StyledText>
					<StyledText borderLeft>comments: {story.kids ? story.kids.length : 0}</StyledText>
					<StyledText borderLeft>{useConvertTime(story.time)}</StyledText>
					{location === '/story' && (
						<StyledText borderLeft>
							<StyledImage marginLR image={commentIcon} />
							{story.kids ? story.kids.length : 0} comments
						</StyledText>
					)}
				</StyledInfoBlock>
			</StyledListItem>
			{comments && comments.map((item) => <Comment key={item.data.id} comment={item.data} />)}
		</>
	);
};

export default StoryCard;
