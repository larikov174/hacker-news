import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import StoryList from './components/StoryList';
import SingleStory from './components/SingleStory';
import Footer from './components/Footer';

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
	return (
		<MainContainer>
			<Header />
			<Routes>
				<Route path='/' element={<StoryList />} />
				<Route path='/story' element={<SingleStory />} />
			</Routes>
			<Footer />
		</MainContainer>
	);
}

export default App;
