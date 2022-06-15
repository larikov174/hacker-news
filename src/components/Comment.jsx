import { useState } from 'react';
import styled from 'styled-components';
import { useGetCommentsQuery } from '../app/features/api/api';
import arrowIcon from '../assets/arrow-down.svg';
import replyIcon from '../assets/reply.svg';
import useConvertTime from '../hooks/useConvertTime';
import { Icon } from '../ui/icon';

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

const StyledText = styled.p`
	color: ${(props) => props.color || '#7d7d7d'};
	grid-area: ${(props) => props.area};
	border-left: ${(props) => (props.borderLeft ? '2px solid #7d7d7d' : '')};
	margin-left: ${(props) => (props.ml ? '5px' : '')};
	text-transform: ${(props) => props.uppercase || 'none'};
	display: flex;
	align-items: center;
`;

const StyledSpan = styled.span`
	text-transform: none;
`;

const StyledButton = styled.button`
	width: 80px;
	height: auto;
	margin-left: 20px;
	display: flex;
	justify-content: space-around;
	background-color: transparent;
	box-shadow: none;
	border: 1px solid black;
	border-radius: 5px;
	align-items: center;
	&:hover {
		cursor: pointer;
		opacity: 0.7;
		will-change: opacity;
		transition: opacity 0.3s;
	}
`;

const Comment = ({ comment, loading, error }) => {
	const convertedTime = useConvertTime(comment.time);
	const { data: replies = [] } = useGetCommentsQuery(comment.kids);
	const [isVisible, setIsVisible] = useState(false);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error occurred</div>;

	return (
		<MainContainer>
			<InfoContainer>
				<Icon image={replyIcon} />
				<StyledText ml>{comment.by}</StyledText>
				<StyledText ml>-- {convertedTime}</StyledText>
				{replies.length > 0 && (
					<StyledButton onClick={() => setIsVisible(!isVisible)}>
						<Icon image={arrowIcon} />
						<StyledText color='#000000'>Replies</StyledText>
					</StyledButton>
				)}
			</InfoContainer>
			{comment.dead ? (
				<StyledText>This comment has been stolen by hackers :-)</StyledText>
			) : (
				<StyledText area='text' color='#000000'>
					<StyledSpan dangerouslySetInnerHTML={{ __html: comment.text }} />
				</StyledText>
			)}
			{replies.length > 0 &&
				isVisible &&
				replies.map((reply) => (
					<MainContainer key={reply.data.id}>
						<InfoContainer>
							<Icon image={replyIcon} />
							<StyledText ml>
								{reply.data.by} to {comment.by}
							</StyledText>
							<StyledText ml>-- {convertedTime}</StyledText>
						</InfoContainer>
						{reply.data.dead ? (
							<StyledText>This reply has been stolen by hackers :-)</StyledText>
						) : (
							<StyledText area='text' color='#000000'>
								<StyledSpan dangerouslySetInnerHTML={{ __html: reply.data.text }} />
							</StyledText>
						)}
					</MainContainer>
				))}
		</MainContainer>
	);
};

export default Comment;
