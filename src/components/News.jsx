import styled from 'styled-components';
import useFetch from '../hooks/useFetch';
import rssImg from '../assets/rss.svg';

const Container = styled.div`
	width: 100%;
	height: auto;
	padding: 0 20px;
`;

const StyledListItem = styled.li`
	display: grid;
	grid-template-columns: 30px repeat(2, 1fr) 100px;
	grid-template-rows: repeat(2, 1fr);
	grid-template-areas:
		'image title author date'
		'image score ... date';
`;

const StyledText = styled.p`
	color: ${(props) => props.color || '#7d7d7d'};
	grid-area: ${(props) => props.area};
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

const News = () => {
	const { posts, loading, error } = useFetch();
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error occurred, try again later...</div>;

	return (
		<Container>
			<ul>
				{posts.map((post) => (
					<StyledListItem key={post.id}>
						<StyledImage image={rssImg} />
						<StyledText color='#000000' area='title'>
							{post.title}
						</StyledText>
						<StyledText area='author'>by {post.by}</StyledText>
						<StyledText area='score'>{post.score} points</StyledText>
						<StyledText area='date'>{post.time}</StyledText>
					</StyledListItem>
				))}
			</ul>
		</Container>
	);
};

export default News;
