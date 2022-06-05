import './App.css';
import React from 'react';
import Header from './components/Header';
import styled from 'styled-components';

const MainContainer = styled.div`
	display: grid;
	justify-items: center;
	grid-template-columns: 1fr;
	grid-template-rows: 40px 1fr;
	grid-template-areas:
	'header'
	'news';
	width: min(100%, 1200px);
	margin: 0 auto;
`;

function App() {
	return (
		<MainContainer>
			<Header />
		</MainContainer>
	);
}

export default App;
