import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import SingleStory from './components/SingleStory';
import StoryList from './components/StoryList';

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
	const { story } = useSelector((state) => state);

	return (
		<MainContainer>
			<Header />
			<Routes>
				<Route path='/' element={<StoryList />} />
				<Route path='/story' element={story.length > 0 ? <SingleStory /> : <StoryList />} />
			</Routes>
			<Footer />
		</MainContainer>
	);
}

export default App;
