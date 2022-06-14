import { Link } from 'react-router-dom';
import styled from 'styled-components';
import rssImg from '../assets/rss.svg';
import { useActions } from '../hooks/useActions';
import useConvertTime from '../hooks/useConvertTime';

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

const StyledInnerLink = styled(Link)`
	grid-area: title;
	width: fit-content;
	text-transform: uppercase;
`;

const StyledInfoBlock = styled.div`
	display: flex;
	grid-area: ${(props) => props.area};
`;

const StyledText = styled.p`
	color: ${(props) => props.color || '#7d7d7d'};
	grid-area: ${(props) => props.area};
	text-transform: ${(props) => props.uppercase || 'none'};
	font-size: ${(props) => props.fontSize + 'px'};
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
	grid-area: ${(props) => props.area || ''};
	margin: ${(props) => (props.marginLR ? '0 5px' : '')};
`;

const StoryCard = ({ story }) => {
	const { selectStory } = useActions();

	return (
		<StyledContainer>
			<StyledImage area='image' image={rssImg} />
			<StyledInnerLink to={'/story'} onClick={() => selectStory(story)}>
				{story.title}
			</StyledInnerLink>
			<StyledInfoBlock area='textInfo'>
				<StyledText>{story.score} points</StyledText>
				<StyledText borderLeft>article by {story.by}</StyledText>
				<StyledText borderLeft>comments: {story.kids ? story.kids.length : 0}</StyledText>
				<StyledText borderLeft>{useConvertTime(story.time)}</StyledText>
			</StyledInfoBlock>
		</StyledContainer>
	);
};

export default StoryCard;
