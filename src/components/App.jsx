import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Main from './Main';
import Story from './Story';
import Footer from './Footer';
import useMainApi from '../hooks/useMainApi';

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
	const { loading, error, stories, story, getStoryById, getStories, getComments, comments } = useMainApi();
	const handleComments = (array) => getComments(array);

	return (
		<MainContainer>
			<Header updateOnClick={getStories} />
			<Routes>
				<Route
					path='/'
					element={<Main selectedStory={getStoryById} stories={stories} loading={loading} error={error} />}
				/>
				<Route
					path='/story'
					element={<Story selectedStory={story} loading={loading} getComments={handleComments} comments={comments} />}
				/>
			</Routes>
			<Footer />
		</MainContainer>
	);
}

export default App;
