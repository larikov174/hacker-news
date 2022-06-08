import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Stories from './components/Stories';
import Story from './components/Story';
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
	const [postId, setPostId] = useState(null);
	const handlePostSelect = ({postId}) => setPostId(postId);

	return (
		<MainContainer>
			<Header />

			<Routes>
				<Route path='/' element={<Stories onPostSelect={handlePostSelect} />} />
				<Route path='/story' element={<Story postId={postId} />} />
			</Routes>

			<Footer />
		</MainContainer>
	);
}

export default App;
