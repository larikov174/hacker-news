import { useState } from 'react';
import styled from 'styled-components';
import { useGetCommentsQuery } from '../app/features/api/api';
import arrowIcon from '../assets/arrow-down.svg';
import replyIcon from '../assets/reply.svg';
import useConvertTime from '../hooks/useConvertTime';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { StyledText } from '../ui/text';
import { REFRESH_INTERVAL } from '../utils/const';

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

const StyledSpan = styled.span`
	text-transform: none;
`;

const Comment = ({ comment }) => {
	const convertedTime = useConvertTime(comment.time);
	const { data: replies = [] } = useGetCommentsQuery(comment.kids, {
		pollingInterval: REFRESH_INTERVAL,
		refetchOnMountOrArgChange: true
	});
	const [isVisible, setIsVisible] = useState(false);

	return (
		<MainContainer>
			<InfoContainer>
				<Icon image={replyIcon} />
				<StyledText grey margin='0 0 0 5px'>
					{comment.by}
				</StyledText>
				<StyledText grey margin='0 0 0 5px'>
					-- {convertedTime}
				</StyledText>
				{replies.length > 0 && (
					<Button onClick={() => setIsVisible(!isVisible)}>
						<Icon image={arrowIcon} />
						<StyledText margin='0 0 0 5px'>Replies</StyledText>
					</Button>
				)}
			</InfoContainer>
			{comment.dead ? (
				<StyledText grey>This comment has been stolen by hackers :-)</StyledText>
			) : (
				<StyledText area='text'>
					<StyledSpan dangerouslySetInnerHTML={{ __html: comment.text }} />
				</StyledText>
			)}
			{replies.length > 0 &&
				isVisible &&
				replies.map((reply) => (
					<MainContainer key={reply.data.id}>
						<InfoContainer>
							<Icon image={replyIcon} />
							<StyledText grey margin='0 0 0 5px'>
								{reply.data.by} to {comment.by}
							</StyledText>
							<StyledText grey margin='0 0 0 5px'>
								-- {convertedTime}
							</StyledText>
						</InfoContainer>
						{reply.data.dead ? (
							<StyledText grey>This reply has been stolen by hackers :-)</StyledText>
						) : (
							<StyledText area='text'>
								<StyledSpan dangerouslySetInnerHTML={{ __html: reply.data.text }} />
							</StyledText>
						)}
					</MainContainer>
				))}
		</MainContainer>
	);
};

export default Comment;
