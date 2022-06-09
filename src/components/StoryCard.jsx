import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fromUnixTime, format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import rssImg from '../assets/rss.svg';

const StyledListItem = styled.div`
	display: grid;
	grid-template-columns: 30px 1fr;
	grid-template-rows: repeat(2, 1fr);
	grid-template-areas:
		'image title'
		'textInfo textInfo';
	margin-top: 20px;
`;

const StyledLink = styled(Link)`
	grid-area: title;
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
`;

const StyledImage = styled.span`
	background-image: url(${(props) => props.image});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	width: 15px;
	height: 15px;
	display: block;
	grid-area: image;
`;

const StoryCard = ({ selectedStoryId, story }) => {
	const convertTime = (initData) => format(fromUnixTime(initData), 'dd MMMM yyyy, hh:mm:ss', { locale: enUS });
	const handleClick = (storyId) => selectedStoryId(storyId);

	return (
		<StyledListItem key={story.id}>
			<StyledImage area='image' image={rssImg} />
			<StyledLink to={'/story'} onClick={() => handleClick(story.id)}>
				{story.title}
			</StyledLink>
			<StyledInfoBlock area='textInfo'>
				<StyledText>{story.score} points</StyledText>
				<StyledText borderLeft>by {story.by}</StyledText>
				<StyledText borderLeft>{convertTime(story.time)}</StyledText>
			</StyledInfoBlock>
		</StyledListItem>
	);
};

export default StoryCard;
