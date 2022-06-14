import styled from 'styled-components';
import useConvertTime from '../hooks/useConvertTime';
import replyIcon from '../assets/reply.svg';

const MainContainer = styled.article`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 30px 1fr;
	grid-template-areas:
		'info'
		'text';
	width: max(300px, 50vw);
	max-width: 700px;
	margin-left: 50px;
	margin-top: 20px;
`;

const InfoContainer = styled.div`
	width: 100%;
	height: 30px;
	grid-area: info;
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

const StyledText = styled.p`
	color: ${(props) => props.color || '#7d7d7d'};
	grid-area: ${(props) => props.area};
	border-left: ${(props) => (props.borderLeft ? '2px solid #7d7d7d' : '')};
	margin-left: ${(props) => (props.ml ? '5px' : '')};
	text-transform: ${(props) => props.uppercase || 'none'};
	display: flex;
	align-items: center;
`;

const Comment = ({ comment, loading, error }) => {
	const convertedTime = useConvertTime(comment.time);
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error occurred</div>;

	return (
		<MainContainer>
			<InfoContainer>
				<StyledImage image={replyIcon} />
				<StyledText ml>{comment.by}</StyledText>
				<StyledText ml>-- {convertedTime}</StyledText>
			</InfoContainer>
			<StyledText area='text' color='#000000'>
				{comment.text}
			</StyledText>
		</MainContainer>
	);
};

export default Comment;
