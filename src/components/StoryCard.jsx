import { Link } from 'react-router-dom';
import styled from 'styled-components';
import commentsIcon from '../assets/comment-icon.svg';
import rssIcon from '../assets/rss.svg';
import { useActions } from '../hooks/useActions';
import useConvertTime from '../hooks/useConvertTime';
import { Icon } from '../ui/icon';
import { StyledText } from '../ui/text';

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

const StoryCard = ({ story }) => {
	const { selectStory } = useActions();

	return (
		<StyledContainer>
			<Icon area='image' image={rssIcon} />
			<StyledInnerLink to={'/story'} onClick={() => selectStory(story)}>
				{story.title}
			</StyledInnerLink>
			<StyledInfoBlock area='textInfo'>
				<StyledText>{story.score} points</StyledText>
				<StyledText grey borderLeft>article by {story.by}</StyledText>
				<StyledText grey borderLeft>
					<Icon margin image={commentsIcon} />
					{story.kids ? story.kids.length : 0}
				</StyledText>
				<StyledText grey borderLeft>{useConvertTime(story.time)}</StyledText>
			</StyledInfoBlock>
		</StyledContainer>
	);
};

export default StoryCard;
