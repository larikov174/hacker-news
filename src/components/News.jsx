import styled from 'styled-components';
import { fromUnixTime, format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import useFetch from '../hooks/useFetch';
import rssImg from '../assets/rss.svg';

const Container = styled.section`
	width: 100%;
	height: auto;
	padding: 0 10px;
`;

const StyledListItem = styled.div`
	display: grid;
	grid-template-columns: 30px 1fr;
	grid-template-rows: repeat(2, 1fr);
	grid-template-areas:
		'image title'
		'textInfo textInfo';
	margin-top: 20px;
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

const News = () => {
	const { posts, loading, error } = useFetch();
	const convertTime = (initData) => format(fromUnixTime(initData), 'dd MMMM yyyy, hh:mm:ss', { locale: enUS });
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error occurred, try again later...</div>;

	return (
		<Container>
			{posts.map((post) => (
				<StyledListItem key={post.id}>
					<StyledImage area='image' image={rssImg} />
					<StyledText area='title' color='#000000' uppercase>
						{post.title}
					</StyledText>
					<StyledInfoBlock area='textInfo'>
						<StyledText>{post.score} points</StyledText>
						<StyledText borderLeft>by {post.by}</StyledText>
						<StyledText borderLeft>{convertTime(post.time)}</StyledText>
					</StyledInfoBlock>
				</StyledListItem>
			))}
		</Container>
	);
};

export default News;
