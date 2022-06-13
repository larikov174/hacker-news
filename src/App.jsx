import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import StoryList from './components/StoryList';
import SingleStory from './components/SingleStory';
import Footer from './components/Footer';
import useMainApi from './hooks/useMainApi';

const MainContainer = styled.div`
	display: grid;
	justify-items: center;
	grid-template-columns: 1fr;
	grid-template-rows: max-content 1fr max-content;
	grid-template-areas:
		'header'
		'news'
		'footer';
	width: min(100%, 1200px);
	margin: 0 auto;
`;

function App() {
	const handleComments = (array) => getComments(array);
	const { loading, story, getStoryById, getStories, getComments, comments } = useMainApi();

	return (
		<MainContainer>
			<Header updateOnClick={getStories} />
			<Routes>
				<Route
					path='/'
					element={<StoryList selectedStory={getStoryById} />}
				/>
				<Route
					path='/story'
					element={
						<SingleStory selectedStory={story} loading={loading} getComments={handleComments} comments={comments} />
					}
				/>
			</Routes>
			<Footer />
		</MainContainer>
	);
}

export default App;
